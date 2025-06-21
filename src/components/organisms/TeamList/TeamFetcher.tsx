import { TeamList } from "./index";
import { FallbackTeamList } from "./fallback";
import { getTeams } from "@/utils/supabase/db/actions";
import { Suspense } from "react";

const TeamData = async () => {
  try {
    const teams = await getTeams();
    return <TeamList teams={teams} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch teams:", error);
    return <div>チームデータの取得に失敗しました</div>;
  }
};

export const TeamFetcher = () => {
  return (
    <Suspense fallback={<FallbackTeamList />}>
      <TeamData />
    </Suspense>
  );
};