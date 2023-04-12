export function parseDate(dateString: string): string {
  // String to date
  const date = new Date(dateString);
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Calculate dates
  const beforeToday = date < new Date(currentYear, currentMonth, currentDay);
  const isToday =
    date.getFullYear() === currentYear &&
    date.getMonth() === currentMonth &&
    date.getDate() === currentDay;
  const startOfNextWeek = new Date(currentYear, currentMonth, currentDay + 7);

  if (beforeToday) {
    // before TODAY 00:00:00
    return ``;
  } else if (isToday) {
    // between TODAY 00:00:00 - 23:59:59
    return `Today ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })}`;
  } else if (date <= startOfNextWeek) {
    // between TOMORROW 00:00:00 and NEXT SAMEDAYOFTHEWEEK 00:00:00
    return `${date.toLocaleString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })}`;
  } else {
    // after NEXT SAMEDAYOFTHEWEEK 00:00:00
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
