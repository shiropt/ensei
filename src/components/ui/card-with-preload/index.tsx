"use client";
import { IconWithText } from "@/components/ui/icon-with-text";
import { Image } from "@/components/ui/image";
import { ImagePreloader } from "@/components/ui/image-preloader";
import type { Stadiums } from "@/utils/supabase/db/actions";
import { Flex, Grid, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { useState, type FC } from "react";

type Props = Stadiums[number];

export const CardWithPreload: FC<Props> = ({
  id,
  name,
  homeTeams,
  capacity,
  access,
  imageUrl,
}) => {
  const [shouldPreload, setShouldPreload] = useState(false);

  const handleMouseEnter = () => {
    setShouldPreload(true);
  };

  return (
    <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      {shouldPreload && imageUrl && (
        <ImagePreloader imageUrls={[imageUrl]} priority={false} />
      )}
      <Paper
        bg="#242424"
        radius="sm"
        p={{ base: "sm", md: "md" }}
        onMouseEnter={handleMouseEnter}
      >
        <Flex direction="column" gap={{ base: "xs", md: "sm" }}>
          <Image
            alt="スタジアム画像"
            src={imageUrl ?? ""}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <Flex flex={1} justify="left" direction="column" gap="xs">
            <Flex align="center" justify="space-between">
              <Link
                href={{
                  pathname: `/stadiums/${id}`,
                }}
                style={{
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Title fz={{ base: "sm", md: "md" }} order={3}>
                  {name}
                </Title>
              </Link>
            </Flex>
            {capacity && (
              <IconWithText
                text={`${Number(capacity).toLocaleString()}人`}
                icon="users"
                gap={{ base: 2, md: 4 }}
              />
            )}
            <IconWithText
              text={homeTeams}
              icon="home"
              gap={{ base: 2, md: 4 }}
            />
            <IconWithText
              text={access}
              icon="mapPin"
              gap={{ base: 2, md: 4 }}
            />
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};
