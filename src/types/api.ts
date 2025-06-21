// API関連の型定義

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface MatchScrapingData {
  date: string | null;
  category: string;
  section: number | null;
  home: string;
  away: string;
  stadium: string;
  home_team_id?: number;
  away_team_id?: number;
  stadium_id?: number;
}

export interface TeamData {
  id: number;
  short_name: string;
  name: string;
}

export interface StadiumData {
  id: number;
  shortName: string;
  name: string;
}