import { TeamFetcher } from "@/components/features/team/team-fetcher";
import { CategoryTab } from "@/components/ui/category-tab";
import { Box, Container, Flex, Skeleton } from "@mantine/core";
import { Suspense } from "react";

export default function Teams() {
  return (
    <Box className="main">
      <Container fluid px={0}>
        <Suspense
          fallback={
            <Box>
              <Skeleton height={40} mb="md" />
              <Flex direction="column" gap="sm" px="md">
                {Array.from({ length: 10 }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={`team-skeleton-${i}`} height={18} />
                ))}
              </Flex>
            </Box>
          }
        >
          <CategoryTab />
          <Box p="md">
            <TeamFetcher />
          </Box>
        </Suspense>
      </Container>
    </Box>
  );
}
