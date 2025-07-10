import { formatJstTime } from "@/utils/functions/date";
import type { Matches } from "@/utils/supabase/db/actions";
import { Box, Divider, Flex, NavLink, Paper, Text } from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  match: Matches[number];
};

export const MatchCard: FC<Props> = ({ match }) => {
  if (!match.date) {
    return (
      <Paper mb={{ base: "xs", md: "sm" }} withBorder key={match.id} p={{ base: "xs", md: "sm" }}>
        <Flex justify="space-between" align="center" px={{ base: "xs", md: "sm" }}>
          <Text fz={{ base: "xs", md: "sm" }}>
            {`第${match.section}節`} 日程未定
          </Text>
          <Box>
            <NavLink
              component={Link}
              label={match.stadium}
              href={`/stadiums/${match.stadiumId}`}
              fz={{ base: "xs", md: "sm" }}
            />
          </Box>
        </Flex>
        <Divider />
        <Flex px={{ base: "sm", md: "lg" }} py={{ base: "xs", md: "sm" }} justify="space-between">
          <Text flex={1} fz={{ base: "xs", md: "sm" }}>{match.homeTeam}</Text>
          <Text ta="center" flex={1} fz={{ base: "xs", md: "sm" }}>
            {match.score || "未定"}
          </Text>
          <Text ta="right" flex={1} fz={{ base: "xs", md: "sm" }}>
            {match.awayTeam}
          </Text>
        </Flex>
      </Paper>
    );
  }

  const { month, day, hour, minute } = formatJstTime(match.date);

  return (
    <Paper mb={{ base: "xs", md: "sm" }} withBorder key={match.id} p={{ base: "xs", md: "sm" }}>
      <Flex justify="space-between" align="center" px={{ base: "xs", md: "sm" }}>
        <Text fz={{ base: "xs", md: "sm" }}>
          {`第${match.section}節`} {month}月{day}日
        </Text>
        <Box>
          <NavLink
            component={Link}
            label={match.stadium}
            href={`/stadiums/${match.stadiumId}`}
            fz={{ base: "xs", md: "sm" }}
          />
        </Box>
      </Flex>
      <Divider />
      <Flex px={{ base: "sm", md: "lg" }} py={{ base: "xs", md: "sm" }} justify="space-between">
        <Text flex={1} fz={{ base: "xs", md: "sm" }}>{match.homeTeam}</Text>
        <Text ta="center" flex={1} fz={{ base: "xs", md: "sm" }}>
          {match.score || `${hour}時${minute}分`}
        </Text>
        <Text ta="right" flex={1} fz={{ base: "xs", md: "sm" }}>
          {match.awayTeam}
        </Text>
      </Flex>
    </Paper>
  );
};
