import { Tab } from "@/components/molecules/Tab";
import { StadiumFetcher } from "@/components/organisms/StadiumList/StadiumFetcher";
import { Box, Title, Skeleton, Paper, Flex } from "@mantine/core";
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
            <Box>
              {Array.from({ length: 6 }, (_, i) => (
                <Paper key={`stadium-card-skeleton-${i}`} radius="sm" p="sm" mb="md">
                  <Flex direction="column" gap="xs">
                    <Skeleton height={120} visible />
                    <Flex direction="column" gap="xs">
                      <Skeleton h={24} visible />
                      <Skeleton h={16} visible />
                      <Skeleton h={16} visible />
                    </Flex>
                  </Flex>
                </Paper>
              ))}
            </Box>
          </Box>
        }
      >
        <Tab mb="md" />
        <StadiumFetcher category="all" />
      </Suspense>
    </Box>
  );
}
