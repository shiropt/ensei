import { MatchCard } from "@/components/organisms/Matches/MatchCard";
import { getMatchesByTeam } from "@/utils/supabase/db/actions";
import { FC } from "react";

type Props = {
  id: string;
  match_ym?: string;
};

export const MatchList: FC<Props> = async ({ id, match_ym }) => {
  const matches = await getMatchesByTeam(
    parseInt(id, 10),
    match_ym ?? new Date().getFullYear() + "-" + (new Date().getMonth() + 1)
  );
  return (
    <>
      {matches.map((match) => {
        return <MatchCard key={match.id} match={match} />;
      })}
    </>
  );
};
