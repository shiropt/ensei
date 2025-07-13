import { FallbackCard } from "@/components/ui/card-fallback";
import { generateArrayWithKeys } from "@/utils/functions/array";
import { Grid, GridCol } from "@mantine/core";
import type { FC } from "react";

export const FallbackStadiumList: FC = () => {
  return (
    <Grid>
      {generateArrayWithKeys(
        6,
        (_, key) => (
          <GridCol key={key} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <FallbackCard />
          </GridCol>
        ),
        "stadium-fallback",
      )}
    </Grid>
  );
};

// 後方互換性のためのエイリアス
export const StadiumListFallback = FallbackStadiumList;
