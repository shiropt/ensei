import { Box, Container } from "@mantine/core";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="main">
      <Container fluid>{children}</Container>
    </Box>
  );
}
