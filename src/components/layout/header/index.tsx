"use client";
import { ActionIcon, Flex, Title } from "@mantine/core";
import { IconSearch, IconUser } from "@tabler/icons-react";
import classes from "./header.module.css";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Flex h="100%" align="center" justify="space-between">
        <Title className={classes.title} order={1} size="lg">
          ensei
        </Title>
        <Flex gap="sm">
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconSearch size={24} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconUser size={24} />
          </ActionIcon>
        </Flex>
      </Flex>
    </header>
  );
};
