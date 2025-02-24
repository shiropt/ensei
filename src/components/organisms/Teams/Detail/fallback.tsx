import { Flex, Skeleton, Text, Title } from "@mantine/core";

import { FC } from "react";

export const FallbackTeamDetail: FC = async () => {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton mt="sm" visible h="50px">
        <Title py="sm" fz="lg" order={2}></Title>
      </Skeleton>

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
