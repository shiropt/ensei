"use client";
import type { Teams } from "@/utils/supabase/db/actions";
import { Flex, Stack, Text, UnstyledButton } from "@mantine/core";
import {
  IconBuilding,
  IconChevronRight,
  IconMapPin,
} from "@tabler/icons-react";
import Link from "next/link";
import type { FC } from "react";
import classes from "./team-list-item.module.css";

type Props = {
  team: Teams[number];
};

export const ListItem: FC<Props> = ({ team }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  return (
    <UnstyledButton
      component={Link}
      href={`/teams/${team.id}?match_ym=${year}-${month}`}
      className={classes.card}
    >
      <Flex align="center" justify="space-between" h="100%">
        <Stack gap={4}>
          <Text fw={500} size="md" className={classes.teamName}>
            {team.name}
          </Text>
          {team.stadiums && team.stadiums.length > 0 && (
            <Stack gap={2}>
              {team.stadiums[0].address && (
                <Flex align="center" gap={4}>
                  <IconMapPin
                    size={14}
                    stroke={1.5}
                    style={{ flexShrink: 0 }}
                  />
                  <Text size="sm" c="dimmed">
                    {team.stadiums[0].address}
                  </Text>
                </Flex>
              )}
              {team.stadiums[0].name && (
                <Flex align="center" gap={4}>
                  <IconBuilding
                    size={14}
                    stroke={1.5}
                    style={{ flexShrink: 0 }}
                  />
                  <Text size="sm" c="dimmed">
                    {team.stadiums[0].name}
                  </Text>
                </Flex>
              )}
            </Stack>
          )}
        </Stack>
        <IconChevronRight size={20} className={classes.chevron} />
      </Flex>
    </UnstyledButton>
  );
};

// 後方互換性のためのエイリアス
export const TeamListItem = ListItem;
