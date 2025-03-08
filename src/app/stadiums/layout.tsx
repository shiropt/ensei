import { Box, Container } from "@mantine/core";
import React from "react";

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
