"use client";
import { Badge, Card, Flex, Group, Stack, Text } from "@mantine/core";
import type { matches, stadiums, teams } from "@prisma/client";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type MatchWithRelations = matches & {
  teams_matches_home_team_idToteams: teams | null;
  teams_matches_away_team_idToteams: teams | null;
  stadiums: stadiums | null;
};

type MatchListItemProps = {
  match: MatchWithRelations;
};

export const MatchListItem = ({ match }: MatchListItemProps) => {
  const homeTeam = match.teams_matches_home_team_idToteams;
  const awayTeam = match.teams_matches_away_team_idToteams;
  const stadium = match.stadiums;

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Badge color="blue" variant="light">
            {match.category}
          </Badge>
          <Group gap="xs">
            <IconCalendar size={16} />
            <Text size="sm" c="dimmed">
              {format(new Date(match.date), "MM月dd日(E) HH:mm", {
                locale: ja,
              })}
            </Text>
          </Group>
        </Group>

        <Flex justify="center" align="center" gap="md">
          <Text fw={500} size="lg" ta="right" style={{ flex: 1 }}>
            {homeTeam?.name || "未定"}
          </Text>
          <Text size="sm" c="dimmed">
            VS
          </Text>
          <Text fw={500} size="lg" ta="left" style={{ flex: 1 }}>
            {awayTeam?.name || "未定"}
          </Text>
        </Flex>

        {match.score && (
          <Text ta="center" size="xl" fw={700}>
            {match.score}
          </Text>
        )}

        <Group gap="xs">
          <IconMapPin size={16} />
          <Text size="sm" c="dimmed">
            {stadium?.name || "未定"}
          </Text>
        </Group>

        {match.attendance && (
          <Text size="sm" c="dimmed">
            観客数: {match.attendance.toLocaleString()}人
          </Text>
        )}
      </Stack>
    </Card>
  );
};
