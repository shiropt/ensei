import { MatchFetcher } from "@/components/features/match/match-fetcher";
import { CategoryTab } from "@/components/ui/category-tab";
import { MonthNavigation } from "@/components/ui/month-navigation";
import { Box, Container, Skeleton } from "@mantine/core";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ month?: string; category?: string }>;
};

export default function Matches({ searchParams }: PageProps) {
  return (
    <Box className="main">
      <Container fluid px={0}>
        <Suspense
          fallback={
            <Box>
              <Skeleton height={40} mb="md" />
              <Skeleton height={48} mb="md" />
            </Box>
          }
        >
          <CategoryTab />
          <MonthNavigation />
          <Box p="md">
            <MatchFetcher searchParams={searchParams} />
          </Box>
        </Suspense>
      </Container>
    </Box>
  );
}
