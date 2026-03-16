import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Battery, ShieldCheck, Globe, Users, ClipboardCheck, Lock, QrCode, Download, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { GeneralInfoData, PassportData } from "@/types/passport";
import QRCode from "react-qr-code";

const VISIBILITY_LEVELS = [
  { value: "public",   label: "Public",   icon: Globe },
  { value: "partners", label: "Partners", icon: Users },
  { value: "auditors", label: "Auditors", icon: ClipboardCheck },
  { value: "internal", label: "Internal", icon: Lock },
] as const;

// Synex brand mark — used as QR code centre overlay
const SynexMark = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.5789 47.3777L15.2026 0.00146484L8.26006e-05 15.204L47.3763 62.5802L62.5789 47.3777Z" fill="#474747"/>
    <path d="M47.4041 2.43688e-06L0.027832 47.3762L15.2304 62.5788L62.6066 15.2026L47.4041 2.43688e-06Z" fill="url(#synex-grad)"/>
    <defs>
      <linearGradient id="synex-grad" x1="14.8468" y1="62.1952" x2="62.6045" y2="15.2007" gradientUnits="userSpaceOnUse">
        <stop stopColor="#474747"/>
        <stop offset="1" stopColor="#B3B3B3"/>
      </linearGradient>
    </defs>
  </svg>
);

// Tokenises a JSON string into React spans with syntax-highlight colors.
// Runs entirely client-side; no external dependency needed.
function ColorizedJson({ json }: { json: string }) {
  const parts: React.ReactNode[] = [];
  // Order matters: key (string + colon) must come before plain string
  const regex = /("(?:[^"\\]|\\.)*")(\s*:)|("(?:[^"\\]|\\.)*")|(true|false)|(null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}\[\],])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(json)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`w${lastIndex}`} className="text-neutral-500">{json.slice(lastIndex, match.index)}</span>);
    }
    if (match[1] !== undefined) {
      parts.push(<span key={`k${match.index}`} className="text-sky-400">{match[1]}</span>);
      parts.push(<span key={`c${match.index}`} className="text-neutral-500">{match[2]}</span>);
    } else if (match[3] !== undefined) {
      parts.push(<span key={`s${match.index}`} className="text-emerald-400">{match[3]}</span>);
    } else if (match[4] !== undefined) {
      parts.push(<span key={`b${match.index}`} className="text-amber-400">{match[4]}</span>);
    } else if (match[5] !== undefined) {
      parts.push(<span key={`n${match.index}`} className="text-rose-400">{match[5]}</span>);
    } else if (match[6] !== undefined) {
      parts.push(<span key={`d${match.index}`} className="text-violet-400">{match[6]}</span>);
    } else {
      parts.push(<span key={`p${match.index}`} className="text-neutral-500">{match[7]}</span>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < json.length) {
    parts.push(<span key="end" className="text-neutral-500">{json.slice(lastIndex)}</span>);
  }
  return <>{parts}</>;
}

interface HeaderProps {
  data: GeneralInfoData["dppInfo"];
  passportData: PassportData;
  visibility: string;
  onVisibilityChange: (v: string) => void;
}

const Header = ({ data, passportData, visibility, onVisibilityChange }: HeaderProps) => {
  const [copied, setCopied] = useState(false);
  const [jsonMode, setJsonMode] = useState<"pretty" | "raw">("pretty");
  const qrRef = useRef<HTMLDivElement>(null);

  const batteryId = passportData.general.identifiers.batteryId ?? "export";
  const date = new Date().toISOString().slice(0, 10);
  const prettyJson = JSON.stringify(passportData, null, 2);
  const rawJson = JSON.stringify(passportData);
  const displayJson = jsonMode === "pretty" ? prettyJson : rawJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `passport-qr-${batteryId}-${date}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([prettyJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `passport-${batteryId}-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Battery className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Battery Passport</span>
        </div>

        <div className="flex items-center gap-2">

          {/* QR Code — preview + download */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="pill" size="xs">
                <QrCode className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">QR</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
              <DialogHeader>
                <DialogTitle>Passport QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-2">
                <div ref={qrRef} className="relative rounded-lg border p-4 bg-white">
                  <QRCode value={window.location.href} size={180} level="H" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-1.5 rounded-sm">
                      <SynexMark size={32} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono break-all text-center px-2">
                  {window.location.href}
                </p>
                <div className="flex gap-2 w-full">
                  <Button variant="pill" size="xs" className="flex-1 justify-center" onClick={handleCopy}>
                    {copied
                      ? <><Check className="h-3.5 w-3.5" /> Copied!</>
                      : <><Copy className="h-3.5 w-3.5" /> Copy link</>
                    }
                  </Button>
                  <Button variant="pill" size="xs" className="flex-1 justify-center" onClick={handleDownloadQR}>
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* JSON — preview + download */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="pill" size="xs">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">JSON</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col gap-3">
              <DialogHeader>
                <DialogTitle>Passport Data — JSON</DialogTitle>
              </DialogHeader>

              {/* Toolbar: Pretty/Raw toggle + Download */}
              <div className="flex items-center justify-between">
                <div className="flex rounded-full border border-primary/20 overflow-hidden">
                  {(["pretty", "raw"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setJsonMode(mode)}
                      className={cn(
                        "h-7 px-3 text-xs font-medium capitalize transition-colors",
                        jsonMode === mode
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <Button variant="pill" size="xs" onClick={handleDownloadJson}>
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>

              {/* Code block */}
              <pre className="flex-1 overflow-auto rounded-lg bg-neutral-950 p-4 text-xs font-mono leading-relaxed min-h-0">
                <ColorizedJson json={displayJson} />
              </pre>
            </DialogContent>
          </Dialog>

          {/* Visibility selector */}
          <Select value={visibility} onValueChange={onVisibilityChange}>
            <SelectTrigger className="h-7 gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 text-xs font-medium text-primary hover:bg-primary/15 focus:ring-1 focus:ring-primary/50 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="min-w-[140px]">
              {VISIBILITY_LEVELS.map(({ value, label, icon: LevelIcon }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-xs focus:bg-primary/10 focus:text-primary data-[state=checked]:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <LevelIcon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Badge className="h-7 gap-1.5 whitespace-nowrap bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            {data.status || "–"} · {data.schemaVersion || "–"}
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
