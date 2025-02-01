import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Params = {
  category: "j1" | "j2" | "j3" | "all";
};

export const getStadiums = async ({ category }: Params) => {
  const stadiumsWithHomeTeams = await prisma.stadiums.findMany({
    ...(category !== "all" && {
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
    }),
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
  return stadiumsWithHomeTeams.map((stadiumsWithHomeTeam) => {
    const { team_stadium, ...rest } = stadiumsWithHomeTeam;
    return {
      ...rest,
      homeTeams: team_stadium.map((team) => team.teams.name).join(", "),
    };
  });
};

export type Stadiums = ReturnType<typeof getStadiums> extends Promise<infer U>
  ? U
  : never;

export type Stadium = Stadiums[number];
