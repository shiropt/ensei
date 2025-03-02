import { BackPage } from "@/components/molecules/BackPage";
import { StadiumDetail } from "@/components/organisms/StadiumDetail";
import { FallbackStadiumDetail } from "@/components/organisms/StadiumDetail/fallback";
import { Box } from "@mantine/core";
import { Suspense } from "react";

export async function generateStaticParams() {
  return Array.from({ length: 60 }, (_, i) => (i + 1).toString()).map((id) => ({
    id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from: string | undefined }>;
}) {
  const { id } = await params;
  return (
    <Box>
      <BackPage />
      <Suspense fallback={<FallbackStadiumDetail />}>
        <StadiumDetail id={id}></StadiumDetail>
      </Suspense>
    </Box>
  );
}
