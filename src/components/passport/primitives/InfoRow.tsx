// Unified key-value row. null → hidden; "" → "–"; value → displayed.
// Optional unit is appended after the value (e.g. "200 Ah").

import { passportTheme } from "@/components/passport/passportTheme";

const t = passportTheme.typography;

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
    <div className="flex items-baseline gap-4 border-b border-dashed py-2.5 last:border-0">
      <span className={`${t.fieldLabel} shrink-0`}>{label}</span>
      <span className={`${t.fieldValue} text-right ml-auto break-words min-w-0`}>{display}</span>
    </div>
  );
};
