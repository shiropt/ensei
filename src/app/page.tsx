import { Tab } from "@/components/molecules/Tab";
import { Params } from "@/utils/supabase/db/actions";

import { Box, Container } from "@mantine/core";
import { createLoader, parseAsString, SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";
import { StadiumListWrapper } from "@/components/organisms/StadiumListWrapper";

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
          <StadiumListWrapper
            category={category as Params["category"]}
          ></StadiumListWrapper>
        </Suspense>
      </Container>
    </Box>
  );
}
