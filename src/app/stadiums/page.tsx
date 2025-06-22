import { Tab } from "@/components/molecules/Tab";
import { StadiumFetcher } from "@/components/organisms/StadiumList/StadiumFetcher";
import { Box, Title } from "@mantine/core";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Box py="sm">
      <Title my="md" order={2} fz="xl">
        スタジアム一覧
      </Title>
      <Tab mb="md" />
      <Suspense fallback={<div>Loading...</div>}>
        <StadiumFetcher category="all" />
      </Suspense>
    </Box>
  );
}
