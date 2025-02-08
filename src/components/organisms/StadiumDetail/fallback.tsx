import { Box, Flex, Skeleton, Text, Title } from "@mantine/core";

import { FC } from "react";

export const FallbackStadiumDetail: FC = async () => {
  return (
    <Flex direction="column" gap="sm" p="sm">
      <Skeleton mt="md" visible w="50%">
        <Title py="sm" fz="lg" order={2}></Title>
      </Skeleton>
      <Skeleton>
        <Box w="100%" h="200px"></Box>
      </Skeleton>
      <Skeleton visible>
        <Text py="sm"></Text>
      </Skeleton>
      <Skeleton visible>
        <Text py="sm"></Text>
      </Skeleton>
      <Skeleton visible>
        <Text py="sm"></Text>
      </Skeleton>
    </Flex>
  );
};
