"use client";
import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { Stadium } from "@/utils/supabase/db/actions";
import { Flex, Grid, Paper, Title } from "@mantine/core";
import { FC } from "react";

type Props = Stadium;

export const Card: FC<Props> = ({
  name,
  homeTeams,
  capacity,
  access,
  // rating,
  imageUrl,
}) => {
  return (
    <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <Paper radius="sm" p="sm">
        <Flex direction="column" gap="xs">
          <Image alt="スタジアム画像" src={imageUrl ?? ""} />
          <Flex flex={1} justify="left" direction="column">
            <Flex align="center" justify="space-between">
              <Title fz="md" order={3}>
                {name}
              </Title>
              {/* <IconWithText text={`4.${rating}`} icon="star" /> */}
            </Flex>
            {capacity && (
              <IconWithText
                text={`${capacity.toLocaleString()}人`}
                icon="users"
              />
            )}
            <IconWithText text={homeTeams} icon="home" />
            <IconWithText text={access} icon="mapPin" />
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};
