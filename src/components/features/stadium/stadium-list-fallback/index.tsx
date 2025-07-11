import { FallbackCard } from "@/components/ui/card-fallback";
import { Grid } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

export const FallbackStadiumList: FC = () => {
  return (
    <Grid>
      {generateArrayWithKeys(
        6,
        (_, key) => (
          <Grid.Col 
            key={key} 
            span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          >
            <FallbackCard />
          </Grid.Col>
        ),
        "stadium-fallback"
      )}
    </Grid>
  );
};

// 後方互換性のためのエイリアス  
export const StadiumListFallback = FallbackStadiumList;