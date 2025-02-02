import { Box, Container } from "@mantine/core";
import { Tab } from "@/components/molecules/Tab";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="main" py="sm">
      <Container fluid>
        <Tab mb="md" />
        {children}
      </Container>
    </Box>
  );
}
