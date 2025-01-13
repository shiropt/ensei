import { login } from "@/app/signin/actions";
import { FormContainer } from "@/components/ui/FormContainer";
import { Box, Button, Flex, Input, Text, Fieldset } from "@mantine/core";
import Link from "next/link";
export default function Login() {
  return (
    <Box mt="xl">
      <FormContainer title="ログイン">
        <form>
          <Fieldset bd="none">
            <Flex direction="column" gap="md">
              <label htmlFor="email">
                メールアドレス
                <Input
                  name="email"
                  id="email"
                  w="320px"
                  type="email"
                  placeholder="メールアドレスを入力してください"
                />
              </label>
              <label htmlFor="password">
                パスワード
                <Input
                  name="password"
                  id="password"
                  w="320px"
                  type="password"
                  placeholder="パスワードを入力してください"
                />
              </label>
            </Flex>
            <Button
              formAction={login}
              type="submit"
              variant="filled"
              radius={20}
              w={320}
              color="orange"
              mt="lg"
            >
              ログインする
            </Button>
          </Fieldset>
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
