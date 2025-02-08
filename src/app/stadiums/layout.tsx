import { Box, Container, Title } from "@mantine/core";
import { Tab } from "@/components/molecules/Tab";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="main" py="sm">
      <Container fluid>
        <Title my="md" order={2} fz="xl">
          スタジアム一覧
        </Title>
        <Tab mb="md" />
        {children}
      </Container>
    </Box>
  );
}
