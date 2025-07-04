import { Footer } from "@/components/organisms/Matches/Footer";
import { MatchList } from "@/components/organisms/Matches/List";
import { FallbackMatchList } from "@/components/organisms/Matches/List/fallback";
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
