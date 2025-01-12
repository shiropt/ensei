import { Text } from "@mantine/core";
import classes from "./header.module.css";

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Text size="lg">ozel</Text>
      </div>
    </header>
  );
};
