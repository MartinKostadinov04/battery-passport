import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { circularityInfo, recycledContent, endOfLifeLinks } from "@/data/batteryData";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Recycle, BookOpen, Wrench, ExternalLink, FileText } from "lucide-react";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(200, 70%, 50%)",
  "hsl(280, 50%, 55%)",
  "hsl(160, 60%, 45%)",
];

const LinkCard = ({ icon: Icon, title, url }: { icon: React.ElementType; title: string; url: string }) => (
  <Card>
    <CardContent className="flex items-start gap-3 p-4">
      <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 truncate">
          {url} <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      </div>
    </CardContent>
  </Card>
);

const CircularityTab = () => {
  const c = circularityInfo;
  const r = recycledContent;
  const eol = endOfLifeLinks;

  // Pie Chart 2 data as bar chart (since values are mostly 0, bar is clearer)
  const recycledData = [
    ...r.preConsumer.map((m) => ({ material: `Pre-C ${m.material}`, share: m.share })),
    ...r.postConsumer.map((m) => ({ material: `Post-C ${m.material}`, share: m.share })),
    { material: "Recycled Lead", share: r.recycledLead },
    { material: "Renewable Content", share: r.renewableContent },
  ];

  return (
    <div className="space-y-6">
      {/* Circularity Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <LinkCard icon={BookOpen} title="Dismantling Manual" url={c.dismantlingManual} />
        <LinkCard icon={Wrench} title="Part Numbers & Components" url={c.partNumbers} />
        <LinkCard icon={FileText} title="Safety Measures" url={c.safetyMeasures} />
        <Card>
          <CardContent className="flex items-start gap-3 p-4">
            <Wrench className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Spare Parts</p>
              <p className="text-xs text-muted-foreground">{c.sparePartsInfo}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart 2: Recycled & Renewable Content */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Recycle className="h-4 w-4 text-primary" /> Recycled & Renewable Content
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer
            config={Object.fromEntries(recycledData.map((d) => [d.material, { label: d.material, color: "hsl(var(--primary))" }]))}
            className="h-[320px] w-full max-w-lg"
          >
            <PieChart>
              <Pie
                data={recycledData}
                dataKey="share"
                nameKey="material"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                label={({ material, share }) => `${material}: ${share}%`}
              >
                {recycledData.map((entry, i) => (
                  <Cell key={entry.material} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* End of Life Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">End-of-Life Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 border-b border-dashed py-2 last:border-0">
            <FileText className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Waste Prevention Guide</p>
              <a href={eol.wastePrevention} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">View <ExternalLink className="h-3 w-3" /></a>
            </div>
          </div>
          <div className="flex items-start gap-3 border-b border-dashed py-2 last:border-0">
            <Recycle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Separate Collection Guide</p>
              <a href={eol.separateCollection} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">View <ExternalLink className="h-3 w-3" /></a>
            </div>
          </div>
          <div className="flex items-start gap-3 py-2">
            <Recycle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Collection, Second Life & EOL Treatment</p>
              <a href={eol.collectionSecondLifeEol} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">View <ExternalLink className="h-3 w-3" /></a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircularityTab;
