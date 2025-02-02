"use client";
import { CloseButton, Flex, Input, Title } from "@mantine/core";
import classes from "./header.module.css";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [localInput, setLocalInput] = useState(searchQuery ?? ""); // 入力欄のローカル状態

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
      <Flex h="100%" align="center" justify="space-between">
        <Title className={classes.title} order={1} size="lg">
          ensei
        </Title>
        <Input
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
      </Flex>
    </header>
  );
};
