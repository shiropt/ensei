type DateResult = {
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
};

export const formatJstTime = (date: Date) => {
  const jstTime = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(date));

  const { year, month, day, hour, minute } = jstTime.reduce<DateResult>(
    (prev, { type, value }) => ({ ...prev, [type]: value }),
    {}
  );

  return { year, month, day, hour, minute };
};
