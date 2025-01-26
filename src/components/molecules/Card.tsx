"use client";
import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { Badge, Flex, Grid, Paper, Title } from "@mantine/core";
import { FC } from "react";
type Props = {
  id: number;
  created_at: string;
  name: string;
  homeTeam: string;
  capacity: number;
  access: string;
  rating: number;
  description: string;
  location: string;
  shortName: string;
  imageUrl: string;
};

export const Card: FC<Props> = ({
  name,
  homeTeam,
  capacity,
  access,
  rating,
  imageUrl,
}) => {
  return (
    <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <Paper withBorder radius="sm" p="sm">
        <Flex direction="column" gap="xs">
          <Image alt="スタジアム画像" src={imageUrl} />
          <Flex flex={1} justify="left" direction="column">
            <Flex align="center" justify="space-between">
              <Title fz="md" c="gray.9" order={3}>
                {name}
              </Title>
              <IconWithText text={`4.${rating}`} icon="star" />
            </Flex>
            <IconWithText
              text={`${capacity.toLocaleString()}人`}
              icon="users"
            />
            <IconWithText text={homeTeam} icon="home" />
            <IconWithText text={access} icon="mapPin" />
            <Flex mt="xs" mb="4" gap="xs">
              <Badge variant="light" p="xs" color="blue.3">
                屋内
              </Badge>
              <Badge variant="light" p="xs" color="blue.3">
                駅近
              </Badge>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};
