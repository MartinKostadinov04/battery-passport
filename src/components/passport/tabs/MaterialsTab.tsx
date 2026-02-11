import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { materialsData } from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const MaterialsTab = () => {
  const m = materialsData;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Critical Raw Materials */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Critical Raw Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {m.criticalRawMaterials.map((mat) => (
              <div key={mat.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{mat.name}</span>
                  <span className="font-medium">{mat.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${mat.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recycled Content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recycled Content Share</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ share: { label: "Share %", color: "hsl(var(--primary))" } }} className="h-[220px]">
              <BarChart data={m.recycledContent}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="material" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="share" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hazardous substances */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Hazardous Substances</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Substance</TableHead>
                <TableHead>CAS Number</TableHead>
                <TableHead>Concentration</TableHead>
                <TableHead>Classification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {m.hazardousSubstances.map((s) => (
                <TableRow key={s.substance}>
                  <TableCell className="font-medium">{s.substance}</TableCell>
                  <TableCell className="font-mono text-xs">{s.casNumber}</TableCell>
                  <TableCell>{s.concentration}</TableCell>
                  <TableCell>{s.classification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">{m.renewableContentShare}%</span>
          </div>
          <div>
            <p className="text-sm font-medium">Renewable Content Share</p>
            <p className="text-xs text-muted-foreground">Share of renewable raw materials used in manufacturing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialsTab;
