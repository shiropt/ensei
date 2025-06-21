import { Skeleton, Grid } from "@mantine/core";
import type { FC } from "react";

interface FallbackProps {
  count?: number;
  height?: number;
  variant?: "card" | "list" | "detail";
}

export const Fallback: FC<FallbackProps> = ({ 
  count = 6, 
  height = 200,
  variant = "card" 
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <Grid.Col miw="280px" span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <Skeleton height={height} radius="sm" />
          </Grid.Col>
        );
      case "list":
        return <Skeleton height={height} radius="sm" mb="md" />;
      case "detail":
        return <Skeleton height={height} radius="sm" />;
      default:
        return <Skeleton height={height} radius="sm" />;
    }
  };

  if (variant === "card") {
    return (
      <Grid>
        {[...Array(count)].map((_, i) => (
          <div key={`skeleton-card-${i}`}>{renderSkeleton()}</div>
        ))}
      </Grid>
    );
  }

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={`skeleton-${variant}-${i}`}>{renderSkeleton()}</div>
      ))}
    </>
  );
};