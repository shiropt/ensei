export const dynamic = "force-dynamic"; // キャッシュを完全に無効化

import { Tab } from "@/components/molecules/Tab";
import { Params } from "@/utils/supabase/db/actions";

import { StadiumList } from "@/components/organisms/StadiumList";
import { Box, Container } from "@mantine/core";
import { createLoader, parseAsString, SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";

const coordinatesSearchParams = {
  category: parseAsString.withDefault("all"),
} as const;

const loadSearchParams = createLoader(coordinatesSearchParams);

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { category } = await loadSearchParams(searchParams);

  return (
    <Box className="main" p="lg">
      <Container fluid>
        <Tab />
        <Suspense key={category} fallback={<FallbackStadiumList />}>
          <StadiumList category={category as Params["category"]}></StadiumList>
        </Suspense>
      </Container>
    </Box>
  );
}
