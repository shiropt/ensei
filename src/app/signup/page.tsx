import { FormContainer } from "@/components/ui/FormContainer";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import Link from "next/link";

export default function Signup() {
  return (
    <Box mt="xl">
      <FormContainer title="新規登録">
        <form>
          <label htmlFor="email">
            メールアドレス
            <Input w="320px" placeholder="example@ozel.com" id="email" />
          </label>
          <Button
            type="submit"
            variant="filled"
            radius={20}
            w={320}
            color="orange"
            mt="lg"
          >
            新規登録する
          </Button>
        </form>
        <Flex mt="md" align="center" gap="sm" direction="column" p="md">
          <Text>
            <Link href="signin">すでにアカウントをお持ちの方</Link>
          </Text>
        </Flex>
      </FormContainer>
    </Box>
  );
}
