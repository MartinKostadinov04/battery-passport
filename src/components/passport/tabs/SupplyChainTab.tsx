import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supplyChainData } from "@/data/batteryData";
import { FileText, ExternalLink } from "lucide-react";

const SupplyChainTab = () => {
  const s = supplyChainData;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" /> Due Diligence Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Report on the supply chain due diligence policy, risk management plan, and summary of third-party verification.
          </p>
          <a href={s.dueDiligenceReport} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
            View Due Diligence Report <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainTab;
