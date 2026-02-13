import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { carbonFootprintData } from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FileText, ExternalLink } from "lucide-react";

const CarbonFootprintTab = () => {
  const c = carbonFootprintData;
  const histogramData = [{ name: "This Battery", value: c.totalPerFunctionalUnit }];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Carbon Footprint per Functional Unit</p>
            <p className="text-3xl font-bold">{c.totalPerFunctionalUnit}</p>
            <p className="text-sm text-muted-foreground">{c.unit}</p>
          </CardContent>
        </Card>

        {/* Performance class */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="mb-2 text-sm text-muted-foreground">Performance Class</p>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
              <span className="text-2xl font-bold text-primary">{c.performanceClass}</span>
            </div>
          </CardContent>
        </Card>

        {/* Study link */}
        <Card>
          <CardContent className="flex flex-col justify-center gap-2 p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Public Carbon Footprint Study</span>
            </div>
            <a href={c.studyLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
              View Study <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart 3: Lifecycle breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lifecycle Stage Contribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer
            config={Object.fromEntries(c.lifecycleBreakdown.map((b) => [b.stage, { label: b.stage, color: b.fill }]))}
            className="h-[320px] w-full max-w-lg"
          >
            <PieChart>
              <Pie
                data={c.lifecycleBreakdown}
                dataKey="value"
                nameKey="stage"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label={({ stage, value }) => `${stage}: ${value}%`}
              >
                {c.lifecycleBreakdown.map((entry) => (
                  <Cell key={entry.stage} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Histogram 1 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Carbon Footprint per Functional Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: c.unit, color: "hsl(var(--primary))" } }} className="h-[200px]">
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
    </div>
  );
};

export default CarbonFootprintTab;
