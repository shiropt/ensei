import { ComponentProps, FC } from "react";
import NextImage from "next/image";
import { Image as MantineImage } from "@mantine/core";

type Props = ComponentProps<typeof NextImage>;

export const Image: FC<Props> = ({
  width = "100%",
  height = "200px",
  ...props
}) => {
  return (
    <div
      style={{
        display: "block",
        position: "relative",
        width,
        height,
      }}
    >
      <MantineImage
        component={NextImage}
        fallbackSrc="/images/no_image.jpg"
        radius="md"
        sizes="100vw"
        fill
        style={{
          width,
        }}
        {...props}
      ></MantineImage>
    </div>
  );
};
