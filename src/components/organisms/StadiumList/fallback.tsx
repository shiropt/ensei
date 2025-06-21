import { FallbackCard } from "@/components/molecules/CardFallback";
import { Grid } from "@mantine/core";

import type { FC } from "react";

export const FallbackStadiumList: FC = async () => {
  return (
    <Grid>
      {[...new Array(6)].map((_, i) => {
        return <FallbackCard key={i} />;
      })}
    </Grid>
  );
};
