import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { materialsData } from "@/data/batteryData";
import { AlertTriangle } from "lucide-react";

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-dashed py-3 last:border-0">
    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

const MaterialsTab = () => {
  const m = materialsData;
  return (
    <div className="space-y-6">
      {/* Pie Chart 1 context — textual composition data */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Battery Chemistry & Composition (Pie Chart 1)</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoBlock label="Battery Chemistry" value={m.chemistry} />
          <InfoBlock label="Critical Raw Materials" value={m.criticalRawMaterials} />
          <InfoBlock label="Materials Used (Cathode, Anode, Electrolyte)" value={m.materialsUsed} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-destructive" /> Hazardous Substances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{m.hazardousSubstances}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Environmental & Health Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{m.impactInfo}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaterialsTab;
