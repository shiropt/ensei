import { formatJstTime } from "@/utils/functions/date";
import { Matches } from "@/utils/supabase/db/actions";
import { Box, Divider, Flex, NavLink, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type Props = {
  match: Matches[number];
};

export const MatchCard: FC<Props> = ({ match }) => {
  if (!match.date) {
    return (
      <Paper mb="sm" withBorder key={match.id}>
        <Flex justify="space-between" align="center" px="sm">
          <Text>
            {`第${match.section}節`} 日程未定
          </Text>
          <Box>
            <NavLink
              component={Link}
              label={match.stadium}
              href={`/stadiums/${match.stadiumId}`}
            />
          </Box>
        </Flex>
        <Divider />
        <Flex px="lg" py="sm" justify="space-between">
          <Text flex={1}>{match.homeTeam}</Text>
          <Text ta="center" flex={1}>
            未定
          </Text>
          <Text ta="right" flex={1}>
            {match.awayTeam}
          </Text>
        </Flex>
      </Paper>
    );
  }

  const { month, day, hour, minute } = formatJstTime(match.date);

  return (
    <Paper mb="sm" withBorder key={match.id}>
      <Flex justify="space-between" align="center" px="sm">
        <Text>
          {`第${match.section}節`} {month}月{day}日
        </Text>
        <Box>
          <NavLink
            component={Link}
            label={match.stadium}
            href={`/stadiums/${match.stadiumId}`}
          />
        </Box>
      </Flex>
      <Divider />
      <Flex px="lg" py="sm" justify="space-between">
        <Text flex={1}>{match.homeTeam}</Text>
        <Text ta="center" flex={1}>
          {hour}時{minute}分
        </Text>
        <Text ta="right" flex={1}>
          {match.awayTeam}
        </Text>
      </Flex>
    </Paper>
  );
};
