import { StadiumList } from "@/components/organisms/StadiumList";
import { getStadiums, Params } from "@/utils/supabase/db/actions";

import { FC } from "react";

type Props = {
  category: Params["category"];
};

export const StadiumListWrapper: FC<Props> = async ({ category }) => {
  const stadiums = await getStadiums({
    category,
  });

  return <StadiumList stadiumList={stadiums} />;
};
