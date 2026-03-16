import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PerformanceData } from "@/types/passport";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { AlertTriangle, Download } from "lucide-react";
import { InfoRow, InfoBlock, GaugeCard, StatBox } from "@/components/passport/primitives";
import { passportTheme } from "@/components/passport/passportTheme";

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
          <StatBox
            label="Power Capability"
            value={`${pc.originalPower ?? "–"} W`}
            subtext={`Max: ${pc.maxPermittedPower ?? "–"} W`}
          />
        )}
        {cev.ratedCapacity !== null && (
          <StatBox label="Rated Capacity" value={`${cev.ratedCapacity || "–"} Ah`} />
        )}
      </div>

      {/* Capacity, Energy, Voltage + Efficiency & Resistance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Capacity, Energy & Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Nominal Voltage" value={cev.nominalVoltage} unit="V" />
            <InfoRow label="Min Voltage" value={cev.minVoltage} unit="V" />
            <InfoRow label="Max Voltage" value={cev.maxVoltage} unit="V" />
            <InfoRow label="Capacity Fade" value={cev.capacityFade} unit="%" />
            <InfoRow label="Remaining Capacity" value={cev.remainingCapacity} unit="Ah" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Efficiency & Resistance</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="RTE at 50% Cycle Life" value={rte.at50PercentCycleLife} unit="%" />
            <InfoRow label="RTE Fade" value={rte.fade} unit="%" />
            <InfoRow label="Initial Internal Resistance" value={ir.initial} unit="Ω" />
            <InfoRow label="Resistance Increase (Module)" value={ir.increaseModule} unit="%" />
            <InfoRow label="Resistance Increase (Cell)" value={ir.increaseCell} unit="%" />
            <InfoRow label="Power Fade" value={pc.powerFade} unit="%" />
            <InfoRow label="Power / Energy Ratio" value={pc.powerEnergyRatio} />
            <InfoRow label="Remaining Power" value={pc.remainingPower} unit="W" />
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
            <InfoRow label="Expected Lifetime" value={bl.calendarYears} unit="years" />
            <InfoRow label="Expected Cycles" value={bl.expectedCycles} />
            <InfoRow label="Actual Cycles" value={bl.actualCycles} />
            <InfoRow label="C-rate" value={bl.cRate} unit="A/Ah" />
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
            <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
              {tempStats.map((s) => (
                <StatBox key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          )}
          {hasExtremeData && (
            <div>
              <p className={`${passportTheme.typography.sectionLabel} mb-3`}>Time Spent in Extreme Temperatures (minutes)</p>
              <div className="overflow-x-auto">
                <div className="min-w-[360px]">
                  <ChartContainer config={{ minutes: { label: "Minutes", color: "hsl(var(--primary))" } }} className={`${passportTheme.chartHeight.bar} w-full`}>
                    <BarChart data={extremeTemps}>
                      <CartesianGrid strokeDasharray="3 3" stroke={passportTheme.gridStroke} />
                      <XAxis dataKey="label" tick={{ fontSize: passportTheme.chartAxis.tickFontSize }} angle={passportTheme.chartAxis.barXAngle} textAnchor="end" height={passportTheme.chartAxis.barXHeight} />
                      <YAxis tick={{ fontSize: passportTheme.chartAxis.labelFontSize }} />
                      <Tooltip />
                      <Bar dataKey="minutes" fill={passportTheme.primaryFill} radius={passportTheme.barChart.radius} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Negative Events */}
      {(ne.deepDischargeEvents !== null || ne.overchargeEvents !== null || ne.accidents !== null) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" /> Negative Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Deep Discharge Events" value={ne.deepDischargeEvents} />
            <InfoRow label="Overcharge Events" value={ne.overchargeEvents} />
            {ne.accidents && (
              <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 last:border-0">
                <div className="flex items-start gap-3 min-w-0">
                  <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Accident Information</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ne.accidents.filename}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0">
                  <a href={ne.accidents.link} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceTab;
