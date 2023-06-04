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

  if (todayStart <= date && date < tomorrowStart) {
    return `Today ${date.toTimeString()}`;
  } else if (yesterdayStart <= date && date < todayStart) {
    return `Yesterday ${date.toTimeString()}`;
  } else {
    return `${date.toDateString()} ${date.toTimeString()}`;
  }
}
