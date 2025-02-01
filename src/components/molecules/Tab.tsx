"use client";
import { Tabs, TabsProps } from "@mantine/core";
import { useState } from "react";

export const Tab = ({
  children,
  ...props
}: { children?: React.ReactNode } & TabsProps) => {
  const [activeTab, setActiveTab] = useState<string | null>("all");

  return (
    <Tabs {...props} value={activeTab} onChange={setActiveTab}>
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
