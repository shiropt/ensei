import { Flex, Skeleton } from "@mantine/core";

import type { FC } from "react";

export const FallbackTeamList: FC = async () => {
  return (
    <Flex direction="column" gap="sm">
      {[...new Array(20)].map((_, i) => {
        return <Skeleton h={18} visible key={`team-fallback-${i}`} />;
      })}
    </Flex>
  );
};
