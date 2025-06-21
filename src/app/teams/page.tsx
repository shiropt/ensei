import { Tab } from "@/components/molecules/Tab";
import { TeamFetcher } from "@/components/organisms/TeamList/TeamFetcher";
import { Box, Container, Title } from "@mantine/core";

export default function Teams() {
  return (
    <Container fluid>
      <Box py="sm" className="main">
        <Title my="md" order={2} fz="xl">
          クラブ一覧
        </Title>
        <Tab mb="md" />
        <TeamFetcher />
      </Box>
    </Container>
  );
}
