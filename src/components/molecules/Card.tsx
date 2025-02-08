"use client";
import { Image } from "@/components/atoms/Image";
import { IconWithText } from "@/components/molecules/IconWithText";
import { Stadiums } from "@/utils/supabase/db/actions";
import { Flex, Grid, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

type Props = Stadiums[number];

export const Card: FC<Props> = ({
  id,
  name,
  homeTeams,
  capacity,
  access,
  // rating,
  imageUrl,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      {/* TODO: FOUC 対応 */}
      <Paper bg="#242424" radius="sm" p="sm">
        <Flex direction="column" gap="xs">
          <Image alt="スタジアム画像" src={imageUrl ?? ""} />
          <Flex flex={1} justify="left" direction="column">
            <Flex align="center" justify="space-between">
              <Link
                href={{
                  pathname: `/stadiums/${id}`,
                  query: { from: `${pathname}?${searchParams}` },
                }}
              >
                <Title fz="md" order={3}>
                  {name}
                </Title>
              </Link>
              {/* <IconWithText text={`4.${rating}`} icon="star" /> */}
            </Flex>
            {capacity && (
              <IconWithText
                text={`${capacity.toLocaleString()}人`}
                icon="users"
              />
            )}
            <IconWithText text={homeTeams} icon="home" />
            <IconWithText text={access} icon="mapPin" />
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};
