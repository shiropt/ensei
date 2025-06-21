import { IconWithText } from "@/components/molecules/IconWithText";
import { Box, Flex, NavLink } from "@mantine/core";
import { FC } from "react";
import Link from "next/link";
import { formatJstTime } from "@/utils/functions/date";

type Props = {
  teamId?: number;
  match_ym?: string;
};

export const Footer: FC<Props> = ({ teamId, match_ym }) => {
  const date = new Date(match_ym ?? "");
  const { year, month } = formatJstTime(date);
  const yearAsNumber = parseInt(year ?? "", 10);
  const monthAsNumber = parseInt(month ?? "", 10);

  return (
    <Flex justify="space-between">
      <Box>
        {monthAsNumber > 1 && (
          <NavLink
            href={`/teams/${teamId}?match_ym=${yearAsNumber}-${
              monthAsNumber - 1
            }`}
            component={Link}
            leftSection={<IconWithText text="前へ" icon="chevronLeft" />}
          />
        )}
      </Box>
      <Box>
        {monthAsNumber < 12 && (
          <NavLink
            pr="0"
            href={`/teams/${teamId}?match_ym=${yearAsNumber}-${
              monthAsNumber + 1
            }`}
            component={Link}
            leftSection={
              <IconWithText text="次へ" icon="chevronRight" rightIcon />
            }
          />
        )}
      </Box>
    </Flex>
  );
};
