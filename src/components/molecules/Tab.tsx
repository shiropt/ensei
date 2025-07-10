"use client";
import { Tabs, Text, type TabsProps } from "@mantine/core";
import { useQueryState } from "nuqs";

export const Tab = ({
  children,
  ...props
}: { children?: React.ReactNode } & TabsProps) => {
  const [category, setCategory] = useQueryState("category");

  const handleCategoryChange = (value: string | null) => {
    setCategory(value);
  };

  return (
    <Tabs
      {...props}
      defaultValue={category ?? "all"}
      onChange={handleCategoryChange}
    >
      <Tabs.List>
        <Tabs.Tab px={{ base: "md", sm: "lg", md: "xl" }} fz="md" fw="bold" value="all">
          <Text>全て</Text>
        </Tabs.Tab>
        <Tabs.Tab px={{ base: "md", sm: "lg", md: "xl" }} fz="md" fw="bold" value="j1">
          <Text>J1</Text>
        </Tabs.Tab>
        <Tabs.Tab px={{ base: "md", sm: "lg", md: "xl" }} fz="md" fw="bold" value="j2">
          <Text>J2</Text>
        </Tabs.Tab>
        <Tabs.Tab px={{ base: "md", sm: "lg", md: "xl" }} fz="md" fw="bold" value="j3">
          <Text>J3</Text>
        </Tabs.Tab>
      </Tabs.List>
      {children}
    </Tabs>
  );
};
