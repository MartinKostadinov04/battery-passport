import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FileValue } from "@/types/passport";

interface FileProps {
  icon: React.ElementType;
  title: string;
  file: FileValue | null;
}

// Card wrapper variant (used in Circularity Information section)
export const FileLinkCard = ({ icon: Icon, title, file }: FileProps) => {
  if (!file) return null;
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-start gap-3 min-w-0">
          <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <a href={file.link} target="_blank" rel="noopener noreferrer">
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

// Inline row variant with dashed border (used in End-of-Life section)
export const FileRow = ({ icon: Icon, title, file }: FileProps) => {
  if (!file) return null;
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" asChild className="shrink-0">
        <a href={file.link} target="_blank" rel="noopener noreferrer">
          <Download className="h-3.5 w-3.5" /> Download
        </a>
      </Button>
    </div>
  );
};

// Compact anchor variant (used in Supply Chain and SymbolsLabels)
export const FileInlineLink = ({ file, label }: { file: FileValue | null; label?: string }) => {
  if (!file) return null;
  return (
    <Button variant="outline" size="sm" asChild>
      <a href={file.link} target="_blank" rel="noopener noreferrer">
        <Download className="h-3.5 w-3.5" /> {label ?? file.filename}
      </a>
    </Button>
  );
};
