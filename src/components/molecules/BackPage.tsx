"use client";
import { IconWithText } from "@/components/molecules/IconWithText";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC } from "react";
export const BackPage: FC = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        pl={0}
        my="xs"
        variant="transparent"
        color="gray"
        onClick={() => router.back()}
      >
        <IconWithText pt="xs" text="戻る" icon="arrowBackUp" />
      </Button>
    </div>
  );
};
