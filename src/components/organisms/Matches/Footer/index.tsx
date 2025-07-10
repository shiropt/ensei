import { IconWithText } from "@/components/molecules/IconWithText";
import { formatJstTime } from "@/utils/functions/date";
import { Box, Flex, NavLink } from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";

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
    <Flex justify="space-between" p={{ base: "xs", md: "sm" }}>
      <Box>
        {monthAsNumber > 1 && (
          <NavLink
            href={`/teams/${teamId}?match_ym=${yearAsNumber}-${
              monthAsNumber - 1
            }`}
            component={Link}
            leftSection={<IconWithText text="前へ" icon="chevronLeft" />}
            p={{ base: "xs", md: "sm" }}
            fz={{ base: "xs", md: "sm" }}
            style={{ minHeight: "44px" }}
          />
        )}
      </Box>
      <Box>
        {monthAsNumber < 12 && (
          <NavLink
            href={`/teams/${teamId}?match_ym=${yearAsNumber}-${
              monthAsNumber + 1
            }`}
            component={Link}
            leftSection={
              <IconWithText text="次へ" icon="chevronRight" rightIcon />
            }
            p={{ base: "xs", md: "sm" }}
            fz={{ base: "xs", md: "sm" }}
            style={{ minHeight: "44px" }}
          />
        )}
      </Box>
    </Flex>
  );
};
