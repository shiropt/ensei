import { Tab } from "@/components/ui/tab";
import { TeamFetcher } from "@/components/features/team/team-fetcher";
import { Box, Container, Title, Skeleton, Flex } from "@mantine/core";
import { Suspense } from "react";

export default function Teams() {
  return (
    <Container fluid>
      <Box py="sm" className="main">
        <Title my="md" order={2} fz="xl">
          クラブ一覧
        </Title>
        <Suspense 
          fallback={
            <Box>
              <Skeleton height={40} mb="md" />
              <Flex direction="column" gap="sm">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={`team-skeleton-${i}`} height={18} />
                ))}
              </Flex>
            </Box>
          }
        >
          <Tab mb="md" />
          <TeamFetcher />
        </Suspense>
      </Box>
    </Container>
  );
}
