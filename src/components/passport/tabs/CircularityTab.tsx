import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CircularityData, FileValue } from "@/types/passport";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Recycle, BookOpen, Wrench, Download, FileText } from "lucide-react";

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

const FileLinkCard = ({ icon: Icon, title, file }: { icon: React.ElementType; title: string; file: FileValue | null }) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-start gap-3 min-w-0">
        <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          {file
            ? <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
            : <p className="text-xs text-muted-foreground italic mt-0.5">Not provided</p>
          }
        </div>
      </div>
      {file && (
        <a
          href={file.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> Download
        </a>
      )}
    </CardContent>
  </Card>
);

const FileRow = ({ icon: Icon, label, file }: { icon: React.ElementType; label: string; file: FileValue | null }) => (
  <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 last:border-0">
    <div className="flex items-start gap-3 min-w-0">
      <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        {file
          ? <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
          : <p className="text-xs text-muted-foreground italic mt-0.5">Not provided</p>
        }
      </div>
    </div>
    {file && (
      <a
        href={file.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
      >
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    )}
  </div>
);

interface CircularityTabProps {
  data: CircularityData;
}

const CircularityTab = ({ data }: CircularityTabProps) => {
  const { circularityInfo: c, recycledContent: r, endOfLife: eol } = data;

  const recycledData = [
    { material: "Pre-C Nickel", share: parseFloat(r.preConsumerNickel ?? "") || 0 },
    { material: "Pre-C Cobalt", share: parseFloat(r.preConsumerCobalt ?? "") || 0 },
    { material: "Pre-C Lithium", share: parseFloat(r.preConsumerLithium ?? "") || 0 },
    { material: "Post-C Nickel", share: parseFloat(r.postConsumerNickel ?? "") || 0 },
    { material: "Post-C Cobalt", share: parseFloat(r.postConsumerCobalt ?? "") || 0 },
    { material: "Post-C Lithium", share: parseFloat(r.postConsumerLithium ?? "") || 0 },
    { material: "Recycled Lead", share: parseFloat(r.recycledLead ?? "") || 0 },
    { material: "Renewable Content", share: parseFloat(r.renewableContent ?? "") || 0 },
  ].filter((d) => d.share > 0);

  return (
    <div className="space-y-6">
      {/* Circularity Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Circularity Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <FileLinkCard icon={BookOpen} title="Dismantling Manual" file={c.dismantlingManual} />
            <FileLinkCard icon={FileText} title="Safety Measures" file={c.safetyMeasures} />
            {c.partNumbers !== null && (
              <Card className="overflow-hidden">
                <CardContent className="flex items-start gap-3 p-4">
                  <Wrench className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Part Numbers & Components</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line mt-0.5">{c.partNumbers || "–"}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            {c.sparePartsInfo !== null && (
              <Card>
                <CardContent className="flex items-start gap-3 p-4">
                  <Wrench className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Spare Parts</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line mt-0.5">{c.sparePartsInfo || "–"}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recycled & Renewable Content */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Recycle className="h-4 w-4 text-primary" /> Recycled & Renewable Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Pie chart — only non-zero values are meaningful to visualise */}
          {recycledData.length > 0 && (
            <div className="flex items-center justify-center mb-4">
              <ChartContainer
                config={Object.fromEntries(recycledData.map((d) => [d.material, { label: d.material, color: "hsl(var(--primary))" }]))}
                className="h-[280px] w-full max-w-lg"
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
            </div>
          )}
          {/* Full table — only non-null values */}
          <div className="grid grid-cols-2 gap-x-8">
            {[
              { label: "Pre-consumer Nickel", value: r.preConsumerNickel },
              { label: "Post-consumer Nickel", value: r.postConsumerNickel },
              { label: "Pre-consumer Cobalt", value: r.preConsumerCobalt },
              { label: "Post-consumer Cobalt", value: r.postConsumerCobalt },
              { label: "Pre-consumer Lithium", value: r.preConsumerLithium },
              { label: "Post-consumer Lithium", value: r.postConsumerLithium },
              { label: "Recycled Lead", value: r.recycledLead },
              { label: "Renewable Content", value: r.renewableContent },
            ].filter(({ value }) => value !== null).map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-dashed py-2 last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value || "0"}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* End of Life */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">End-of-Life Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FileRow icon={FileText} label="Waste Prevention Guide" file={eol.wastePrevention} />
          <FileRow icon={Recycle} label="Separate Collection Guide" file={eol.separateCollection} />
          <FileRow icon={Recycle} label="Collection, Second Life & EOL Treatment" file={eol.collectionSecondLifeEol} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CircularityTab;
