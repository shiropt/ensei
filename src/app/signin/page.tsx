"use client";
import { FormContainer } from "@/components/ui/FormContainer";
import { signin } from "@/utils/supabase/auth/actions";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Fieldset,
  LoadingOverlay,
} from "@mantine/core";
import Link from "next/link";
import { useActionState } from "react";
export default function Login() {
  const [errorMessage, formAction, isPending] = useActionState(signin, "");
  return (
    <Box mt="xl">
      <LoadingOverlay visible={isPending} zIndex={100} />
      <FormContainer title="ログイン">
        <form action={formAction}>
          <Fieldset bd="none">
            <Flex direction="column" gap="md">
              <label htmlFor="email">
                メールアドレス
                <Input
                  name="email"
                  id="email"
                  w="320px"
                  type="email"
                  required
                  placeholder="メールアドレスを入力してください"
                />
              </label>
              <label htmlFor="password">
                パスワード
                <Input
                  name="password"
                  required
                  id="password"
                  w="320px"
                  type="password"
                  placeholder="パスワードを入力してください"
                  minLength={8}
                />
              </label>
            </Flex>
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
          </Fieldset>
        </form>
        {errorMessage && <Text c="red">{errorMessage}</Text>}
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
