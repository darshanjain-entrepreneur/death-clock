function zeroState() {
  return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
}

export function getCountdownParts(targetDate) {
  const end = new Date(targetDate);
  const now = new Date();

  if (Number.isNaN(end.getTime()) || end <= now) {
    return zeroState();
  }

  let cursor = new Date(now);
  let years = 0;
  let months = 0;

  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);

    if (next <= end) {
      years += 1;
      cursor = next;
      continue;
    }

    break;
  }

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);

    if (next <= end) {
      months += 1;
      cursor = next;
      continue;
    }

    break;
  }

  let diff = end.getTime() - cursor.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;
  const secondMs = 1000;

  const days = Math.floor(diff / dayMs);
  diff -= days * dayMs;

  const hours = Math.floor(diff / hourMs);
  diff -= hours * hourMs;

  const minutes = Math.floor(diff / minuteMs);
  diff -= minutes * minuteMs;

  const seconds = Math.floor(diff / secondMs) % 60;

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    expired: false
  };
}
