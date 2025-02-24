import { IconWithText } from "@/components/molecules/IconWithText";
import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import { NavLink } from "@mantine/core";
import Link from "next/link";

type Props = {
  teamId?: number;
  match_ym?: string;
};

export const Footer: FC<Props> = ({ teamId, match_ym }) => {
  const date = new Date(match_ym ?? "");
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return (
    <Flex justify="space-between">
      <Box>
        <NavLink
          href={`/teams/${teamId}?match_ym=${y}-${m - 1}`}
          component={Link}
          leftSection={<IconWithText text="前へ" icon="chevronLeft" />}
        />
      </Box>
      <Box>
        <NavLink
          pr="0"
          href={`/teams/${teamId}?match_ym=${y}-${m + 1}`}
          component={Link}
          leftSection={
            <IconWithText text="次へ" icon="chevronRight" rightIcon />
          }
        />
      </Box>
    </Flex>
  );
};
