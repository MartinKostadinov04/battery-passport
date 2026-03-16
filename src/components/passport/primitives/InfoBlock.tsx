// Stacked label + text block. null → hidden; "" → "–"; value → displayed.

import { passportTheme } from "@/components/passport/passportTheme";

const t = passportTheme.typography;

interface InfoBlockProps {
  label: string;
  value: string | null;
}

export const InfoBlock = ({ label, value }: InfoBlockProps) => {
  if (value === null) return null;
  return (
    <div className="border-b border-dashed py-3 last:border-0">
      <p className={`${t.sectionLabel} mb-1`}>{label}</p>
      <p className={t.bodyText}>{value || "–"}</p>
    </div>
  );
};
