import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStadiums = async () => {
  const stadiumsWithHomeTeams = await prisma.stadiums.findMany({
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
