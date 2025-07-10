"use client";
import {
  Box,
  Burger,
  CloseButton,
  Drawer,
  Flex,
  Input,
  NavLink,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import classes from "./header.module.css";
export const Header = () => {
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [localInput, setLocalInput] = useState(searchQuery ?? ""); // 入力欄のローカル状態
  const [opened, { toggle }] = useDisclosure();

  const debouncedUpdateQuery = useDebouncedCallback((value: string) => {
    if (!value) {
      setSearchQuery(null);
    } else {
      setSearchQuery(value);
    }
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
      <Flex h="100%" align="center" justify="space-between" gap="sm">
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
         />
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
