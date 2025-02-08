import { StadiumList } from "@/components/organisms/StadiumList";
import { getStadiums } from "@/utils/supabase/db/actions";

export const Fetcher = async () => {
  const stadiums = await getStadiums({
    category: "all",
  });
  return <StadiumList stadiums={stadiums}></StadiumList>;
};
