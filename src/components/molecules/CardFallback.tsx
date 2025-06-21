import { Image } from "@/components/atoms/Image";
import { Flex, Grid, Paper, Skeleton } from "@mantine/core";
import type { FC } from "react";

interface CardFallbackProps {
  showImage?: boolean;
  lines?: number;
}

export const CardFallback: FC<CardFallbackProps> = ({ 
  showImage = true, 
  lines = 3 
}) => {
  return (
    <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <Paper radius="sm" p="sm">
        <Flex direction="column" gap="xs">
          {showImage && (
            <Skeleton visible>
              <Image alt="" src="" />
            </Skeleton>
          )}
          <Flex flex={1} justify="left" direction="column">
            <Flex direction="column" gap="xs">
              {[...Array(lines)].map((_, i) => (
                <Skeleton 
                  key={`card-fallback-line-${i}`} 
                  h={i === 0 ? 24 : 16} 
                  visible 
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};

// 後方互換性のためのエイリアス
export const FallbackCard = CardFallback;
