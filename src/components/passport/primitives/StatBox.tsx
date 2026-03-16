import { passportTheme } from "@/components/passport/passportTheme";

const t = passportTheme.typography;

export const StatBox = ({ label, value, subtext }: { label: string; value: string; subtext?: string }) => (
  <div className="flex flex-col items-center justify-center text-center rounded-lg border bg-muted/30 p-4">
    <p className={`${t.metaText} mb-1`}>{label}</p>
    <p className={t.statValue}>{value}</p>
    {subtext && <p className={`${t.metaText} mt-0.5`}>{subtext}</p>}
  </div>
);
