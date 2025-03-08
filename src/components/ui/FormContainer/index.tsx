import { Container, Flex, Title } from "@mantine/core";
import React, { FC } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const FormContainer: FC<Props> = ({ title, children }) => {
  return (
    <Container p="xl" bg="var(--mantine-color-white)" size="md">
      <Flex justify="center" align="center" direction="column">
        <Title size="lg" order={1}>
          {title}
        </Title>
        <Flex direction="column" align="center" p="lg">
          {children}
        </Flex>
      </Flex>
    </Container>
  );
};
