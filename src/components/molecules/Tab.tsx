"use client";
import { Tabs, TabsProps } from "@mantine/core";
import { useRouter } from "next/navigation";

export const Tab = ({
  children,
  ...props
}: { children?: React.ReactNode } & TabsProps) => {
  const router = useRouter();

  const handleCategoryChange = (value: string | null) => {
    router.push(`/category${value === "all" ? "" : value}`);
  };

  return (
    <Tabs {...props} defaultValue="all" onChange={handleCategoryChange}>
      <Tabs.List>
        <Tabs.Tab value="all">全て</Tabs.Tab>
        <Tabs.Tab value="/j1">J1</Tabs.Tab>
        <Tabs.Tab value="/j2">J2</Tabs.Tab>
        <Tabs.Tab value="/j3">J3</Tabs.Tab>
      </Tabs.List>
      {children && children}
    </Tabs>
  );
};
