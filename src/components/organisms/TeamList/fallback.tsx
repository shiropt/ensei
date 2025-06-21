import { Flex, Skeleton } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

export const FallbackTeamList: FC = async () => {
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
