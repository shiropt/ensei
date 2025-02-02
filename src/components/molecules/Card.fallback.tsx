"use client";
import { Image } from "@/components/atoms/Image";
import { Flex, Grid, Paper, Skeleton } from "@mantine/core";
import { FC } from "react";

export const FallbackCard: FC = () => {
  return (
    <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <Paper radius="sm" p="sm">
        <Flex direction="column" gap="xs">
          <Skeleton visible>
            <Image alt="" src="" />
          </Skeleton>
          <Flex flex={1} justify="left" direction="column">
            <Flex direction="column" gap="xs">
              <Skeleton h={24} visible></Skeleton>
              <Skeleton h={16} visible></Skeleton>
              <Skeleton h={16} visible></Skeleton>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};
