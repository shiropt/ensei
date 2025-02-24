"use client";
import { Teams } from "@/utils/supabase/db/actions";
import { List, NavLink, Paper } from "@mantine/core";
import Link from "next/link";

import { FC } from "react";
type Props = {
  team: Teams[number];
};

export const ListItem: FC<Props> = ({ team }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  return (
    <List.Item
      styles={{
        itemWrapper: {
          width: "100%",
        },
        itemLabel: {
          width: "100%",
        },
      }}
    >
      <Paper mb="xs" withBorder>
        <NavLink
          label={team.name}
          component={Link}
          href={`/teams/${team.id}?match_ym=${year}-${month}`}
        />
      </Paper>
    </List.Item>
  );
};
