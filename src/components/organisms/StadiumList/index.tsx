"use client";
import { Card } from "@/components/molecules/Card";
import type { Stadiums } from "@/utils/supabase/db/actions";
import { matchesSearchQuery, matchesCategory } from "@/utils/functions/string";
import { Grid } from "@mantine/core";
import { useQueryState } from "nuqs";

import { useMemo, type FC } from "react";

type Props = {
  stadiums: Stadiums;
};

export const StadiumList: FC<Props> = ({ stadiums }) => {
  const [searchWord] = useQueryState("search");
  const [category] = useQueryState("category");

  const filteringList = useMemo(() => {
    return stadiums.filter((stadium) => {
      // 検索クエリでフィルタリング
      const searchMatches = matchesSearchQuery([
        stadium.name,
        stadium.homeTeams,
        stadium.shortName,
        stadium.address,
        stadium.access,
        stadium.description,
      ], searchWord);
      
      // カテゴリでフィルタリング
      const categoryMatches = matchesCategory(stadium.categories, category);
      
      return searchMatches && categoryMatches;
    });
  }, [searchWord, stadiums, category]);

  return (
    <Grid>
      {filteringList.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </Grid>
  );
};
