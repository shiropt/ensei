"use client";
import { Pill, PillsInput as MantinePillsInput } from "@mantine/core";

export const PillsInput = () => {
  return (
    <MantinePillsInput>
      <Pill.Group p="4px">
        <Pill c="blue.3" size="lg" withRemoveButton>
          球技専用
        </Pill>
        <Pill c="blue.3" size="lg" withRemoveButton>
          駅近
        </Pill>
        <Pill c="blue.3" size="lg" withRemoveButton>
          関東
        </Pill>
        <MantinePillsInput.Field placeholder="キーワードを入力" />
      </Pill.Group>
    </MantinePillsInput>
  );
};
