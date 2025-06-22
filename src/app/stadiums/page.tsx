import { Tab } from "@/components/molecules/Tab";
import { StadiumFetcher } from "@/components/organisms/StadiumList/StadiumFetcher";
import { Box, Title, Skeleton } from "@mantine/core";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Box py="sm">
      <Title my="md" order={2} fz="xl">
        スタジアム一覧
      </Title>
      <Suspense 
        fallback={
          <Box>
            <Skeleton height={40} mb="md" />
            <Skeleton height={300} />
          </Box>
        }
      >
        <Tab mb="md" />
        <StadiumFetcher category="all" />
      </Suspense>
    </Box>
  );
}
