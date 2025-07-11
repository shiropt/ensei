import { Flex, Skeleton, Text } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

export const FallbackMatchList: FC = () => {
  return (
    <Flex direction="column" gap="sm">
      {generateArrayWithKeys(
        3,
        (_, key) => (
          <Skeleton key={key} h="86px" visible>
            <Text />
          </Skeleton>
        ),
        "match-fallback"
      )}
    </Flex>
  );
};

// 後方互換性のためのエイリアス
export const MatchListFallback = FallbackMatchList;