import { formatJstTime } from "@/utils/functions/date";
import { Matches } from "@/utils/supabase/db/actions";
import { Divider, Flex, Paper, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  match: Matches[number];
};

export const MatchCard: FC<Props> = ({ match }) => {
  const { month, day, hour, minute } = formatJstTime(match.date);

  return (
    <Paper mb="sm" withBorder key={match.id}>
      <Flex justify="space-between" px="sm" py="4px">
        <Text>
          {`第${match.section}節`} {month}月{day}日
        </Text>
        <Text>{match.stadium}</Text>
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
