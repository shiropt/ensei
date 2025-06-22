import { Box, Title, Text, Button } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box ta="center" py="xl">
      <Title order={1}>404</Title>
      <Text size="lg" mt="md">ページが見つかりません</Text>
      <Button component={Link} href="/" mt="md">
        ホームに戻る
      </Button>
    </Box>
  );
}