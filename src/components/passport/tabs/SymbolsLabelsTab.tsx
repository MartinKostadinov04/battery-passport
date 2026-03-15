import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SymbolsLabelsData } from "@/types/passport";
import { FileText, Shield, Flame, AlertCircle, ImageOff } from "lucide-react";
import { SymbolImage, FileInlineLink } from "@/components/passport/primitives";

interface SymbolsLabelsTabProps {
  data: SymbolsLabelsData;
}

const SymbolsLabelsTab = ({ data }: SymbolsLabelsTabProps) => {
  const hasSafetyInfo = data.extinguishingAgent !== null || data.labelMeaning !== null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Regulatory Symbols */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regulatory Symbols</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { file: data.separateCollectionSymbol, alt: "Separate Collection", label: "Separate Collection Symbol", desc: "Indicates necessity of separate collection" },
              { file: data.cadmiumLeadSymbol, alt: "Cd/Pb", label: "Cadmium & Lead Symbols", desc: "Chemical symbols for Cd/Pb content" },
              { file: data.carbonFootprintLabel, alt: "Carbon Footprint Label", label: "Carbon Footprint Label", desc: "Declared carbon footprint class" },
            ].map(({ file, alt, label, desc }) => (
              <div key={label} className="flex items-center gap-4 border-b border-dashed pb-3 last:border-0 last:pb-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border p-2">
                  {file
                    ? <SymbolImage file={file} alt={alt} />
                    : <ImageOff className="h-6 w-6 text-muted-foreground/40" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{file ? desc : "Not provided"}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Safety Information — only render if at least one field is non-null */}
        {hasSafetyInfo && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="h-4 w-4 text-primary" /> Safety Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.extinguishingAgent !== null && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 shrink-0" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-400">Extinguishing Agent</p>
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

      {/* Documentation of Conformity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" /> Documentation of Conformity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 first:pt-0">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">EU Declaration of Conformity</p>
              </div>
            </div>
            <FileInlineLink file={data.euDeclarationOfConformity} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Test Reports Proving Compliance</p>
              </div>
            </div>
            <FileInlineLink file={data.testReports} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymbolsLabelsTab;
