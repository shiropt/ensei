import { StadiumList } from "../stadium-list";
import { FallbackStadiumList } from "../stadium-list-fallback";
import { getStadiums } from "@/utils/supabase/db/actions";
import { Suspense } from "react";

interface StadiumFetcherProps {
  category?: "j1" | "j2" | "j3" | "all";
}

const StadiumData = async ({ category = "all" }: StadiumFetcherProps) => {
  try {
    const stadiums = await getStadiums({ category });
    return <StadiumList stadiums={stadiums} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch stadiums:", error);
    return <div>スタジアムデータの取得に失敗しました</div>;
  }
};

export const StadiumFetcher = ({ category = "all" }: StadiumFetcherProps) => {
  return (
    <Suspense fallback={<FallbackStadiumList />}>
      <StadiumData category={category} />
    </Suspense>
  );
};