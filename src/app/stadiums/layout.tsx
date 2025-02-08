import { Box, Container } from "@mantine/core";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="main" py="sm">
      <Container fluid>{children}</Container>
    </Box>
  );
}
