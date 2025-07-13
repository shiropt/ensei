"use client";
import { IconWithText } from "@/components/ui/icon-with-text";
import { Image } from "@/components/ui/image";
import type { Stadiums } from "@/utils/supabase/db/actions";
import { Box, Flex, Grid, Paper, Title } from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";

type Props = Stadiums[number];

export const Card: FC<Props> = ({
  id,
  name,
  homeTeams,
  capacity,
  // rating,
  imageUrl,
}) => {
  return (
    <Grid.Col span={12}>
      {/* TODO: FOUC 対応 */}
      <Box 
        component={Link} 
        href={`/stadiums/${id}`}
        td="none"
        c="inherit"
        display="block"
      >
        <Paper radius="sm" shadow="sm" style={{ cursor: "pointer" }}>
          <Flex direction="row" align="flex-start">
            <Box
              w={160}
              miw={160}
              h={120}
              style={{ borderRadius: "8px", overflow: "hidden" }}
              p={4}
            >
              <Image
                alt="スタジアム画像"
                src={imageUrl ?? ""}
                style={{ objectFit: "cover" }}
                height={112}
              />
            </Box>
            <Flex
              flex={1}
              justify="space-between"
              p="xs"
              gap="sm"
              direction="column"
            >
              <Flex direction="column">
                <Title fz={16} order={3} lineClamp={2} fw={500}>
                  {name}
                </Title>
              </Flex>
            <Flex direction="column">
              {capacity && (
                <IconWithText
                  text={`${Number(capacity).toLocaleString()}人`}
                  icon="users"
                  gap={3}
                  fz="sm"
                />
              )}
              <IconWithText text={homeTeams} icon="home" gap={3} fz="sm" />
            </Flex>
            </Flex>
          </Flex>
        </Paper>
      </Box>
    </Grid.Col>
  );
};
