"use client";
import { Box, Burger, Drawer, Flex, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header className={classes.header}>
      <Flex h="100%" align="center" justify="space-between" gap="sm">
        <Title className={classes.title} order={1} size="lg">
          ensei
        </Title>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
          size="sm"
        />
        <Drawer
          position="right"
          opened={opened}
          onClose={toggle}
          title="Authentication"
        >
          <Box mt="md">
            <NavLink
              styles={{ root: { borderBottom: "1px solid white" } }}
              href="/teams"
              label="クラブ"
              py="md"
            />
            <NavLink
              styles={{ root: { borderBottom: "1px solid white" } }}
              href="/stadiums"
              label="スタジアム"
              py="md"
            />
          </Box>
        </Drawer>
      </Flex>
    </header>
  );
};
