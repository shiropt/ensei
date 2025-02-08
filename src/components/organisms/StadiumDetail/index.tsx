import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { getStadium } from "@/utils/supabase/db/actions";
import { Box, Flex, Title } from "@mantine/core";
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
      <Box className="stadium-detail__mobile">
        <Title py="sm" fz="lg" order={2}>
          {name}
        </Title>
        <Box>
          <Image src={imageUrl ?? ""} radius="none" alt=""></Image>
        </Box>
        <Box py="sm">
          {capacity && (
            <IconWithText
              text={`${capacity.toLocaleString()}人`}
              icon="users"
            />
          )}
          <IconWithText text={homeTeams} icon="home" />
          <IconWithText text={access} icon="mapPin" />
        </Box>
      </Box>
      <Box py="sm" className="stadium-detail__desktop">
        <Flex gap="md">
          <Box w="50%">
            <Image src={imageUrl ?? ""} radius="none" alt=""></Image>
          </Box>
          <Box>
            <Title fz="lg" order={2}>
              {name}
            </Title>
            {capacity && (
              <IconWithText
                text={`${capacity.toLocaleString()}人`}
                icon="users"
              />
            )}
            <IconWithText text={homeTeams} icon="home" />
            <IconWithText text={access} icon="mapPin" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
