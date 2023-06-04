export function parseCreateDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(
    todayStart.getFullYear(),
    todayStart.getMonth(),
    todayStart.getDate() - 1
  );
  const tomorrowStart = new Date(
    todayStart.getFullYear(),
    todayStart.getMonth(),
    todayStart.getDate() + 1
  );

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  };

  if (todayStart <= date && date < tomorrowStart) {
    return `Today ${date.toLocaleTimeString("en-US", options)}`;
  } else if (yesterdayStart <= date && date < todayStart) {
    return `Yesterday ${date.toLocaleTimeString("en-US", options)}`;
  } else {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString(
      "en-US",
      options
    )}`;
  }
}
