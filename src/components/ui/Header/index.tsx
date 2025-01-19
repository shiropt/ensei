import { Flex, Input, Title } from "@mantine/core";
import classes from "./header.module.css";

// import { createClient } from "@/utils/supabase/auth/client";
// import { SignoutButton } from "@/components/ui/Header/SignoutButton";

export const Header = async () => {
  // const supabase = createClient();
  // const { data } = await supabase.auth.getUser();

  return (
    <header className={classes.header}>
      <Flex h="100%" align="center" justify="space-between">
        <Title order={1} size="lg">
          ensei
        </Title>
        <form action="">
          <Input radius="lg" type="search" placeholder="検索"></Input>
        </form>
      </Flex>
    </header>
  );
};
