import { IconWithText } from "@/components/molecules/IconWithText";
import { Footer } from "@/components/organisms/Matches/Footer";
import { MatchCard } from "@/components/organisms/Matches/MatchCard";
import { FallbackStadiumDetail } from "@/components/organisms/StadiumDetail/fallback";
import { getMatchesByTeam, getTeam } from "@/utils/supabase/db/actions";
import { Container, Paper, NavLink } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ match_ym: string | undefined }>;
}) {
  const { id } = await params;
  const { match_ym } = await searchParams;

  const team = await getTeam(parseInt(id, 10));
  const matches = await getMatchesByTeam(
    parseInt(id, 10),
    match_ym ?? new Date().getFullYear() + "-" + (new Date().getMonth() + 1)
  );

  console.log(match_ym);
  return (
    <Container className="main" fluid>
      <NavLink
        pl="0"
        leftSection={<IconWithText pt="xs" text="戻る" icon="arrowBackUp" />}
        component={Link}
        href={"/teams"}
      ></NavLink>
      <Suspense fallback={<FallbackStadiumDetail />}>
        <Paper mb="md" withBorder p="sm">
          {team?.name}
        </Paper>
        {matches.map((match) => {
          return <MatchCard key={match.id} match={match} />;
        })}
      </Suspense>
      <Footer teamId={team?.id} match_ym={match_ym} />
    </Container>
  );
}
