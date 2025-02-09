/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const rawDate = item.date ? String(item.date) : "";

  const cleanedDate = rawDate
    .replace(/[()日月火水木金土・祝休]/g, "")
    .replace(/\//g, "-")
    .trim();

  const dateString = `${item.year}-${cleanedDate}`;
  const timeString = item.kickoffTime ? `${item.kickoffTime}:00` : "00:00:00";

  return `${dateString} ${timeString}`;
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
    const section = text.match(/\p{N}+/u);
    const sectionAsNumber =
      Array.isArray(section) && section.length > 0
        ? parseInt(String.fromCharCode(section[0].charCodeAt(0) - 0xfee0), 10)
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

// 2025年のリーグ戦とルヴァンカップの試合日程
const url =
  "https://data.j-league.or.jp/SFMS01/search?competition_years=2025&competition_frame_ids=1&competition_frame_ids=11&competition_frame_ids=2&competition_frame_ids=3&tv_relay_station_name=&print=true";

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
      const row: Record<string, any> = {};
      $(tr)
        .find("td")
        .each((index, td) => {
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
