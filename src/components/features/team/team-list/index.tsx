"use client";
import { matchesCategory } from "@/utils/functions/string";
import type { Teams } from "@/utils/supabase/db/actions";
import { Box } from "@mantine/core";
import { useQueryState } from "nuqs";
import { useMemo, type FC } from "react";
import { ListItem } from "../team-list-item";

type Props = {
  teams: Teams;
};

export const TeamList: FC<Props> = ({ teams }) => {
  const [category] = useQueryState("category");
  const filteringList = useMemo(() => {
    return teams.filter(team => matchesCategory(team.category, category));
  }, [category, teams]);
  return (
    <Box>
      {filteringList.map(team => {
        return <ListItem key={team.id} team={team} />;
      })}
    </Box>
  );
};
