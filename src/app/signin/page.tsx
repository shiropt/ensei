import { FormContainer } from "@/components/ui/FormContainer";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import Link from "next/link";

export default function Login() {
  return (
    <Box mt="xl">
      <FormContainer title="ログイン">
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
            ログインする
          </Button>
        </form>
        <Flex mt="md" align="center" gap="sm" direction="column" p="md">
          <Text>
            <Link href="password_reset">パスワードをお忘れの場合</Link>
          </Text>
          <Text>
            <Link href="/signup">新規登録はこちら</Link>
          </Text>
        </Flex>
      </FormContainer>
    </Box>
  );
}
