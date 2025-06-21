import { PrismaClient } from "@prisma/client";
import { AppError } from "@/utils/error-handling";

const prisma = new PrismaClient();

export type Params = {
  category: "j1" | "j2" | "j3" | "all";
};

// 明示的な型定義
export interface StadiumListItem {
  id: number;
  name: string | null;
  address: string | null;
  capacity: bigint | null;
  access: string | null;
  rating: number | null;
  description: string | null;
  shortName: string | null;
  imageUrl: string | null;
  homeTeams: string;
  categories: string[];
}

export interface StadiumDetail extends StadiumListItem {
  latitude: number | null;
  longitude: number | null;
}

export interface TeamListItem {
  id: number;
  name: string;
  short_name: string | null;
  category: string | null;
}

export interface MatchListItem {
  id: number;
  section: number | null;
  homeTeam: string | null | undefined;
  awayTeam: string | null | undefined;
  stadium: string | null | undefined;
  date: Date | null;
  stadiumId: number | null;
}

export interface TagItem {
  id: number;
  name: string;
}

const getAllStadiums = async () => {
  const stadiums = await prisma.stadiums.findMany({
    include: {
      team_stadium: {
        include: {
          teams: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return stadiums;
};

const getStadiumsByCategory = async (category: Params["category"]) => {
  const stadiums = await prisma.stadiums.findMany({
    where: {
      team_stadium: {
        some: {
          teams: {
            category: {
              equals: category,
              mode: "insensitive",
            },
          },
        },
      },
    },
    include: {
      team_stadium: {
        include: {
          teams: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return stadiums;
};

export const getStadiums = async ({ category }: Params): Promise<StadiumListItem[]> => {
  try {
    const stadiumsWithHomeTeams =
      category === "all"
        ? await getAllStadiums()
        : await getStadiumsByCategory(category);
    return stadiumsWithHomeTeams.map((stadiumsWithHomeTeam) => {
      const { team_stadium, ...rest } = stadiumsWithHomeTeam;
      return {
        id: rest.id,
        name: rest.name,
        address: rest.address,
        capacity: rest.capacity,
        access: rest.access,
        rating: rest.rating,
        description: rest.description,
        shortName: rest.shortName,
        imageUrl: rest.imageUrl,
        homeTeams: team_stadium.map((team) => team.teams.name).join(", "),
        categories: team_stadium.map((team) => team.teams.category).filter(Boolean) as string[],
      };
    });
  } catch {
    throw new AppError('Failed to fetch stadiums', 500, 'FETCH_STADIUMS_ERROR');
  }
};

export const getStadium = async (id: number): Promise<StadiumDetail | null> => {
  try {
    const stadium = await prisma.stadiums.findUnique({
      where: { id },
      include: {
        team_stadium: {
          include: {
            teams: true,
          },
        },
      },
    });
    
    if (!stadium) return null;
    
    return {
      id: stadium.id,
      name: stadium.name,
      address: stadium.address,
      capacity: stadium.capacity,
      access: stadium.access,
      rating: stadium.rating,
      description: stadium.description,
      shortName: stadium.shortName,
      imageUrl: stadium.imageUrl,
      latitude: stadium.lat,
      longitude: stadium.lng,
      homeTeams: stadium.team_stadium.map((team) => team.teams.name).join(", "),
      categories: stadium.team_stadium.map((team) => team.teams.category).filter(Boolean) as string[],
    };
  } catch {
    throw new AppError(`Failed to fetch stadium with id ${id}`, 500, 'FETCH_STADIUM_ERROR');
  }
};

export type Stadiums = StadiumListItem[];
export type Stadium = StadiumDetail | null;

export const getTags = async (): Promise<TagItem[]> => {
  const tags = await prisma.tags.findMany({
    select: { id: true, name: true },
    orderBy: { id: "asc" },
  });
  return tags;
};

export type Tags = TagItem[];
export type Tag = TagItem;

export const getTeams = async (): Promise<TeamListItem[]> => {
  const teams = await prisma.teams.findMany({
    orderBy: { id: "asc" },
  });
  return teams;
};

export type Teams = TeamListItem[];

export const getTeam = async (id: number) => {
  const now = new Date();
  const team = await prisma.teams.findUnique({
    where: { id },
    include: {
      team_stadium: {
        include: {
          stadiums: true,
        },
      },
      matches_matches_away_team_idToteams: {
        where: {
          date: {
            gte: new Date(now.getFullYear(), now.getMonth(), 1),
            lte: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          },
        },
      },
      matches_matches_home_team_idToteams: true,
    },
  });

  return team;
};

export const getMatchesByTeam = async (teamId: number, gte: string): Promise<MatchListItem[]> => {
  try {
    const from = new Date(gte);
    const lte = new Date(from.getFullYear(), from.getMonth() + 1, 1);
    const matches = await prisma.matches.findMany({
      where: {
        OR: [
          {
            home_team_id: teamId,
          },
          {
            away_team_id: teamId,
          },
        ],
        date: {
          gte: from,
          lte,
        },
      },
      include: {
        teams_matches_home_team_idToteams: true,
        teams_matches_away_team_idToteams: true,
        stadiums: true,
      },
    });
    return matches.map((match) => {
      return {
        id: match.id,
        section: match.section,
        homeTeam: match.teams_matches_home_team_idToteams?.short_name,
        awayTeam: match.teams_matches_away_team_idToteams?.short_name,
        stadium: match.stadiums?.shortName,
        date: match.date,
        stadiumId: match.stadium_id,
      };
    });
  } catch {
    throw new AppError(`Failed to fetch matches for team ${teamId}`, 500, 'FETCH_MATCHES_ERROR');
  }
};

export type Matches = MatchListItem[];
