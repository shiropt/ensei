"use client";

import { FormContainer } from "@/components/auth/form-container";
import { signup } from "@/utils/supabase/auth/actions";
import {
  Box,
  Button,
  Fieldset,
  Flex,
  Input,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useActionState } from "react";

export default function Signup() {
  const [errorMessage, formAction, isPending] = useActionState(signup, "");

  return (
    <Box mt="xl">
      <LoadingOverlay visible={isPending} zIndex={100} />
      <FormContainer title="新規登録">
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
                  id="password"
                  w="320px"
                  type="password"
                  placeholder="パスワードを入力してください"
                  maxLength={8}
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
              登録する
            </Button>
          </Fieldset>
        </form>
        {errorMessage && <Text c="red">{errorMessage}</Text>}
        <Flex mt="md" align="center" gap="sm" direction="column" p="md">
          <Text>
            <Link href="signin">すでにアカウントをお持ちの方</Link>
          </Text>
        </Flex>
      </FormContainer>
    </Box>
  );
}
