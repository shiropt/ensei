import type { ApiResponse, MatchScrapingData } from "@/types";
import { createClient } from "@/utils/supabase/auth/server";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

// 定数定義
const SCRAPING_URL =
  "https://data.j-league.or.jp/SFMS01/search?competition_years=2025&competition_frame_ids=1&competition_frame_ids=2&competition_frame_ids=3&tv_relay_station_name=";

interface RawMatchData {
  year?: string;
  date?: string;
  kickoffTime?: string;
  category?: string;
  section?: string;
  home?: string;
  away?: string;
  stadium?: string;
  score?: string;
  attendance?: string;
}

// 日付の最適化関数
function optimizeDate(item: RawMatchData): string | null {
  if (!item.year || !item.date || item.date.includes("未定")) {
    return null;
  }

  const kickoffTime =
    item.kickoffTime && !item.kickoffTime.includes("未定")
      ? item.kickoffTime
      : "00:00";

  // 日本語の曜日や記号を削除し、スラッシュをハイフンに変換
  const cleanedDate = item.date
    .replace(/[()日月火水木金土・祝休]/g, "")
    .replace(/\//g, "-")
    .trim();

  if (!/^\d{1,2}-\d{1,2}$/.test(cleanedDate)) {
    return null;
  }

  const dateString = `${item.year.padStart(4, "0")}-${cleanedDate.padStart(5, "0")}`;
  const timeString = kickoffTime.includes(":")
    ? `${kickoffTime}:00`
    : "00:00:00";

  try {
    const date = new Date(`${dateString}T${timeString}+09:00`);
    return isNaN(date.getTime()) ? null : date.toISOString();
  } catch {
    return null;
  }
}

// セクション番号の正規化
function normalizeSection(sectionText: string): number | null {
  const normalizedText = sectionText.replace(/[０-９]/g, s =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
  const match = normalizedText.match(/\d+/);
  return match ? Number(match[0]) : null;
}

// チーム名の正規化（半角→全角変換）
function normalizeTeamName(teamName: string): string {
  return teamName.replace(/[A-Za-z]/g, s => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}

// スクレイピングデータの変換
function transformScrapingData(
  headers: string[],
  rowData: Record<string, string>,
): MatchScrapingData | null {
  const rawData: RawMatchData = {};

  // ヘッダーに基づいてデータをマッピング
  headers.forEach(header => {
    if (header === "年度") rawData.year = rowData[header];
    else if (header === "試合日") rawData.date = rowData[header];
    else if (header === "K/O時刻") rawData.kickoffTime = rowData[header];
    else if (header === "大会") rawData.category = rowData[header];
    else if (header === "節") rawData.section = rowData[header];
    else if (header === "ホーム") rawData.home = rowData[header];
    else if (header === "アウェイ") rawData.away = rowData[header];
    else if (header === "スタジアム") rawData.stadium = rowData[header];
    else if (header === "スコア") rawData.score = rowData[header];
    else if (header === "入場者数") rawData.attendance = rowData[header];
  });

  const date = optimizeDate(rawData);
  const section = rawData.section ? normalizeSection(rawData.section) : null;

  // 入場者数の処理（カンマを除去して数値に変換）
  const attendance =
    rawData.attendance &&
    rawData.attendance !== "-" &&
    rawData.attendance.trim() !== ""
      ? Number(rawData.attendance.replace(/,/g, "")) || null
      : null;

  if (!rawData.category || !rawData.home || !rawData.away || !rawData.stadium) {
    return null;
  }

  return {
    date,
    category: rawData.category,
    section,
    home: normalizeTeamName(rawData.home),
    away: normalizeTeamName(rawData.away),
    stadium: rawData.stadium,
    score:
      rawData.score &&
      rawData.score !== "-" &&
      rawData.score.trim() !== "" &&
      rawData.score !== "vs"
        ? rawData.score
        : null,
    attendance,
  };
}

export async function GET(): Promise<
  NextResponse<ApiResponse<{ count: number }>>
> {
  try {
    const supabase = await createClient();

    const response = await fetch(SCRAPING_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const body = await response.text();
    const $ = cheerio.load(body);

    const headers = $("thead tr th")
      .map((_, th) => $(th).text().trim())
      .get();

    const matches: MatchScrapingData[] = [];
    $("tbody tr").each((_, tr) => {
      const rowData: Record<string, string> = {};
      $(tr)
        .find("td")
        .each((index, td) => {
          rowData[headers[index]] = $(td).text().trim();
        });

      const matchData = transformScrapingData(headers, rowData);
      if (matchData) {
        matches.push(matchData);
      }
    });

    // 2. チームとスタジアムのマッピング
    const { data: teams } = await supabase
      .from("teams")
      .select("id, short_name");

    const { data: stadiums } = await supabase
      .from("stadiums")
      .select("id, shortName");

    if (!teams || !stadiums) {
      throw new Error("Failed to fetch teams or stadiums data");
    }

    const teamMap = new Map(teams.map(team => [team.short_name, team.id]));
    const stadiumMap = new Map(
      stadiums.map(stadium => [stadium.shortName, stadium.id]),
    );

    // 3. IDをマッピング
    const matchesWithIds = matches.map(match => ({
      ...match,
      home_team_id: teamMap.get(match.home) || null,
      away_team_id: teamMap.get(match.away) || null,
      stadium_id: stadiumMap.get(match.stadium) || null,
    }));

    // 4. データベースに保存（upsert）
    const insertData = matchesWithIds
      .filter(match => match.date && match.home_team_id && match.away_team_id)
      .map(match => ({
        date: match.date,
        home_team_id: match.home_team_id!,
        away_team_id: match.away_team_id!,
        stadium_id: match.stadium_id,
        section: match.section,
        category: match.category,
        score: match.score,
        attendance: match.attendance,
      }));

    // 重複データの事前削除
    await supabase.rpc("delete_duplicate_matches");

    // バッチ処理で挿入
    const batchSize = 100;
    let totalInserted = 0;

    for (let i = 0; i < insertData.length; i += batchSize) {
      const batch = insertData.slice(i, i + batchSize);
      // PostgreSQL関数を使用して日付ベースupsert
      const { error } = await supabase.rpc("upsert_matches_by_date", {
        matches_data: batch,
      });

      if (error) {
        throw new Error(
          `Database insertion failed: ${error.message || "Unknown error"}`,
        );
      } else {
        totalInserted += batch.length;
      }
    }

    // 最終的な重複チェック
    await supabase.rpc("delete_duplicate_matches");

    return NextResponse.json({
      data: { count: totalInserted },
      message: `Successfully imported ${totalInserted} matches`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        message: "Failed to scrape and import matches",
      },
      { status: 500 },
    );
  }
}
