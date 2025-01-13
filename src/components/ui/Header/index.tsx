import { Flex, Text } from "@mantine/core";
import classes from "./header.module.css";

import { createClient } from "@/utils/supabase/auth/server";
import { SignoutButton } from "@/components/ui/Header/SignoutButton";

export const Header = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  return (
    <header className={classes.header}>
      <Flex justify="space-between" className={classes.inner}>
        <Text size="lg">ozel</Text>
        {data.session && <SignoutButton />}
      </Flex>
    </header>
  );
};
