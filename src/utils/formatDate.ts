export function formatDate(iso: string | null): string {
  if (!iso) return "–";
  // Handle "YYYY-MM-DD HH:MM:SS", "YYYY-MM-DD THH:MM:SSZ", "YYYY-MM-DD T..." variants
  const datePart = iso.split(/[T ]/)[0].trim();
  const d = new Date(`${datePart}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
