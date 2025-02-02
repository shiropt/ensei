import { Params } from "@/utils/supabase/db/actions";

import { Suspense } from "react";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";
import { StadiumListWrapper } from "@/components/organisms/StadiumListWrapper";

type PageProps = {
  params: Promise<{ category: Params["category"] }>;
};

export async function generateStaticParams() {
  const categories = ["j1", "j2", "j3"];

  return categories.map((category) => ({
    category,
  }));
}

export default async function Home({ params }: PageProps) {
  const { category } = await params;

  return (
    <>
      <Suspense fallback={<FallbackStadiumList />}>
        <StadiumListWrapper category={category}></StadiumListWrapper>
      </Suspense>
    </>
  );
}
