import { Flex, Skeleton, Text } from "@mantine/core";

import type { FC } from "react";

export const FallbackMatchList: FC = async () => {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton h="86px" visible>
        <Text />
      </Skeleton>
      <Skeleton h="86px" visible>
        <Text />
      </Skeleton>
      <Skeleton h="86px" visible>
        <Text />
      </Skeleton>
    </Flex>
  );
};
