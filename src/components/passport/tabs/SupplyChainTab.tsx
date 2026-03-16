import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupplyChainData } from "@/types/passport";
import { FileInlineLink } from "@/components/passport/primitives";

interface SupplyChainTabProps {
  data: SupplyChainData;
}

const SupplyChainTab = ({ data }: SupplyChainTabProps) => {
  return (
    <div className="space-y-6">
      {data.dueDiligenceReport !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Due Diligence Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Report on the supply chain due diligence policy, risk management plan, and summary of third-party verification.
            </p>
            <FileInlineLink file={data.dueDiligenceReport} label={data.dueDiligenceReport?.filename} />
          </CardContent>
        </Card>
      )}

      {data.thirdPartyAssurances !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Third Party Assurances</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-line">{data.thirdPartyAssurances || "–"}</p>
          </CardContent>
        </Card>
      )}

      {data.supplyChainIndices !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Supply Chain Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-line">{data.supplyChainIndices || "–"}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupplyChainTab;
