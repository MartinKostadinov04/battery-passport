import { Card, CardContent } from "@/components/ui/card";
import { passportTheme } from "@/components/passport/passportTheme";

const t = passportTheme.typography;
const g = passportTheme.gauge;

interface GaugeCardProps {
  label: string;
  value: number;
  unit: string;
  max: number;
}

export const GaugeCard = ({ label, value, unit, max }: GaugeCardProps) => {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <p className={`${t.fieldLabel} mb-3`}>{label}</p>
        <div className={g.containerClass}>
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke="hsl(var(--muted))" strokeWidth={g.strokeWidth} />
            <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke="hsl(var(--primary))" strokeWidth={g.strokeWidth}
              strokeDasharray={`${pct * g.circumference / 100} ${g.circumference}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={t.statValue}>{value}{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
