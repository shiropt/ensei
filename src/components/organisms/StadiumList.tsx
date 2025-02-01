export const dynamic = "force-dynamic"; // キャッシュを完全に無効化

import { Card } from "@/components/molecules/Card";
import { getStadiums, Params } from "@/utils/supabase/db/actions";
import { Grid } from "@mantine/core";

import { FC } from "react";

type Props = {
  category: Params["category"];
};

export const StadiumList: FC<Props> = async ({ category }) => {
  const stadiums = await getStadiums({
    category,
  });

  return (
    <Grid>
      {stadiums.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </Grid>
  );
};
