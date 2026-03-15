import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CarbonFootprintData } from "@/types/passport";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FileText, Download } from "lucide-react";

interface CarbonFootprintTabProps {
  data: CarbonFootprintData;
}

const LIFECYCLE_COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(200, 70%, 50%)",
  "hsl(40, 90%, 55%)",
  "hsl(280, 50%, 55%)",
];

// Shorter labels to prevent pie chart label clipping
const LIFECYCLE_STAGES = [
  { key: "rawMaterialContribution" as const, stage: "Raw Materials" },
  { key: "productionContribution" as const, stage: "Production" },
  { key: "distributionContribution" as const, stage: "Distribution" },
  { key: "endOfLifeContribution" as const, stage: "End of Life" },
];

const CarbonFootprintTab = ({ data }: CarbonFootprintTabProps) => {
  const totalNum = parseFloat(data.totalPerFunctionalUnit ?? "") || 0;

  const lifecycleBreakdown = LIFECYCLE_STAGES
    .map(({ key, stage }) => ({ stage, value: parseFloat(data[key] ?? "") || 0 }))
    .filter((d) => d.value > 0);

  const histogramData = [{ name: "This Battery", value: totalNum }];

  return (
    <div className="space-y-6">
      {/* Summary cards — 3 columns: CF per FU | Performance Class | Absolute CF */}
      <div className="grid gap-6 md:grid-cols-3">
        {data.totalPerFunctionalUnit !== null && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <p className="mb-1 text-sm text-muted-foreground">Carbon Footprint per Functional Unit</p>
              <p className="text-3xl font-bold">{data.totalPerFunctionalUnit || "–"}</p>
              <p className="text-sm text-muted-foreground">kgCO₂eq/kWh</p>
            </CardContent>
          </Card>
        )}

        {data.performanceClass !== null && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Performance Class</p>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
                <span className="text-2xl font-bold text-primary">{data.performanceClass || "–"}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {data.absoluteCarbonFootprint !== null && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <p className="mb-1 text-sm text-muted-foreground">Absolute Carbon Footprint</p>
              <p className="text-3xl font-bold">{data.absoluteCarbonFootprint || "–"}</p>
              <p className="text-sm text-muted-foreground">tCO₂eq</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Study Link — always shown */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Public Carbon Footprint Study</p>
            <p className="text-xs text-muted-foreground">Third-party verified lifecycle assessment</p>
          </div>
          {data.studyLink ? (
            <a
              href={data.studyLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 shrink-0"
            >
              <Download className="h-3.5 w-3.5" /> {data.studyLink.filename}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground italic shrink-0">Not provided</p>
          )}
        </CardContent>
      </Card>

      {/* Pie Chart: Lifecycle breakdown */}
      {lifecycleBreakdown.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Lifecycle Stage Contribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={Object.fromEntries(lifecycleBreakdown.map((b, i) => [b.stage, { label: b.stage, color: LIFECYCLE_COLORS[i] }]))}
              className="h-[320px] w-full max-w-lg"
            >
              <PieChart>
                <Pie
                  data={lifecycleBreakdown}
                  dataKey="value"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  label={({ value }) => `${value}%`}
                >
                  {lifecycleBreakdown.map((entry, i) => (
                    <Cell key={entry.stage} fill={LIFECYCLE_COLORS[i % LIFECYCLE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Bar chart: CF per Functional Unit */}
      {data.totalPerFunctionalUnit !== null && totalNum > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Carbon Footprint per Functional Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: "kgCO₂eq/kWh", color: "hsl(var(--primary))" } }} className="h-[200px]">
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbonFootprintTab;
