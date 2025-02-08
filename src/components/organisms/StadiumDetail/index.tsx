import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { getStadium } from "@/utils/supabase/db/actions";
import { Box, Title } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type Props = {
  id: string;
  from?: string;
};

export const StadiumDetail: FC<Props> = async ({ id, from }) => {
  const { name, imageUrl, capacity, homeTeams, access } = await getStadium(
    parseInt(id)
  );
  return (
    <Box>
      <Link href={from ?? "/"}>
        <IconWithText pt="xs" text="戻る" icon="arrowBackUp" />
      </Link>
      <Title py="sm" fz="lg" order={2}>
        {name}
      </Title>
      <Image src={imageUrl ?? ""} radius="none" alt=""></Image>
      <Box py="sm">
        {capacity && (
          <IconWithText text={`${capacity.toLocaleString()}人`} icon="users" />
        )}
        <IconWithText text={homeTeams} icon="home" />
        <IconWithText text={access} icon="mapPin" />
      </Box>
    </Box>
  );
};
