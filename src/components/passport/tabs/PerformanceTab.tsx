import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PerformanceData } from "@/types/passport";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { AlertTriangle, Download } from "lucide-react";

const InfoRow = ({ label, value }: { label: string; value: string | number | null }) => {
  if (value === null) return null;
  return (
    <div className="flex justify-between border-b border-dashed py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value !== "" && value != null ? value : "–"}</span>
    </div>
  );
};

const InfoBlock = ({ label, value }: { label: string; value: string | null }) => {
  if (value === null) return null;
  return (
    <div className="border-b border-dashed py-3 last:border-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
      <p className="text-sm whitespace-pre-line">{value || "–"}</p>
    </div>
  );
};

const GaugeCard = ({ label, value, unit, max }: { label: string; value: number; unit: string; max: number }) => {
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

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center justify-center text-center rounded-lg border bg-muted/30 p-4">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

interface PerformanceTabProps {
  data: PerformanceData;
}

const PerformanceTab = ({ data }: PerformanceTabProps) => {
  const cev = data.capacityEnergyVoltage;
  const pc = data.powerCapability;
  const rte = data.roundTripEfficiency;
  const ir = data.internalResistance;
  const bl = data.batteryLifetime;
  const tc = data.temperatureConditions;
  const ne = data.negativeEvents;

  const socValue = parseFloat(cev.stateOfCharge ?? "") || 0;
  const rteValue = parseFloat(rte.initial ?? "") || 0;

  const extremeTemps = [
    { label: "Above upper boundary", minutes: parseFloat(tc.extremeTempAbove ?? "") || 0 },
    { label: "Below lower boundary", minutes: parseFloat(tc.extremeTempBelow ?? "") || 0 },
    { label: "Charging above upper", minutes: parseFloat(tc.chargingTempAbove ?? "") || 0 },
    { label: "Charging below lower", minutes: parseFloat(tc.chargingTempBelow ?? "") || 0 },
  ];
  const hasExtremeData = extremeTemps.some((d) => d.minutes > 0);

  const tempStats: { label: string; value: string }[] = [
    tc.temperatureInfo !== null ? { label: "Current Temp", value: `${tc.temperatureInfo}°C` } : null,
    tc.rangeField ? { label: "Operating Range", value: `${tc.rangeField[0]}°C – ${tc.rangeField[1]}°C` } : null,
    tc.idleLowerBoundary !== null ? { label: "Idle Range (lower)", value: `${tc.idleLowerBoundary}°C` } : null,
    tc.idleUpperBoundary !== null ? { label: "Idle Range (upper)", value: `${tc.idleUpperBoundary}°C` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="space-y-6">
      {/* Gauges & summary cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cev.stateOfCharge !== null && (
          <GaugeCard label="State of Charge" value={socValue} unit="%" max={100} />
        )}
        {rte.initial !== null && (
          <GaugeCard label="Initial Round-trip Eff." value={rteValue} unit="%" max={100} />
        )}
        {(pc.originalPower !== null || pc.maxPermittedPower !== null) && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <p className="mb-1 text-sm text-muted-foreground">Power Capability</p>
              <p className="text-2xl font-bold">{pc.originalPower ?? "–"} <span className="text-sm font-normal text-muted-foreground">W</span></p>
              <p className="text-xs text-muted-foreground mt-1">Max permitted: {pc.maxPermittedPower ?? "–"} W</p>
            </CardContent>
          </Card>
        )}
        {cev.ratedCapacity !== null && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <p className="mb-1 text-sm text-muted-foreground">Rated Capacity</p>
              <p className="text-2xl font-bold">{cev.ratedCapacity || "–"} <span className="text-sm font-normal text-muted-foreground">Ah</span></p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Capacity, Energy, Voltage + Efficiency & Resistance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Capacity, Energy & Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Nominal Voltage" value={cev.nominalVoltage !== null ? (cev.nominalVoltage ? `${cev.nominalVoltage} V` : "") : null} />
            <InfoRow label="Min Voltage" value={cev.minVoltage !== null ? (cev.minVoltage ? `${cev.minVoltage} V` : "") : null} />
            <InfoRow label="Max Voltage" value={cev.maxVoltage !== null ? (cev.maxVoltage ? `${cev.maxVoltage} V` : "") : null} />
            <InfoRow label="Capacity Fade" value={cev.capacityFade !== null ? (cev.capacityFade ? `${cev.capacityFade}%` : "") : null} />
            <InfoRow label="Remaining Capacity" value={cev.remainingCapacity !== null ? (cev.remainingCapacity ? `${cev.remainingCapacity} Ah` : "") : null} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Efficiency & Resistance</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="RTE at 50% Cycle Life" value={rte.at50PercentCycleLife !== null ? (rte.at50PercentCycleLife ? `${rte.at50PercentCycleLife}%` : "") : null} />
            <InfoRow label="RTE Fade" value={rte.fade !== null ? (rte.fade ? `${rte.fade}%` : "") : null} />
            <InfoRow label="Initial Internal Resistance" value={ir.initial !== null ? (ir.initial ? `${ir.initial} Ω` : "") : null} />
            <InfoRow label="Resistance Increase (Module)" value={ir.increaseModule !== null ? (ir.increaseModule ? `${ir.increaseModule}%` : "") : null} />
            <InfoRow label="Resistance Increase (Cell)" value={ir.increaseCell !== null ? (ir.increaseCell ? `${ir.increaseCell}%` : "") : null} />
            <InfoRow label="Power Fade" value={pc.powerFade !== null ? (pc.powerFade ? `${pc.powerFade}%` : "") : null} />
            <InfoRow label="Power / Energy Ratio" value={pc.powerEnergyRatio} />
            <InfoRow label="Remaining Power" value={pc.remainingPower !== null ? (pc.remainingPower ? `${pc.remainingPower} W` : "") : null} />
          </CardContent>
        </Card>
      </div>

      {/* Battery Lifetime */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Battery Lifetime</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Expected Lifetime" value={bl.calendarYears !== null ? (bl.calendarYears ? `${bl.calendarYears} years` : "") : null} />
            <InfoRow label="Expected Cycles" value={bl.expectedCycles} />
            <InfoRow label="Actual Cycles" value={bl.actualCycles} />
            <InfoRow label="C-rate" value={bl.cRate !== null ? (bl.cRate ? `${bl.cRate} A/Ah` : "") : null} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Cycle-Life Reference Test</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoBlock label="Reference Standard" value={bl.cycleLifeRefTest} />
          </CardContent>
        </Card>
      </div>

      {/* Temperature Conditions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Temperature Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          {tempStats.length > 0 && (
            <div className={`grid gap-4 mb-6 grid-cols-${Math.min(tempStats.length, 4)} justify-center`}
              style={{ gridTemplateColumns: `repeat(${tempStats.length}, minmax(0, 1fr))` }}
            >
              {tempStats.map((s) => (
                <StatBox key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          )}
          {hasExtremeData && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Time Spent in Extreme Temperatures (minutes)</p>
              <ChartContainer config={{ minutes: { label: "Minutes", color: "hsl(var(--primary))" } }} className="h-[220px] w-full overflow-x-auto">
                <BarChart data={extremeTemps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Negative Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-destructive" /> Negative Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Deep Discharge Events" value={ne.deepDischargeEvents} />
          <InfoRow label="Overcharge Events" value={ne.overchargeEvents} />
          <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 last:border-0">
            <div className="flex items-start gap-3 min-w-0">
              <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-medium">Accident Information</p>
                {ne.accidents
                  ? <p className="text-xs text-muted-foreground mt-0.5">{ne.accidents.filename}</p>
                  : <p className="text-xs text-muted-foreground italic mt-0.5">Not provided</p>
                }
              </div>
            </div>
            {ne.accidents && (
              <a
                href={ne.accidents.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
