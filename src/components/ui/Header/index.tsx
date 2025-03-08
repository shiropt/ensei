"use client";
import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  Input,
  NavLink,
  Title,
} from "@mantine/core";
import classes from "./header.module.css";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
export const Header = () => {
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [localInput, setLocalInput] = useState(searchQuery ?? ""); // 入力欄のローカル状態
  const [opened, { toggle }] = useDisclosure();

  const debouncedUpdateQuery = useDebouncedCallback((value: string) => {
    if (!value) {
      setSearchQuery(null);
      return;
    }
    setSearchQuery(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    debouncedUpdateQuery(value);
  };

  const handleClear = () => {
    setSearchQuery(null);
    setLocalInput("");
  };

  useEffect(() => setLocalInput(searchQuery ?? ""), [searchQuery]);

  return (
    <header className={classes.header}>
      <Flex h="100%" align="center" justify="space-between">
        <Title className={classes.title} order={1} size="lg">
          ensei
        </Title>
        <Input
          size="md"
          className={classes.search}
          value={localInput}
          radius="lg"
          onChange={handleChange}
          type="search"
          placeholder="検索"
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={handleClear}
              style={{ display: searchQuery ? undefined : "none" }}
            />
          }
        ></Input>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
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
