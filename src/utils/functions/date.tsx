type DateResult = {
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  weekday?: string;
};

export const formatJstTime = (date: Date) => {
  const jstTime = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  }).formatToParts(new Date(date));

  const { year, month, day, hour, minute, weekday } = jstTime.reduce<DateResult>(
    (prev, { type, value }) => ({ ...prev, [type]: value }),
    {}
  );

  return { year, month, day, hour, minute, weekday };
};
