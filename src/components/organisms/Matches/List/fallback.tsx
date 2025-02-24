import { Flex, Skeleton, Text } from "@mantine/core";

import { FC } from "react";

export const FallbackMatchList: FC = async () => {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton h="86px" visible>
        <Text></Text>
      </Skeleton>
      <Skeleton h="86px" visible>
        <Text></Text>
      </Skeleton>
      <Skeleton h="86px" visible>
        <Text></Text>
      </Skeleton>
    </Flex>
  );
};
