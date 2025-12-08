export function formatMinutesToHours(min: number) {
  return min / 60 > 1 ? `${Math.round(min / 60 * 100) / 100} h` : `${min} min`;
}
