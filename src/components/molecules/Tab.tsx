"use client";
import { Tabs, TabsProps, Text } from "@mantine/core";
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
        <Tabs.Tab px="xl" fz="md" fw="bold" value="all">
          <Text c="gray.9">全て</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="/j1">
          <Text c="gray.9">J1</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="/j2">
          <Text c="gray.9">J2</Text>
        </Tabs.Tab>
        <Tabs.Tab px="xl" fz="md" fw="bold" value="/j3">
          <Text c="gray.9">J3</Text>
        </Tabs.Tab>
      </Tabs.List>
      {children && children}
    </Tabs>
  );
};
