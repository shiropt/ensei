import { FallbackCard } from "@/components/molecules/CardFallback";
import { Grid } from "@mantine/core";
import type { FC } from "react";
import { generateArrayWithKeys } from "@/utils/functions/array";

export const FallbackStadiumList: FC = async () => {
  return (
    <Grid>
      {generateArrayWithKeys(
        6,
        (_, key) => <FallbackCard key={key} />,
        "stadium-fallback"
      )}
    </Grid>
  );
};
