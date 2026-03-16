import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SymbolsLabelsData } from "@/types/passport";
import { Shield, AlertCircle } from "lucide-react";
import { SymbolImage, FileRow } from "@/components/passport/primitives";

interface SymbolsLabelsTabProps {
  data: SymbolsLabelsData;
}

const SymbolsLabelsTab = ({ data }: SymbolsLabelsTabProps) => {
  const hasSafetyInfo = data.extinguishingAgent !== null || data.labelMeaning !== null;
  const hasConformityDocs = data.euDeclarationOfConformity !== null || data.testReports !== null;

  const regulatorySymbols = [
    { file: data.separateCollectionSymbol, alt: "Separate Collection", label: "Separate Collection Symbol", desc: "Indicates necessity of separate collection" },
    { file: data.cadmiumLeadSymbol, alt: "Cd/Pb", label: "Cadmium & Lead Symbols", desc: "Chemical symbols for Cd/Pb content" },
    { file: data.carbonFootprintLabel, alt: "Carbon Footprint Label", label: "Carbon Footprint Label", desc: "Declared carbon footprint class" },
  ].filter(({ file }) => file !== null);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Regulatory Symbols — only shown when at least one symbol is available */}
        {regulatorySymbols.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Regulatory Symbols</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {regulatorySymbols.map(({ file, alt, label, desc }) => (
                <div key={label} className="flex items-center gap-4 border-b border-dashed pb-3 last:border-0 last:pb-0">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border p-2">
                    <SymbolImage file={file!} alt={alt} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Safety Information */}
        {hasSafetyInfo && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Safety Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.extinguishingAgent !== null && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-destructive">Extinguishing Agent</p>
                  </div>
                  <p className="text-sm whitespace-pre-line">{data.extinguishingAgent || "–"}</p>
                </div>
              )}
              {data.labelMeaning !== null && (
                <div className="border-t border-dashed pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Meaning of Labels & Symbols</p>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{data.labelMeaning || "–"}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Documentation of Conformity — hidden if neither file is available */}
      {hasConformityDocs && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Documentation of Conformity</CardTitle>
          </CardHeader>
          <CardContent>
            <FileRow icon={Shield} title="EU Declaration of Conformity" file={data.euDeclarationOfConformity} />
            <FileRow icon={Shield} title="Test Reports Proving Compliance" file={data.testReports} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymbolsLabelsTab;
