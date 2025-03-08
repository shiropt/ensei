/* eslint-disable functional/no-conditional-statements */
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { stadiums } from "../../../../data/stadiums/stadiums";

type Stadium = (typeof stadiums)[number];

type StadiumWithLocation = Stadium & {
  location: {
    lat: number;
    lng: number;
  };
};
const GCP_API_KEY = process.env.NEXT_PUBLIC_GCP_API_KEY || "";

const generateSQL = (data: StadiumWithLocation) => {
  const sql = `
    UPDATE stadiums SET lat = ${data.location.lat}, lng = ${data.location.lng}
    WHERE id = ${data.id};`;
  return sql;
};

const wrightToFile = (sql: string) => {
  const outputDir = path.join(process.cwd(), "data/stadiums");
  const outputPath = path.join(outputDir, "update_locations.sql");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, sql, "utf-8");
  console.log("✅ SQL ファイルを生成しました:update_locations.sql");
};

const getLocations = async (arg: Stadium) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    arg.address
  )}&key=${GCP_API_KEY}`;
  const data = await fetch(url);
  const json = await data.json();
  return {
    ...arg,
    location: json.results[0].geometry.location,
  };
};

export async function GET() {
  const stadiumsWithLocation = await Promise.all(stadiums.map(getLocations));

  const sql = stadiumsWithLocation.map(generateSQL).join("\n");
  wrightToFile(sql);

  return NextResponse.json({ result: sql });
}
