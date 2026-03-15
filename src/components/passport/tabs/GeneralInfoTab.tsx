import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GeneralInfoData } from "@/types/passport";
import { formatDate } from "@/utils/formatDate";

const InfoRow = ({ label, value }: { label: string; value: string | null }) => {
  if (value === null) return null;
  return (
    <div className="flex justify-between border-b border-dashed py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right max-w-[60%] break-words">{value || "–"}</span>
    </div>
  );
};

interface GeneralInfoTabProps {
  data: GeneralInfoData;
}

const GeneralInfoTab = ({ data }: GeneralInfoTabProps) => {
  const { dppInfo, identifiers, productData } = data;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">DPP Information</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Schema Version" value={dppInfo.schemaVersion} />
          <InfoRow label="DPP Status" value={dppInfo.status} />
          <InfoRow label="Granularity" value={dppInfo.granularity} />
          <InfoRow label="Last Updated" value={dppInfo.lastUpdated === null ? null : formatDate(dppInfo.lastUpdated)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Identifiers</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Passport ID" value={identifiers.passportId} />
          <InfoRow label="Battery ID" value={identifiers.batteryId} />
          <InfoRow label="Battery Model ID" value={identifiers.batteryModelId} />
          <InfoRow label="Economic Operator ID" value={identifiers.economicOperatorId} />
          <InfoRow label="Manufacturer ID" value={identifiers.manufacturerId} />
          <InfoRow label="Facility ID" value={identifiers.facilityId} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Product Data</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Manufacturer" value={productData.manufacturerInfo} />
          <InfoRow label="Economic Operator" value={productData.economicOperatorInfo} />
          <InfoRow label="Manufacturing Place" value={productData.manufacturingPlace} />
          <InfoRow label="Manufacturing Date" value={productData.manufacturingDate === null ? null : formatDate(productData.manufacturingDate)} />
          <InfoRow label="Warranty Period" value={productData.warrantyPeriod === null ? null : formatDate(productData.warrantyPeriod)} />
          <InfoRow label="Battery Category" value={productData.batteryCategory} />
          <InfoRow label="Battery Mass" value={productData.batteryMass === null ? null : productData.batteryMass ? `${productData.batteryMass} kg` : ""} />
          <InfoRow label="Battery Status" value={productData.batteryStatus} />
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralInfoTab;
