"use client";
import { ListItem } from "@/components/molecules/ListItem";
import { Teams } from "@/utils/supabase/db/actions";
import { Box, List } from "@mantine/core";
import { useQueryState } from "nuqs";
import { FC, useMemo } from "react";

type Props = {
  teams: Teams;
};

export const TeamList: FC<Props> = ({ teams }) => {
  const [category] = useQueryState("category");
  const filteringList = useMemo(() => {
    return teams.filter((team) => {
      return category === "all" || !category
        ? team
        : team.category?.includes(category);
    });
  }, [category, teams]);
  return (
    <Box>
      <List>
        {filteringList.map((team) => {
          return <ListItem key={team.id} team={team} />;
        })}
      </List>
    </Box>
  );
};
