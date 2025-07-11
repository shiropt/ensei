import { MatchCard } from "../match-card";
import { formatJstTime } from "@/utils/functions/date";
import { getMatchesByTeam } from "@/utils/supabase/db/actions";
import { Text } from "@mantine/core";
import type { FC } from "react";

type Props = {
  id: string;
  match_ym?: string;
};

export const MatchList: FC<Props> = async ({ id, match_ym }) => {
  const { year, month } = formatJstTime(new Date());
  const matches = await getMatchesByTeam(
    parseInt(id, 10),
    match_ym ?? `${year}-${month}`
  );
  return (
    <>
      {matches.length === 0 && <Text>試合がありません</Text>}
      {matches.map((match) => {
        return <MatchCard key={match.id} match={match} />;
      })}
    </>
  );
};