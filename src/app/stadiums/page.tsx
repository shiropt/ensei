export const dynamic = "force-static";

import { Tab } from "@/components/molecules/Tab";
import { FallbackStadiumList } from "@/components/organisms/StadiumList/fallback";
import { Fetcher } from "@/components/organisms/StadiumList/Fetcher";
import { Title } from "@mantine/core";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Title my="md" order={2} fz="xl">
        スタジアム一覧
      </Title>
      <Tab mb="md" />
      <Suspense fallback={<FallbackStadiumList />}>
        <Fetcher />
      </Suspense>
    </>
  );
}
