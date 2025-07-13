"use client";
import { useEffect } from "react";

type ImagePreloaderProps = {
  imageUrls: string[];
  priority?: boolean;
};

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  imageUrls,
  priority = false,
}) => {
  useEffect(() => {
    const preloadImages = () => {
      imageUrls.forEach(url => {
        if (url && url !== "") {
          const link = document.createElement("link");
          link.rel = priority ? "preload" : "prefetch";
          link.as = "image";
          link.href = url;
          document.head.appendChild(link);
        }
      });
    };

    preloadImages();

    return () => {
      // クリーンアップ: プリロードリンクを削除
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"][as="image"], link[rel="prefetch"][as="image"]',
      );
      preloadLinks.forEach(link => {
        if (imageUrls.some(url => link.getAttribute("href")?.includes(url))) {
          link.remove();
        }
      });
    };
  }, [imageUrls, priority]);

  return null;
};
