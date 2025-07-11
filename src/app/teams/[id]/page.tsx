import { BackPage } from "@/components/ui/back-page";
import { TeamDetail } from "@/components/features/team/team-detail";
import { FallbackTeamDetail } from "@/components/features/team/team-detail-fallback";
import { Container } from "@mantine/core";
import { Suspense } from "react";

export async function generateStaticParams() {
  return Array.from({ length: 60 }, (_, i) => (i + 1).toString()).map((id) => ({
    id,
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ match_ym: string | undefined }>;
}) {
  const { id } = await params;
  const { match_ym } = await searchParams;

  return (
    <Container className="main" fluid>
      <BackPage />
      <Suspense fallback={<FallbackTeamDetail />}>
        <TeamDetail id={id} match_ym={match_ym} />
      </Suspense>
    </Container>
  );
}
