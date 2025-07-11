import { Footer } from "@/components/features/match/match-footer";
import { MatchList } from "@/components/features/match/match-list";
import { FallbackMatchList } from "@/components/features/match/match-list-fallback";
import { getTeam } from "@/utils/supabase/db/actions";
import { Paper } from "@mantine/core";
import { Suspense, type FC } from "react";

type Props = {
  id: string;
  match_ym?: string;
};

export const TeamDetail: FC<Props> = async ({ id, match_ym }) => {
  const team = await getTeam(parseInt(id, 10));

  return (
    <div>
      <Paper mb="md" withBorder p="sm">
        {team?.name}
      </Paper>
      <Suspense fallback={<FallbackMatchList />}>
        <MatchList id={id} match_ym={match_ym} />
      </Suspense>
      <Footer teamId={team?.id} match_ym={match_ym} />
    </div>
  );
};