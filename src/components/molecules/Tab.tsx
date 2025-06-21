"use client";
import { Tabs, TabsProps, Text } from "@mantine/core";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export const Tab = ({
  children,
  ...props
}: { children?: React.ReactNode } & TabsProps) => {
  const [category, setCategory] = useQueryState("category");

  const handleCategoryChange = useCallback((value: string | null) => {
    setCategory(value);
  }, [setCategory]);

  return (
    <Tabs
      {...props}
      defaultValue={category ?? "all"}
      onChange={handleCategoryChange}
    >
      <Tabs.List>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="all">
          <Text>全て</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="j1">
          <Text>J1</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="j2">
          <Text>J2</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="j3">
          <Text>J3</Text>
        </Tabs.Tab>
      </Tabs.List>
      {children && children}
    </Tabs>
  );
};
