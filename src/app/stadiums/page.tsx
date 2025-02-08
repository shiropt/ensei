export const dynamic = "force-static";

import { StadiumList } from "@/components/organisms/StadiumList";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";
import { getStadiums } from "@/utils/supabase/db/actions";
import { Suspense } from "react";

export default async function Home() {
  const stadiums = await getStadiums({
    category: "all",
  });
  return (
    <>
      <Suspense fallback={<FallbackStadiumList />}>
        <StadiumList stadiumList={stadiums} />
      </Suspense>
    </>
  );
}
