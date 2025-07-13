import { Image as MantineImage, type MantineRadius } from "@mantine/core";
import NextImage from "next/image";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof NextImage> & {
  radius?: MantineRadius;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
};

export const Image: FC<Props> = ({
  width = "100%",
  height = "200px",
  radius = "md",
  priority = false,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
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
        priority={priority}
        loading={priority ? "eager" : loading}
        sizes={sizes}
        fill
        style={{
          width,
        }}
        {...props}
      />
    </div>
  );
};
