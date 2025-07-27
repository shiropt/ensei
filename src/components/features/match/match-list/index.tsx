"use client";
import { MatchListItem } from "@/components/features/match/match-list-item";
import { Box, Stack, Text } from "@mantine/core";
import type { matches, stadiums, teams } from "@prisma/client";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

type MatchWithRelations = matches & {
  teams_matches_home_team_idToteams: teams | null;
  teams_matches_away_team_idToteams: teams | null;
  stadiums: stadiums | null;
};

type MatchListProps = {
  matches: MatchWithRelations[];
};

export const MatchList = ({ matches }: MatchListProps) => {
  const [category] = useQueryState("category");

  const filteredMatches = useMemo(() => {
    if (!category || category === "all") {
      return matches;
    }
    
    // カテゴリーでフィルタリング
    const categoryMap: { [key: string]: string[] } = {
      j1: ["J1", "Ｊ１"],
      j2: ["J2", "Ｊ２"],
      j3: ["J3", "Ｊ３"],
    };
    
    const validCategories = categoryMap[category.toLowerCase()] || [category.toUpperCase()];
    
    return matches.filter(match => {
      return match.category && validCategories.includes(match.category);
    });
  }, [matches, category]);

  if (!filteredMatches || filteredMatches.length === 0) {
    return (
      <Box p="xl" ta="center">
        <Text c="dimmed">この月の試合データはありません</Text>
      </Box>
    );
  }

  return (
    <Stack gap="xs">
      {filteredMatches.map(match => (
        <MatchListItem key={match.id} match={match} />
      ))}
    </Stack>
  );
};
