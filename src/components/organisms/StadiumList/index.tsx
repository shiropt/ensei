"use client";
import { Card } from "@/components/molecules/Card";
import { Stadiums } from "@/utils/supabase/db/actions";
import { Grid } from "@mantine/core";
import { useQueryState } from "nuqs";

import { FC, useMemo } from "react";

type Props = {
  stadiums: Stadiums;
};

const normalize = (str: string | null) => {
  return str
    ? str
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u3041-\u3096]/g, (char) =>
          String.fromCharCode(char.charCodeAt(0) + 0x60)
        )
        .replace(/\s+/g, "")
    : "";
};

const filterBySearchQuery = (stadium: Stadiums[number], query: string) => {
  return (
    normalize(stadium.name).includes(query) ||
    normalize(stadium.homeTeam).includes(query) ||
    normalize(stadium.description).includes(query) ||
    normalize(stadium.shortName).includes(query) ||
    normalize(stadium.location).includes(query) ||
    normalize(stadium.access).includes(query)
  );
};

export const StadiumList: FC<Props> = ({ stadiums }) => {
  const [searchWord] = useQueryState("search");
  const [category] = useQueryState("category");

  const filteringList = useMemo(() => {
    const filteredStadiumsBySearchQuery = stadiums.filter((stadium) =>
      filterBySearchQuery(stadium, normalize(searchWord))
    );
    return category === "all" || !category
      ? filteredStadiumsBySearchQuery
      : filteredStadiumsBySearchQuery.filter((stadium) =>
          stadium.categories.includes(category)
        );
  }, [searchWord, stadiums, category]);

  return (
    <Grid>
      {filteringList.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </Grid>
  );
};
