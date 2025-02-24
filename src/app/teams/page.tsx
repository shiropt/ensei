import { Tab } from "@/components/molecules/Tab";
import { FallbackTeamList } from "@/components/organisms/TeamList/fallback";
import { Fetcher } from "@/components/organisms/TeamList/Fetcher";
import { Box, Container, Title } from "@mantine/core";
import { Suspense } from "react";

export default function Teams() {
  return (
    <Container fluid>
      <Box py="sm" className="main">
        <Title my="md" order={2} fz="xl">
          クラブ一覧
        </Title>
        <Tab mb="md" />
        <Suspense fallback={<FallbackTeamList />}>
          <Fetcher />
        </Suspense>
      </Box>
    </Container>
  );
}
