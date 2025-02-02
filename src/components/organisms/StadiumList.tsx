"use client";
import { Card } from "@/components/molecules/Card";
import { Stadium, Stadiums } from "@/utils/supabase/db/actions";
import { Grid } from "@mantine/core";
import { useQueryState } from "nuqs";

import { FC, useMemo } from "react";

type Props = {
  stadiumList: Stadiums;
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

const filterByQuery = (stadium: Stadium, query: string) => {
  return (
    normalize(stadium.name).includes(query) ||
    normalize(stadium.homeTeam).includes(query) ||
    normalize(stadium.description).includes(query) ||
    normalize(stadium.shortName).includes(query) ||
    normalize(stadium.location).includes(query) ||
    normalize(stadium.access).includes(query)
  );
};

export const StadiumList: FC<Props> = ({ stadiumList }) => {
  const [searchWord] = useQueryState("search");

  const filteringList = useMemo(
    () =>
      stadiumList.filter((stadium) =>
        filterByQuery(stadium, normalize(searchWord))
      ),
    [searchWord, stadiumList]
  );

  return (
    <Grid>
      {filteringList.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </Grid>
  );
};
