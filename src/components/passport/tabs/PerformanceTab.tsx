import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  capacityEnergyVoltage, powerCapability, roundTripEfficiency,
  internalResistance, batteryLifetime, temperatureConditions,
  fadeChartData, timeSeriesData,
} from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between border-b border-dashed py-2.5 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const GaugeCard = ({ label, value, unit, max }: { label: string; value: number; unit: string; max: number }) => {
  const pct = (value / max) * 100;
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

const PerformanceTab = () => {
  const cev = capacityEnergyVoltage;
  const pc = powerCapability;
  const rte = roundTripEfficiency;
  const ir = internalResistance;
  const bl = batteryLifetime;
  const tc = temperatureConditions;

  return (
    <div className="space-y-6">
      {/* Gauges */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GaugeCard label="State of Charge" value={cev.stateOfCharge} unit="%" max={100} />
        <GaugeCard label="Initial Round-trip Eff." value={rte.initial} unit="%" max={100} />
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <p className="mb-1 text-sm text-muted-foreground">Power Capability</p>
            <p className="text-2xl font-bold">{pc.originalPower} <span className="text-sm font-normal text-muted-foreground">W</span></p>
            <p className="text-xs text-muted-foreground mt-1">Max permitted: {pc.maxPermittedPower} W</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <p className="mb-1 text-sm text-muted-foreground">Rated Capacity</p>
            <p className="text-2xl font-bold">{cev.ratedCapacity} <span className="text-sm font-normal text-muted-foreground">Ah</span></p>
          </CardContent>
        </Card>
      </div>

      {/* Capacity, Energy, Voltage */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Capacity, Energy & Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Nominal Voltage" value={`${cev.nominalVoltage} V`} />
            <InfoRow label="Min Voltage" value={`${cev.minVoltage} V`} />
            <InfoRow label="Max Voltage" value={`${cev.maxVoltage} V`} />
            <InfoRow label="Capacity Fade" value={`${cev.capacityFade}%`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Efficiency & Resistance</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="RTE at 50% Cycle Life" value={`${rte.at50PercentCycleLife}%`} />
            <InfoRow label="RTE Fade" value={`${rte.fade}%`} />
            <InfoRow label="Initial Internal Resistance" value={`${ir.initial} Ω`} />
            <InfoRow label="Resistance Increase" value={`${ir.increase}%`} />
            <InfoRow label="Power Fade" value={`${pc.powerFade}%`} />
          </CardContent>
        </Card>
      </div>

      {/* Line Chart 1: Fade curves */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Fade Over Time (Line Chart 1)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              capacityFade: { label: "Capacity Fade %", color: "hsl(var(--primary))" },
              powerFade: { label: "Power Fade %", color: "hsl(200, 70%, 50%)" },
              rteFade: { label: "RTE Fade %", color: "hsl(280, 50%, 55%)" },
            }}
            className="h-[280px]"
          >
            <LineChart data={fadeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="capacityFade" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Capacity Fade %" />
              <Line type="monotone" dataKey="powerFade" stroke="hsl(200, 70%, 50%)" strokeWidth={2} dot={{ r: 3 }} name="Power Fade %" />
              <Line type="monotone" dataKey="rteFade" stroke="hsl(280, 50%, 55%)" strokeWidth={2} dot={{ r: 3 }} name="RTE Fade %" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Time Series 1: SoC and Cycles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">SoC & Cycles Over Time (Time Series 1)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              soc: { label: "SoC %", color: "hsl(var(--primary))" },
              cycles: { label: "Cycles", color: "hsl(40, 90%, 55%)" },
            }}
            className="h-[280px]"
          >
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="soc" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="SoC %" />
              <Line yAxisId="right" type="monotone" dataKey="cycles" stroke="hsl(40, 90%, 55%)" strokeWidth={2} dot={{ r: 3 }} name="Cycles" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Battery Lifetime */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Battery Lifetime</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Expected Lifetime" value={`${bl.calendarYears} years`} />
            <InfoRow label="Expected Cycles" value={bl.expectedCycles} />
            <InfoRow label="Actual Cycles" value={bl.actualCycles} />
            <InfoRow label="C-rate" value={`${bl.cRate} A/Ah`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Cycle-Life Reference Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{bl.cycleLifeRefTest}</p>
          </CardContent>
        </Card>
      </div>

      {/* Histogram 2: Temperature */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Temperature Conditions (Histogram 2)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <div className="text-center rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Operating Temp</p>
              <p className="text-lg font-bold">{tc.operatingTemp}°C</p>
            </div>
            <div className="text-center rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Idle Range (lower)</p>
              <p className="text-lg font-bold">{tc.idleLowerBoundary}°C</p>
            </div>
            <div className="text-center rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Idle Range (upper)</p>
              <p className="text-lg font-bold">{tc.idleUpperBoundary}°C</p>
            </div>
          </div>
          <ChartContainer config={{ minutes: { label: "Minutes", color: "hsl(var(--primary))" } }} className="h-[220px]">
            <BarChart data={tc.extremeTemps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
