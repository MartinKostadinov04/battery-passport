import { QrCode, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GeneralInfoData } from "@/types/passport";
import { formatDate } from "@/utils/formatDate";
import { InfoRow } from "@/components/passport/primitives";
import { passportTheme } from "@/components/passport/passportTheme";

interface IdentityCardProps {
  data: GeneralInfoData;
}

const t = passportTheme.typography;

const IdentityCard = ({ data }: IdentityCardProps) => {
  const { identifiers, productData, dppInfo } = data;

  return (
    <Card className="mb-6">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(260px,1fr)_auto]">
        {/* Left */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="h-4 w-4 text-primary shrink-0" />
            <span className={t.monoId}>{identifiers.passportId || "–"}</span>
          </div>

          <div>
            <p className={t.sectionLabel}>Battery ID</p>
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

          <div>
            <InfoRow label="Category" value={productData.batteryCategory} />
            <InfoRow label="Manufacturing Date" value={productData.manufacturingDate === null ? null : formatDate(productData.manufacturingDate)} />
            <InfoRow label="Manufacturing Place" value={productData.manufacturingPlace} />
            <InfoRow label="Warranty Until" value={productData.warrantyPeriod === null ? null : formatDate(productData.warrantyPeriod)} />
            <InfoRow label="Last DPP Update" value={dppInfo.lastUpdated === null ? null : formatDate(dppInfo.lastUpdated)} />
          </div>
        </div>

        {/* Right: Economic operator */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center min-w-[180px]">
          <Building2 className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className={t.sectionLabel}>Economic Operator</p>
          <p className={`mt-1 ${t.monoId} text-sm`}>{identifiers.economicOperatorId || "–"}</p>
          {productData.economicOperatorInfo && (
            <p className={`mt-2 ${t.metaText} whitespace-pre-line leading-relaxed`}>
              {productData.economicOperatorInfo}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityCard;
