import { Box, Container } from "@mantine/core";
import { Tab } from "@/components/molecules/Tab";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="main" p="lg">
      <Container fluid>
        <Tab />
        {children}
      </Container>
    </Box>
  );
}
