import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { FileValue } from "@/types/passport";

interface FileProps {
  icon: React.ElementType;
  title: string;
  file: FileValue | null;
}

// Card wrapper variant (used in Circularity Information section)
export const FileLinkCard = ({ icon: Icon, title, file }: FileProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-start gap-3 min-w-0">
        <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          {file
            ? <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
            : <p className="text-xs text-muted-foreground italic mt-0.5">Not provided</p>
          }
        </div>
      </div>
      {file && (
        <a href={file.link} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
          <Download className="h-3.5 w-3.5" /> Download
        </a>
      )}
    </CardContent>
  </Card>
);

// Inline row variant with dashed border (used in End-of-Life section)
export const FileRow = ({ icon: Icon, title, file }: FileProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-dashed py-4 last:border-0">
    <div className="flex items-start gap-3 min-w-0">
      <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        {file
          ? <p className="text-xs text-muted-foreground mt-0.5">{file.filename}</p>
          : <p className="text-xs text-muted-foreground italic mt-0.5">Not provided</p>
        }
      </div>
    </div>
    {file && (
      <a href={file.link} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    )}
  </div>
);

// Compact anchor variant (used in Supply Chain and SymbolsLabels)
export const FileInlineLink = ({ file, label }: { file: FileValue | null; label?: string }) => {
  if (!file) return <p className="text-xs text-muted-foreground italic">Not provided</p>;
  return (
    <a href={file.link} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
      <Download className="h-3.5 w-3.5" /> {label ?? file.filename}
    </a>
  );
};
