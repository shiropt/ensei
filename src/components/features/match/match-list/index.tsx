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
  const teamId = parseInt(id, 10);
  if (isNaN(teamId)) {
    return <Text>無効なチームIDです</Text>;
  }

  try {
    const { year, month } = formatJstTime(new Date());
    const matches = await getMatchesByTeam(
      teamId,
      match_ym ?? `${year}-${month.padStart(2, '0')}`
    );
    return (
      <>
        {matches.length === 0 && <Text>試合がありません</Text>}
        {matches.map((match) => {
          return <MatchCard key={match.id} match={match} />;
        })}
      </>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch matches:', error);
    return <Text>試合データの取得に失敗しました</Text>;
  }
};