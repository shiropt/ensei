import { Flex, Skeleton, Text, Title } from "@mantine/core";
import type { FC } from "react";

export const FallbackTeamDetail: FC = () => {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton mt="sm" visible h="50px">
        <Title py="sm" fz="lg" order={2} />
      </Skeleton>

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

// 後方互換性のためのエイリアス
export const TeamDetailFallback = FallbackTeamDetail;