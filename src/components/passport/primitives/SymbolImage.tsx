import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { FileValue } from "@/types/passport";

export const SymbolImage = ({ file, alt }: { file: FileValue; alt: string }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 h-12 w-12">
        <ImageOff className="h-6 w-6 text-muted-foreground/50" />
        <span className="text-[9px] text-center text-muted-foreground leading-tight">{alt}</span>
      </div>
    );
  }
  return (
    <img src={file.link} alt={alt} className="h-12 w-12 object-contain" onError={() => setFailed(true)} />
  );
};
