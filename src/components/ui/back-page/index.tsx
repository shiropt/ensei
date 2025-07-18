"use client";
import { IconWithText } from "@/components/ui/icon-with-text";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import type { FC } from "react";

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
        <IconWithText pt="xs" text="戻る" icon="arrowLeft" />
      </Button>
    </div>
  );
};