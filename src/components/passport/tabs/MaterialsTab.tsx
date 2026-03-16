import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MaterialsData } from "@/types/passport";
import { AlertTriangle } from "lucide-react";
import { InfoBlock } from "@/components/passport/primitives";

interface MaterialsTabProps {
  data: MaterialsData;
}

const MaterialsTab = ({ data }: MaterialsTabProps) => {
  return (
    <div className="space-y-6">
      {(data.chemistry !== null || data.criticalRawMaterials !== null) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Battery Chemistry & Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoBlock label="Battery Chemistry" value={data.chemistry} />
            <InfoBlock label="Critical Raw Materials" value={data.criticalRawMaterials} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {data.hazardousSubstances !== null && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-4 w-4 text-destructive" /> Hazardous Substances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-line">{data.hazardousSubstances || "–"}</p>
            </CardContent>
          </Card>
        )}

        {data.impactInfo !== null && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Environmental & Health Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-line">{data.impactInfo || "–"}</p>
            </CardContent>
          </Card>
        )}

        {data.materialsUsed !== null && (
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Materials Used (Cathode, Anode, Electrolyte)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-line">{data.materialsUsed || "–"}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MaterialsTab;
