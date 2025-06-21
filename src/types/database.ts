// データベース関連の型定義
import type { Prisma } from '@prisma/client';

// Prismaの生成型を拡張
export type StadiumWithRelations = Prisma.stadiumsGetPayload<{
  include: {
    team_stadium: {
      include: {
        teams: true;
      };
    };
    stadium_tags: {
      include: {
        tags: true;
      };
    };
  };
}>;

export type TeamWithRelations = Prisma.teamsGetPayload<{
  include: {
    team_stadium: {
      include: {
        stadiums: true;
      };
    };
  };
}>;

export type MatchWithRelations = Prisma.matchesGetPayload<{
  include: {
    teams_matches_home_team_idToteams: true;
    teams_matches_away_team_idToteams: true;
    stadiums: true;
  };
}>;