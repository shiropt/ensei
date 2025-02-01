"use client";
import { Tabs, TabsProps } from "@mantine/core";
import { useQueryState } from "nuqs";

export const Tab = ({
  children,
  ...props
}: { children?: React.ReactNode } & TabsProps) => {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
    shallow: false,
  });

  return (
    <Tabs {...props} value={category} onChange={setCategory}>
      <Tabs.List>
        <Tabs.Tab value="all">全て</Tabs.Tab>
        <Tabs.Tab value="j1">J1</Tabs.Tab>
        <Tabs.Tab value="j2">J2</Tabs.Tab>
        <Tabs.Tab value="j3">J3</Tabs.Tab>
      </Tabs.List>
      {children && children}
    </Tabs>
  );
};
