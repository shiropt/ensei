import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import { IconHome, IconMapPin, IconStar, IconUsers } from "@tabler/icons-react";

type IconType = "home" | "mapPin" | "star" | "users";

type Props = {
  icon: IconType;
  text: string | null;
};

const getIcon = (icon: IconType) => {
  switch (icon) {
    case "home":
      return <IconHome size={12} />;
    case "mapPin":
      return <IconMapPin size={12} />;
    case "star":
      return <IconStar size={12} />;
    case "users":
      return <IconUsers size={12} />;
  }
};

export const IconWithText: FC<Props> = ({ text, icon }) => {
  if (!text) return null;
  return (
    <Flex align="baseline" gap={4}>
      {getIcon(icon)}
      <Text fz="sm">{text}</Text>
    </Flex>
  );
};
