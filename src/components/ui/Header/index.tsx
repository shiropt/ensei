import { Flex, Text } from "@mantine/core";
import classes from "./header.module.css";

// import { createClient } from "@/utils/supabase/auth/client";
// import { SignoutButton } from "@/components/ui/Header/SignoutButton";

export const Header = async () => {
  // const supabase = createClient();
  // const { data } = await supabase.auth.getUser();

  return (
    <header className={classes.header}>
      <Flex justify="space-between" className={classes.inner}>
        <Text size="lg">ozel</Text>
        {/* {data.user && <SignoutButton />} */}
      </Flex>
    </header>
  );
};
