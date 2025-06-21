import { FallbackCard } from "@/components/molecules/CardFallback";
import { Grid } from "@mantine/core";

import { FC } from "react";

export const FallbackStadiumList: FC = async () => {
  return (
    <Grid>
      {[...new Array(6)].map((_, i) => {
        return <FallbackCard key={i} />;
      })}
    </Grid>
  );
};
