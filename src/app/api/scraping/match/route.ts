import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { createClient } from "@/utils/supabase/auth/server";
import type { MatchScrapingData, ApiResponse } from "@/types";

// 定数定義
const SCRAPING_URL = "https://data.j-league.or.jp/SFMS01/search?competition_years=2025&competition_frame_ids=1&competition_frame_ids=2&competition_frame_ids=3&tv_relay_station_name=";


interface RawMatchData {
  year?: string;
  date?: string;
  kickoffTime?: string;
  category?: string;
  section?: string;
  home?: string;
  away?: string;
  stadium?: string;
}

// 日付の最適化関数
function optimizeDate(item: RawMatchData): string | null {
  if (!item.year || !item.date || item.date.includes("未定")) {
    return null;
  }

  const kickoffTime = item.kickoffTime && !item.kickoffTime.includes("未定") 
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
  const timeString = kickoffTime.includes(":") ? `${kickoffTime}:00` : "00:00:00";
  
  try {
    const date = new Date(`${dateString}T${timeString}+09:00`);
    return isNaN(date.getTime()) ? null : date.toISOString();
  } catch {
    return null;
  }
}

// セクション番号の正規化
function normalizeSection(sectionText: string): number | null {
  const normalizedText = sectionText.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  );
  const match = normalizedText.match(/\d+/);
  return match ? Number(match[0]) : null;
}

// スクレイピングデータの変換
function transformScrapingData(headers: string[], rowData: Record<string, string>): MatchScrapingData | null {
  const rawData: RawMatchData = {};
  
  // ヘッダーに基づいてデータをマッピング
  headers.forEach((header) => {
    if (header === "年度") rawData.year = rowData[header];
    else if (header === "試合日") rawData.date = rowData[header];
    else if (header === "K/O時刻") rawData.kickoffTime = rowData[header];
    else if (header === "大会") rawData.category = rowData[header];
    else if (header === "節") rawData.section = rowData[header];
    else if (header === "ホーム") rawData.home = rowData[header];
    else if (header === "アウェイ") rawData.away = rowData[header];
    else if (header === "スタジアム") rawData.stadium = rowData[header];
  });

  const date = optimizeDate(rawData);
  const section = rawData.section ? normalizeSection(rawData.section) : null;

  if (!rawData.category || !rawData.home || !rawData.away || !rawData.stadium) {
    return null;
  }

  return {
    date,
    category: rawData.category,
    section,
    home: rawData.home,
    away: rawData.away,
    stadium: rawData.stadium,
  };
}

export async function GET(): Promise<NextResponse<ApiResponse<{ count: number }>>> {
  try {
    const supabase = await createClient();

    // 1. データのスクレイピング
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
      $(tr).find("td").each((index, td) => {
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
    const stadiumMap = new Map(stadiums.map(stadium => [stadium.shortName, stadium.id]));

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
      }));

    // バッチ処理で挿入
    const batchSize = 100;
    let totalInserted = 0;

    for (let i = 0; i < insertData.length; i += batchSize) {
      const batch = insertData.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from("matches")
        .upsert(batch, {
          onConflict: "date,home_team_id,away_team_id",
          ignoreDuplicates: false,
        })
        .select();

      if (error) {
        console.error(`Batch ${i / batchSize + 1} failed:`, error);
      } else if (data) {
        totalInserted += data.length;
      }
    }

    return NextResponse.json({
      data: { count: totalInserted },
      message: `Successfully imported ${totalInserted} matches`,
    });

  } catch (error) {
    console.error("Match scraping error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
        message: "Failed to scrape and import matches",
      },
      { status: 500 }
    );
  }
}