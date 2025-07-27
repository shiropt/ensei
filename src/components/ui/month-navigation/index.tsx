"use client";
import { Box, Button, Flex, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";

export const MonthNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const monthParam = searchParams.get("month");
  const currentDate = monthParam
    ? new Date(monthParam)
    : startOfMonth(new Date());

  const categoryParam = searchParams.get("category") || "j1";

  const handlePreviousMonth = () => {
    const previousMonth = subMonths(currentDate, 1);
    const params = new URLSearchParams({
      month: format(previousMonth, "yyyy-MM-dd"),
      category: categoryParam,
    });
    router.push(`/matches?${params.toString()}`);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    const params = new URLSearchParams({
      month: format(nextMonth, "yyyy-MM-dd"),
      category: categoryParam,
    });
    router.push(`/matches?${params.toString()}`);
  };

  return (
    <Box px="md" py="sm" bg="gray.0">
      <Flex align="center" justify="space-between">
        <Button
          variant="subtle"
          size="sm"
          leftSection={<IconChevronLeft size={16} />}
          onClick={handlePreviousMonth}
        >
          前月
        </Button>

        <Text fw={600} size="lg">
          {format(currentDate, "yyyy年MM月", { locale: ja })}
        </Text>

        <Button
          variant="subtle"
          size="sm"
          rightSection={<IconChevronRight size={16} />}
          onClick={handleNextMonth}
        >
          翌月
        </Button>
      </Flex>
    </Box>
  );
};
