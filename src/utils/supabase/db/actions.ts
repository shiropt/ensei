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
