import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Params = {
  category: "j1" | "j2" | "j3" | "all";
};

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

export const getStadiums = async ({ category }: Params) => {
  const stadiumsWithHomeTeams =
    category === "all"
      ? await getAllStadiums()
      : await getStadiumsByCategory(category);
  return stadiumsWithHomeTeams.map((stadiumsWithHomeTeam) => {
    const { team_stadium, ...rest } = stadiumsWithHomeTeam;
    return {
      ...rest,
      homeTeams: team_stadium.map((team) => team.teams.name).join(", "),
      categories: team_stadium.map((team) => team.teams.category),
    };
  });
};

export const getStadium = async (id: number) => {
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
  return {
    ...stadium,
    homeTeams: stadium?.team_stadium.map((team) => team.teams.name).join(", "),
  };
};

export type Stadiums = ReturnType<typeof getStadiums> extends Promise<infer U>
  ? U
  : never;

export type Stadium = ReturnType<typeof getStadium> extends Promise<infer U>
  ? U
  : never;

export const getTags = async () => {
  const tags = await prisma.tags.findMany({
    select: { id: true, name: true },
    orderBy: { id: "asc" },
  });
  return tags;
};

export type Tags = ReturnType<typeof getTags> extends Promise<infer U>
  ? U
  : never;

export type Tag = Tags[number];

export const getTeams = async () => {
  const teams = await prisma.teams.findMany({
    orderBy: { id: "asc" },
  });
  return teams;
};

export type Teams = ReturnType<typeof getTeams> extends Promise<infer U>
  ? U
  : never;

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

export const getMatchesByTeam = async (teamId: number, gte: string) => {
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
};

export type Matches = ReturnType<typeof getMatchesByTeam> extends Promise<
  infer U
>
  ? U
  : never;
