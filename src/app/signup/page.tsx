import { FormContainer } from "@/components/ui/FormContainer";
import { signup } from "@/utils/supabase/auth/actions";
import { Box, Button, Fieldset, Flex, Input, Text } from "@mantine/core";
import Link from "next/link";

export default function Signup() {
  return (
    <Box mt="xl">
      <FormContainer title="新規登録">
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
              formAction={signup}
              type="submit"
              variant="filled"
              radius={20}
              w={320}
              color="orange"
              mt="lg"
            >
              登録する
            </Button>
          </Fieldset>
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
