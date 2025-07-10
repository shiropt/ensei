import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { GoogleMap } from "@/components/molecules/GoogleMap";
import { getStadium } from "@/utils/supabase/db/actions";
import { Box, Flex, Paper, Text, Title } from "@mantine/core";
import type { FC } from "react";

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
      <Flex direction="column" gap={{ base: "xs", md: "sm" }}>
        <Paper withBorder p={{ base: "sm", md: "md" }} mb={{ base: "sm", md: "md" }}>
          <Title fz={{ base: "md", md: "lg" }} order={2}>
            {name}
          </Title>
        </Paper>
        <Box>
          <Image 
            src={imageUrl ?? ""} 
            radius="none" 
            alt={name || "スタジアム画像"} 
            height={{ base: "160px", sm: "200px", md: "240px" }}
          />
        </Box>
        <Box mb={{ base: "sm", md: "md" }} px={{ base: "xs", md: "0" }}>
          {capacity && (
            <IconWithText
              text={`${Number(capacity).toLocaleString()}人`}
              icon="users"
            />
          )}
          <IconWithText text={homeTeams} icon="home" />
          <IconWithText text={address} icon="mapPin" />
          <Text ml={{ base: "sm", md: "md" }} fz={{ base: "xs", md: "sm" }} mt="xs">
            {access}
          </Text>
        </Box>
        <Box w="100%" h={{ base: "200px", sm: "240px", md: "300px" }}>
          <GoogleMap lat={lat ?? 0} lng={lng ?? 0} />
        </Box>
      </Flex>
    </Box>
  );
};
