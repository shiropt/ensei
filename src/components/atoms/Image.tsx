import { ComponentProps, FC, memo } from "react";
import NextImage from "next/image";
import { Image as MantineImage, MantineRadius } from "@mantine/core";

type Props = ComponentProps<typeof NextImage> & {
  radius?: MantineRadius;
};

export const Image: FC<Props> = memo(({
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
        loading="lazy"
        style={{
          width,
        }}
        {...props}
      ></MantineImage>
    </div>
  );
});

Image.displayName = "Image";
