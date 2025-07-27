import { StadiumFetcher } from "@/components/features/stadium/stadium-fetcher";
import { CategoryTab } from "@/components/ui/category-tab";
import { Box, Container, Flex, Paper, Skeleton } from "@mantine/core";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Box className="main">
      <Container fluid px={0}>
        <Suspense
          fallback={
            <Box>
              <Skeleton height={40} mb="md" />
              <Box px="md">
                {Array.from({ length: 6 }, (_, i) => (
                  <Paper
                    key={`stadium-card-skeleton-${i}`}
                    radius="sm"
                    p="sm"
                    mb="md"
                  >
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
          <CategoryTab />
          <Box p="md">
            <StadiumFetcher />
          </Box>
        </Suspense>
      </Container>
    </Box>
  );
}
