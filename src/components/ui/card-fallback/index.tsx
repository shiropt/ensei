import { generateArrayWithKeys } from "@/utils/functions/array";
import { Box, Flex, GridCol, Paper, Skeleton } from "@mantine/core";
import type { FC } from "react";

interface CardFallbackProps {
  showImage?: boolean;
  lines?: number;
}

export const CardFallback: FC<CardFallbackProps> = ({
  showImage = true,
  lines = 3,
}) => {
  return (
    <GridCol span={12}>
      <Paper radius="sm" shadow="sm">
        <Flex direction="row" align="flex-start">
          {showImage && (
            <Box
              w={160}
              miw={160}
              h={120}
              style={{ borderRadius: "8px", overflow: "hidden" }}
              p={4}
            >
              <Skeleton height={112} visible />
            </Box>
          )}
          <Flex
            flex={1}
            justify="space-between"
            p="xs"
            gap="sm"
            direction="column"
          >
            <Flex direction="column">
              <Skeleton h={24} visible />
            </Flex>
            <Flex direction="column">
              {generateArrayWithKeys(
                lines - 1,
                (i, key) => (
                  <Skeleton key={key} h={16} visible mb="xs" />
                ),
                "card-fallback-line",
              )}
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </GridCol>
  );
};

// 後方互換性のためのエイリアス
export const FallbackCard = CardFallback;
