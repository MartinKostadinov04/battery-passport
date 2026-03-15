// Unified key-value row. null → hidden; "" → "–"; value → displayed.
// Optional unit is appended after the value (e.g. "200 Ah").

interface InfoRowProps {
  label: string;
  value: string | number | null;
  unit?: string;
}

export const InfoRow = ({ label, value, unit }: InfoRowProps) => {
  if (value === null) return null;
  const display = value !== "" && value != null
    ? unit ? `${value} ${unit}` : value
    : "–";
  return (
    <div className="flex justify-between border-b border-dashed py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right max-w-[60%] break-words">{display}</span>
    </div>
  );
};
