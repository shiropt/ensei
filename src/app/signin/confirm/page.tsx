import { FormContainer } from "@/components/auth/form-container";
import { Box, Flex, Text } from "@mantine/core";
import Link from "next/link";

export default function PasswordReset() {
  return (
    <Box mt="xl">
      <FormContainer title="ご登録ありがとうございます！">
        <Text p="md" span w="320px" size="sm">
          確認メールをお送りしましたので、メールに記載されたリンクをクリックして認証を完了してください。
        </Text>

        <Flex mt="md" align="center" gap="sm" direction="column" p="md">
          <Text>
            <Link href="/signin">ログイン画面へ戻る</Link>
          </Text>
        </Flex>
      </FormContainer>
    </Box>
  );
}
