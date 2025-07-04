import type { ComponentProps, FC } from "react";
import NextImage from "next/image";
import { Image as MantineImage, type MantineRadius } from "@mantine/core";

type Props = ComponentProps<typeof NextImage> & {
  radius?: MantineRadius;
};

export const Image: FC<Props> = ({
  width = "100%",
  height = "200px",
  radius = "md",
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
        radius={radius}
        placeholder="blur"
        blurDataURL="/images/no_image.jpg"
        sizes="100vw"
        fill
        style={{
          width,
        }}
        {...props}
      />
    </div>
  );
};
