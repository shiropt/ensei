import { TeamList } from "@/components/organisms/TeamList";
import { getTeams } from "@/utils/supabase/db/actions";

export const Fetcher = async () => {
  const teams = await getTeams();
  return <TeamList teams={teams} />;
};
