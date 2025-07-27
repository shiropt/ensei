"use client";
import { Box, Tabs } from "@mantine/core";
import { useQueryState } from "nuqs";
import classes from "./category-tab.module.css";

export const CategoryTab = () => {
  const [category, setCategory] = useQueryState("category");

  const handleCategoryChange = (value: string | null) => {
    setCategory(value);
  };

  return (
    <Box className={classes.tabContainer}>
      <Tabs
        value={category ?? "j1"}
        onChange={handleCategoryChange}
        className={classes.tabs}
      >
        <Tabs.List className={classes.tabsList} grow>
          <Tabs.Tab value="j1" className={`${classes.tab} ${classes.j1Tab}`}>
            J1
          </Tabs.Tab>
          <Tabs.Tab value="j2" className={`${classes.tab} ${classes.j2Tab}`}>
            J2
          </Tabs.Tab>
          <Tabs.Tab value="j3" className={`${classes.tab} ${classes.j3Tab}`}>
            J3
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
};
