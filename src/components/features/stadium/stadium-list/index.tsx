"use client";
import { Card } from "@/components/ui/card";
import { matchesCategory } from "@/utils/functions/string";
import type { Stadiums } from "@/utils/supabase/db/actions";
import { Grid } from "@mantine/core";
import { useQueryState } from "nuqs";

import { useMemo, type FC } from "react";

type Props = {
  stadiums: Stadiums;
};

export const StadiumList: FC<Props> = ({ stadiums }) => {
  const [category] = useQueryState("category");

  const filteringList = useMemo(() => {
    return stadiums.filter(stadium => {
      // カテゴリでフィルタリング
      const categoryMatches = matchesCategory(stadium.categories, category);

      return categoryMatches;
    });
  }, [stadiums, category]);

  return (
    <Grid>
      {filteringList.map(item => {
        return <Card key={item.id} {...item} />;
      })}
    </Grid>
  );
};
