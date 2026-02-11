import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generalInfo } from "@/data/batteryData";

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between border-b border-dashed py-2.5 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const GeneralInfoTab = () => {
  const g = generalInfo;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Battery Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Chemistry" value={g.chemistry} />
          <InfoRow label="Rated Capacity" value={g.ratedCapacity} />
          <InfoRow label="Nominal Voltage" value={g.nominalVoltage} />
          <InfoRow label="Min / Max Voltage" value={`${g.minVoltage} / ${g.maxVoltage}`} />
          <InfoRow label="Energy Density" value={g.energyDensity} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lifetime & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Expected Lifetime (cycles)" value={`${g.expectedLifetimeCycles} cycles`} />
          <InfoRow label="Expected Lifetime (years)" value={`${g.expectedLifetimeYears} years`} />
          <InfoRow label="Temp. Range (upper)" value={g.tempRangeUpper} />
          <InfoRow label="Temp. Range (lower)" value={g.tempRangeLower} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Physical Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Cell Type" value={g.cellType} />
          <InfoRow label="Dimensions" value={g.dimensions} />
          <InfoRow label="Max Charge Power" value={g.maxChargePower} />
          <InfoRow label="Max Discharge Power" value={g.maxDischargePower} />
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralInfoTab;
