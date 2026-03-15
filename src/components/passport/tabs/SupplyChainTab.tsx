import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupplyChainData } from "@/types/passport";
import { FileText, Download, ShieldCheck, BarChart3 } from "lucide-react";

interface SupplyChainTabProps {
  data: SupplyChainData;
}

const SupplyChainTab = ({ data }: SupplyChainTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" /> Due Diligence Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Report on the supply chain due diligence policy, risk management plan, and summary of third-party verification.
          </p>
          {data.dueDiligenceReport ? (
            <a
              href={data.dueDiligenceReport.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> {data.dueDiligenceReport.filename}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not provided</p>
          )}
        </CardContent>
      </Card>

      {data.thirdPartyAssurances !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4 text-primary" /> Third Party Assurances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-line">{data.thirdPartyAssurances || "–"}</p>
          </CardContent>
        </Card>
      )}

      {data.supplyChainIndices !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-primary" /> Supply Chain Indices
            </CardTitle>
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
