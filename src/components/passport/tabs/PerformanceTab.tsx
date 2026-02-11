import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceData } from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const GaugeCard = ({ label, value, unit, max }: { label: string; value: number; unit: string; max: number }) => {
  const pct = (value / max) * 100;
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <p className="mb-3 text-sm text-muted-foreground">{label}</p>
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
              strokeDasharray={`${pct * 2.64} 264`} strokeLinecap="round"
            />
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
  const p = performanceData;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GaugeCard label="State of Health" value={p.stateOfHealth} unit="%" max={100} />
        <GaugeCard label="Round-trip Efficiency" value={p.roundTripEfficiency} unit="%" max={100} />
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <p className="mb-1 text-sm text-muted-foreground">Power Capability</p>
            <p className="text-2xl font-bold">{p.currentPowerCapability} <span className="text-sm font-normal text-muted-foreground">/ {p.originalPowerCapability} kW</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <p className="mb-1 text-sm text-muted-foreground">Internal Resistance</p>
            <p className="text-2xl font-bold">{p.internalResistance}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Capacity Fade</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ capacity: { label: "Capacity %", color: "hsl(var(--primary))" } }} className="h-[250px]">
              <LineChart data={p.capacityFade}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="capacity" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Power Fade</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ power: { label: "Power %", color: "hsl(200, 70%, 50%)" } }} className="h-[250px]">
              <LineChart data={p.powerFade}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="power" stroke="hsl(200, 70%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceTab;
