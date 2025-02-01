import { Params } from "@/utils/supabase/db/actions";

import { StadiumList } from "@/components/organisms/StadiumList";
import { Suspense } from "react";
import { FallbackStadiumList } from "@/components/organisms/StadiumList.fallback";

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
        <StadiumList category={category}></StadiumList>
      </Suspense>
    </>
  );
}
