import { Card, CardContent } from "@/components/ui/card";

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
        <p className="mb-3 text-sm text-muted-foreground">{label}</p>
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
              strokeDasharray={`${pct * 2.64} 264`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{value}{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
