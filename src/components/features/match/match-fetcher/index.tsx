import { MatchList } from "@/components/features/match/match-list";
import { getMatches } from "@/utils/supabase/db/actions";
import { Flex, Skeleton } from "@mantine/core";
import { endOfMonth, startOfMonth } from "date-fns";
import { Suspense } from "react";

type MatchFetcherProps = {
  searchParams?: Promise<{ month?: string; category?: string }>;
};

const MatchData = async ({
  searchParams,
}: {
  searchParams?: { month?: string; category?: string };
}) => {
  const monthParam = searchParams?.month;
  const currentDate = monthParam ? new Date(monthParam) : new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  try {
    // 全カテゴリーのデータを取得（クライアントサイドでフィルタリング）
    const matches = await getMatches(monthStart, monthEnd, "all");
    return <MatchList matches={matches || []} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch matches:", error);
    return <MatchList matches={[]} />;
  }
};

const MatchListFallback = () => (
  <Flex direction="column" gap="sm">
    {Array.from({ length: 10 }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={`match-skeleton-${i}`} height={80} />
    ))}
  </Flex>
);

export const MatchFetcher = async ({ searchParams }: MatchFetcherProps) => {
  const params = searchParams ? await searchParams : undefined;

  return (
    <Suspense fallback={<MatchListFallback />}>
      <MatchData searchParams={params} />
    </Suspense>
  );
};
