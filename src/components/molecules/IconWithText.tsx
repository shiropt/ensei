import { Flex, Text, type FlexProps } from "@mantine/core";
import type { FC } from "react";
import {
  IconHome,
  IconMapPin,
  IconStar,
  IconUsers,
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

type IconType =
  | "home"
  | "mapPin"
  | "star"
  | "users"
  | "arrowLeft"
  | "chevronLeft"
  | "chevronRight";

type Props = {
  icon: IconType;
  text?: string | null;
  rightIcon?: boolean;
} & FlexProps;

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
    case "arrowLeft":
      return <IconArrowLeft size={12} />;
    case "chevronLeft":
      return <IconChevronLeft size={12} />;
    case "chevronRight":
      return <IconChevronRight size={12} />;
  }
};

export const IconWithText: FC<Props> = ({
  text,
  icon,
  rightIcon,
  ...props
}) => {
  if (!text) return null;
  return (
    <Flex {...props} align="baseline" gap={4}>
      {rightIcon ? (
        <>
          <Text fz="sm">{text}</Text>
          {getIcon(icon)}
        </>
      ) : (
        <>
          {getIcon(icon)}
          <Text fz="sm">{text}</Text>
        </>
      )}
    </Flex>
  );
};
