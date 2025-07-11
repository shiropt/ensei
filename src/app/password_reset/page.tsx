import { FormContainer } from "@/components/auth/form-container";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import Link from "next/link";

export default function PasswordReset() {
  return (
    <Box mt="xl">
      <FormContainer title="パスワードリセット">
        <Text p="md" span w="320px" size="sm">
          「パスワード再設定ページのURL」を、登録メールアドレスに送信します。
          <br />
          登録メールアドレスを入力し【送信する】を押してください。
        </Text>
        <form>
          <label htmlFor="email">
            メールアドレス
            <Input w="320px" placeholder="example@ensei.com" id="email" />
          </label>
          <Button
            type="submit"
            variant="filled"
            radius={20}
            w={320}
            color="orange"
            mt="lg"
          >
            送信する
          </Button>
        </form>
        <Flex mt="md" align="center" gap="sm" direction="column" p="md">
          <Text>
            <Link href="/signin">ログイン画面へ戻る</Link>
          </Text>
        </Flex>
      </FormContainer>
    </Box>
  );
}
