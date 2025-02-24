import { IconWithText } from "@/components/molecules/IconWithText";
import { TeamDetail } from "@/components/organisms/Teams/Detail";
import { FallbackTeamDetail } from "@/components/organisms/Teams/Detail/fallback";
import { Container, NavLink } from "@mantine/core";
import Link from "next/link";
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
      <NavLink
        pl="0"
        leftSection={<IconWithText pt="xs" text="戻る" icon="arrowBackUp" />}
        component={Link}
        href={"/teams"}
      ></NavLink>
      <Suspense fallback={<FallbackTeamDetail />}>
        <TeamDetail id={id} match_ym={match_ym}></TeamDetail>
      </Suspense>
    </Container>
  );
}
