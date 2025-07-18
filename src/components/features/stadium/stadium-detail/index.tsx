import { IconWithText } from "@/components/ui/icon-with-text";
import { Image } from "@/components/ui/image";
import { getStadium } from "@/utils/supabase/db/actions";
import { Box, Flex, Paper, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { GoogleMap } from "../stadium-map";

type Props = {
  id: string;
  from?: string;
};

export const StadiumDetail: FC<Props> = async ({ id }) => {
  const stadium = await getStadium(parseInt(id));

  if (!stadium) {
    return (
      <Box>
        <Paper withBorder p="sm" mb="md">
          <Title fz="lg" order={2}>
            スタジアムが見つかりません
          </Title>
        </Paper>
      </Box>
    );
  }

  const { name, imageUrl, capacity, homeTeams, access, address } = stadium;
  const lat = stadium.latitude || 0;
  const lng = stadium.longitude || 0;

  return (
    <Box>
      <Flex direction="column" gap="sm">
        <Paper withBorder p="sm" mb="md">
          <Title fz="lg" order={2}>
            {name}
          </Title>
        </Paper>
        <Box>
          <Image
            src={imageUrl ?? ""}
            radius="none"
            alt={name || "スタジアム画像"}
            priority
            sizes="100vw"
          />
        </Box>
        <Box mb="sm">
          {capacity && (
            <IconWithText
              text={`${Number(capacity).toLocaleString()}人`}
              icon="users"
            />
          )}
          <IconWithText text={homeTeams} icon="home" />
          <IconWithText text={address} icon="mapPin" />
          <Text ml="md" fz="sm">
            {access}
          </Text>
        </Box>
        <Box w="100%" h="240px">
          <GoogleMap lat={lat ?? 0} lng={lng ?? 0} />
        </Box>
      </Flex>
    </Box>
  );
};
