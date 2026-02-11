import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { carbonFootprintData } from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FileText } from "lucide-react";

const CarbonFootprintTab = () => {
  const c = carbonFootprintData;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Total Carbon Footprint</p>
            <p className="text-3xl font-bold">{c.totalCarbonFootprint.toLocaleString()}</p>
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

        {/* Study reference */}
        <Card>
          <CardContent className="flex flex-col justify-center gap-2 p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Study Reference</span>
            </div>
            <p className="text-sm">{c.studyReference}</p>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Donut */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Carbon Footprint by Lifecycle Stage</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer
            config={Object.fromEntries(c.breakdown.map((b) => [b.stage, { label: b.stage, color: b.fill }]))}
            className="h-[320px] w-full max-w-lg"
          >
            <PieChart>
              <Pie
                data={c.breakdown}
                dataKey="value"
                nameKey="stage"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label={({ stage, value }) => `${stage}: ${value}`}
              >
                {c.breakdown.map((entry) => (
                  <Cell key={entry.stage} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonFootprintTab;
