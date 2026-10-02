// Small shared formatting for the inbox pages.

export const STATUS_LABEL = { new: "New", replied: "Replied", won: "Won", closed: "Closed", all: "All" };
export const STATUS_TONE = { new: "red", replied: "blue", won: "green", closed: "ink" };

const tz = process.env.INBOX_TIMEZONE || undefined;

export function shortDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: tz });
}

export function longDate(iso) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  });
}

export function lineValue(t, k) {
  return t.lines.find((l) => l.k === k)?.v || null;
}
