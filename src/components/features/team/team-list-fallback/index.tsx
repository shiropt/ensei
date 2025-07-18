import { Flex, Skeleton } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

export const FallbackTeamList: FC = () => {
  return (
    <Flex direction="column" gap="sm">
      {generateArrayWithKeys(
        20,
        (_, key) => <Skeleton h={18} visible key={key} />,
        "team-fallback"
      )}
    </Flex>
  );
};

// 後方互換性のためのエイリアス
export const TeamListFallback = FallbackTeamList;