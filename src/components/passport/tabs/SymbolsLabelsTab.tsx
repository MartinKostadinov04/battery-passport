import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { symbolsAndLabels } from "@/data/batteryData";
import { ExternalLink, FileText, Shield, Flame } from "lucide-react";

const LinkRow = ({ label, url, icon: Icon }: { label: string; url: string; icon: React.ElementType }) => (
  <div className="flex items-start gap-3 border-b border-dashed py-3 last:border-0">
    <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">{label}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 truncate">
        {url} <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    </div>
  </div>
);

const SymbolsLabelsTab = () => {
  const s = symbolsAndLabels;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regulatory Symbols</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <img src={s.separateCollectionSymbol} alt="Separate Collection" className="h-12 w-12 object-contain" />
              <div>
                <p className="text-sm font-medium">Separate Collection Symbol</p>
                <p className="text-xs text-muted-foreground">Indicates necessity of separate collection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <img src={s.cadmiumLeadSymbol} alt="Cd/Pb" className="h-12 w-12 object-contain" />
              <div>
                <p className="text-sm font-medium">Cadmium & Lead Symbols</p>
                <p className="text-xs text-muted-foreground">Chemical symbols for Cd/Pb content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="h-4 w-4 text-primary" /> Safety Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Extinguishing Agent</p>
              <p className="text-sm">{s.extinguishingAgent}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Label Meaning</p>
              <p className="text-sm">{s.labelMeaning}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" /> Documentation of Conformity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LinkRow label="EU Declaration of Conformity" url={s.euDeclarationOfConformity} icon={Shield} />
          <LinkRow label="Test Reports Proving Compliance" url={s.testReports} icon={FileText} />
          <LinkRow label="Carbon Footprint Label" url={s.carbonFootprintLabel} icon={FileText} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SymbolsLabelsTab;
