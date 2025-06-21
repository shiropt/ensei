// データベース関連の型定義
import type { Prisma } from '@prisma/client';

// Prismaの生成型を拡張
export type StadiumWithRelations = Prisma.stadiumsGetPayload<{
  include: {
    teams: {
      include: {
        team: true;
      };
    };
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type TeamWithRelations = Prisma.teamsGetPayload<{
  include: {
    stadiums: {
      include: {
        stadium: true;
      };
    };
  };
}>;

export type MatchWithRelations = Prisma.matchesGetPayload<{
  include: {
    homeTeam: true;
    awayTeam: true;
    stadium: true;
  };
}>;