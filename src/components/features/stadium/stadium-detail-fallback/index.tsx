import { Box, Flex, Skeleton, Text, Title } from "@mantine/core";
import type { FC } from "react";

export const FallbackStadiumDetail: FC = () => {
  return (
    <Flex direction="column" gap="sm" p="sm">
      <Skeleton mt="md" visible w="50%">
        <Title py="sm" fz="lg" order={2} />
      </Skeleton>
      <Skeleton>
        <Box w="100%" h="200px" />
      </Skeleton>
      <Skeleton visible>
        <Text py="sm" />
      </Skeleton>
      <Skeleton visible>
        <Text py="sm" />
      </Skeleton>
      <Skeleton visible>
        <Text py="sm" />
      </Skeleton>
    </Flex>
  );
};

// 後方互換性のためのエイリアス
export const StadiumDetailFallback = FallbackStadiumDetail;