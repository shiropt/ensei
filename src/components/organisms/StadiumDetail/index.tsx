import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { GoogleMap } from "@/components/molecules/GoogleMap";
import { getStadium } from "@/utils/supabase/db/actions";
import { Box, Flex, Paper, Text, Title } from "@mantine/core";
import { FC } from "react";

type Props = {
  id: string;
  from?: string;
};

export const StadiumDetail: FC<Props> = async ({ id }) => {
  const { name, imageUrl, capacity, homeTeams, access, lat, lng, address } =
    await getStadium(parseInt(id));

  return (
    <Box>
      <Flex direction="column" gap="sm">
        <Paper withBorder p="sm" mb="md">
          <Title fz="lg" order={2}>
            {name}
          </Title>
        </Paper>
        <Box>
          <Image src={imageUrl ?? ""} radius="none" alt=""></Image>
        </Box>
        <Box mb="sm">
          {capacity && (
            <IconWithText
              text={`${capacity.toLocaleString()}人`}
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
