import { Image } from "@/components/ui/image";
import { Flex, Paper, Skeleton } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

interface CardFallbackProps {
  showImage?: boolean;
  lines?: number;
}

export const CardFallback: FC<CardFallbackProps> = ({ 
  showImage = true, 
  lines = 3 
}) => {
  return (
    <Paper radius="sm" p="sm">
      <Flex direction="column" gap="xs">
        {showImage && (
          <Skeleton visible>
            <Image alt="" src="" />
          </Skeleton>
        )}
        <Flex flex={1} justify="left" direction="column">
          <Flex direction="column" gap="xs">
            {generateArrayWithKeys(
              lines,
              (i, key) => (
                <Skeleton 
                  key={key}
                  h={i === 0 ? 24 : 16} 
                  visible 
                />
              ),
              "card-fallback-line"
            )}
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};

// 後方互換性のためのエイリアス
export const FallbackCard = CardFallback;