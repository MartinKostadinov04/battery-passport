import { QrCode, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GeneralInfoData } from "@/types/passport";
import { formatDate } from "@/utils/formatDate";

interface IdentityCardProps {
  data: GeneralInfoData;
}

const Row = ({ label, value }: { label: string; value: string | null }) => {
  if (value === null) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground min-w-[140px] shrink-0 text-sm">{label}</span>
      <span className="text-sm">{value || "–"}</span>
    </div>
  );
};

const IdentityCard = ({ data }: IdentityCardProps) => {
  const { identifiers, productData, dppInfo } = data;

  return (
    <Card className="mb-6">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
        {/* Left */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="h-4 w-4 text-primary shrink-0" />
            <span className="font-mono text-xs">{identifiers.passportId || "–"}</span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Battery ID</p>
            <p className="text-xl font-bold">{identifiers.batteryId || "–"}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {productData.batteryMass && (
              <Badge variant="secondary" className="font-normal">Mass: {productData.batteryMass} kg</Badge>
            )}
            {productData.batteryStatus && (
              <Badge className="gap-1 bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                {productData.batteryStatus}
              </Badge>
            )}
          </div>

          <div className="grid gap-2">
            <Row label="Category" value={productData.batteryCategory} />
            <Row label="Manufacturing Date" value={productData.manufacturingDate === null ? null : formatDate(productData.manufacturingDate)} />
            <Row label="Manufacturing Place" value={productData.manufacturingPlace} />
            <Row label="Warranty Until" value={productData.warrantyPeriod === null ? null : formatDate(productData.warrantyPeriod)} />
            <Row label="Last DPP Update" value={dppInfo.lastUpdated === null ? null : formatDate(dppInfo.lastUpdated)} />
          </div>
        </div>

        {/* Right: Economic operator */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center min-w-[180px]">
          <Building2 className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Economic Operator</p>
          <p className="mt-1 text-sm font-mono">{identifiers.economicOperatorId || "–"}</p>
          {productData.economicOperatorInfo && (
            <p className="mt-2 text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
              {productData.economicOperatorInfo}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityCard;
