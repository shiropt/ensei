export const dynamic = "force-static";

import { StadiumList } from "@/components/organisms/StadiumList";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<FallbackStadiumList />}>
        <StadiumList category="all"></StadiumList>
      </Suspense>
    </>
  );
}
