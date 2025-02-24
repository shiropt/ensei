import { Tab } from "@/components/molecules/Tab";
import { FallbackStadiumList } from "@/components/organisms/StadiumList/fallback";
import { Fetcher } from "@/components/organisms/StadiumList/Fetcher";
import { Box, Title } from "@mantine/core";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Box py="sm">
      <Title my="md" order={2} fz="xl">
        スタジアム一覧
      </Title>
      <Suspense fallback={<FallbackStadiumList />}>
        <Tab mb="md" />
        <Fetcher />
      </Suspense>
    </Box>
  );
}
