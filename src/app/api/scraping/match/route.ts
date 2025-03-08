/* eslint-disable functional/no-conditional-statements */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const optimizedKey = {
  年度: "year",
  大会: "category",
  節: "section",
  試合日: "date",
  "K/O時刻": "kickoffTime",
  ホーム: "home",
  スコア: "score",
  アウェイ: "away",
  スタジアム: "stadium",
};

const optimizeDate = (item: Record<string, unknown>) => {
  if (typeof item.year !== "string") {
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error("Invalid year format");
  }

  if (
    typeof item.date !== "string" ||
    !item.date.trim() ||
    item.date.includes("未定")
  ) {
    return null; // 日付が未定なら null を返す
  }

  const kickoffTime =
    typeof item.kickoffTime === "string" &&
    item.kickoffTime.trim() &&
    !item.kickoffTime.includes("未定")
      ? item.kickoffTime
      : "00:00";

  // 日本語の曜日や記号を削除し、スラッシュをハイフンに変換
  const cleanedDate = item.date
    .replace(/[()日月火水木金土・祝休]/g, "")
    .replace(/\//g, "-")
    .trim();

  if (!/^\d{1,2}-\d{1,2}$/.test(cleanedDate)) {
    return null; // 無効な日付なら null を返す
  }

  // YYYY-MM-DD 形式を作成
  const dateString = `${item.year.padStart(4, "0")}-${cleanedDate.padStart(
    5,
    "0"
  )}`;

  // hh:mm:ss 形式に変換
  const timeString = kickoffTime.includes(":")
    ? `${kickoffTime}:00`
    : "00:00:00";

  // `+09:00` を追加して JST (日本時間) としてパース
  const date = new Date(`${dateString}T${timeString}+09:00`);

  if (isNaN(date.getTime())) {
    return null; // 無効な Date オブジェクトなら null を返す
  }

  // UTC に変換して ISO 8601 形式で返す
  return date.toISOString();
};

const writeToJson = (json: object[]) => {
  const optimizedKeys = json.map((data) =>
    Object.fromEntries(
      Object.entries(data)
        //   @ts-ignore
        .filter(([key]) => optimizedKey[key])
        //   @ts-ignore
        .map(([key, value]) => [optimizedKey[key], value])
    )
  );
  const optimized = optimizedKeys.map((item) => {
    const text = item.section ?? "";
    const normalizedText = text.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
    const match = normalizedText.match(/\d+/);
    const sectionAsNumber = normalizedText.match(/\d+/)
      ? Number(match[0])
      : null;
    const date = optimizeDate(item);

    return {
      date,
      category: item.category,
      section: sectionAsNumber,
      home: item.home,
      away: item.away,
      stadium: item.stadium,
    };
  });
  const outputDir = path.join(process.cwd(), "data/matches");
  const outputPath = path.join(outputDir, "matches.json");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(optimized, null, 2), "utf-8");
};

const mappingId = () => {
  const matchesPath = path.resolve("data/matches", "matches.json");
  const teamsPath = path.resolve("data/matches", "teams.json");
  const stadiumsPath = path.join("data/matches", "stadiums.json");

  const matches = JSON.parse(fs.readFileSync(matchesPath, "utf-8"));
  const teams = JSON.parse(fs.readFileSync(teamsPath, "utf-8"));
  const stadiums = JSON.parse(fs.readFileSync(stadiumsPath, "utf-8"));

  const teamMap = Object.fromEntries(
    teams.map((team: Record<string, unknown>) => [team.short_name, team.id])
  );
  const stadiumMap = Object.fromEntries(
    stadiums.map((stadium: Record<string, unknown>) => [
      stadium.shortName,
      stadium.id,
    ])
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedMatches = matches.map((match: Record<string, any>) => ({
    ...match,
    home_team_id: teamMap[match.home] || null,
    away_team_id: teamMap[match.away] || null,
    stadium_id: stadiumMap[match.stadium] || null,
  }));

  // 変換結果を新しい JSON ファイルに保存
  const outputFilePath = path.join("data/matches", "optimized_matches.json");
  fs.writeFileSync(
    outputFilePath,
    JSON.stringify(mappedMatches, null, 2),
    "utf-8"
  );

  console.log(`データを ${outputFilePath} に保存しました！`);
};

const generateSQL = () => {
  const jsonFilePath = path.resolve("data/matches", "optimized_matches.json"); // 事前に保存した JSON ファイル
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  const sqlStatements = jsonData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((match: Record<string, any>) => {
      const {
        date,
        category,
        section,
        home_team_id,
        away_team_id,
        stadium_id,
      } = match;
      return `('${date}', ${home_team_id}, ${away_team_id}, ${stadium_id}, ${section}, '${category}')`;
    })
    .filter(Boolean);

  // // SQL クエリのフォーマット
  const sql =
    `INSERT INTO matches (date, home_team_id, away_team_id, stadium_id, section, category) VALUES\n` +
    sqlStatements.join(",\n") +
    ";";

  // // SQL ファイルに書き出し
  const outputDir = path.join(process.cwd(), "data/matches");
  const outputPath = path.join(outputDir, "insert_matches.sql");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, sql, "utf-8");

  console.log("✅ SQL ファイルを生成しました: insert_matches.sql");
};

// 2025年のリーグ戦試合日程
const url =
  "https://data.j-league.or.jp/SFMS01/search?competition_years=2025&competition_frame_ids=1&competition_frame_ids=2&competition_frame_ids=3&tv_relay_station_name=";
export async function GET() {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const headers = $("thead tr th")
    .map((_, th) => $(th).text().trim())
    .get();

  // テーブルデータを取得
  const tableData = $("tbody tr")
    .map((_, tr) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row: Record<string, any> = {};
      $(tr)
        .find("td")
        .each((index, td) => {
          // eslint-disable-next-line functional/immutable-data
          row[headers[index]] = $(td).text().trim();
        });
      return row;
    })
    .get();
  writeToJson(tableData);
  mappingId();
  generateSQL();

  return NextResponse.json({ message: "SQL generation succeeded" });
}
