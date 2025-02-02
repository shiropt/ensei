export const dynamic = "force-static";

import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";
import { StadiumListWrapper } from "@/components/organisms/StadiumListWrapper";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<FallbackStadiumList />}>
        <StadiumListWrapper category="all"></StadiumListWrapper>
      </Suspense>
    </>
  );
}
