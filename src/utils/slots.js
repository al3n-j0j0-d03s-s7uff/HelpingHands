// Deterministic demo slot generator so availability looks realistic without a backend.

const BASE_TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "07:00 PM",
];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getNextDays(count = 7) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export function getSlotsForDate(psychologistId, date) {
  const seedBase =
    psychologistId.charCodeAt(1) + date.getDate() + date.getMonth() * 31;
  return BASE_TIMES.filter((_, idx) => seededRandom(seedBase + idx) > 0.35);
}

export function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatDateFull(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
