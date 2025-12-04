export function formatMinutesToHours(min: number) {
  return min / 60 > 1 ? `${min / 60} h` : `${min} min`;
}
