import { Battery, ShieldCheck, Globe, Users, ClipboardCheck, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { GeneralInfoData } from "@/types/passport";

const VISIBILITY_LEVELS = [
  { value: "public",   label: "Public",   icon: Globe },
  { value: "partners", label: "Partners", icon: Users },
  { value: "auditors", label: "Auditors", icon: ClipboardCheck },
  { value: "internal", label: "Internal", icon: Lock },
] as const;

interface HeaderProps {
  data: GeneralInfoData["dppInfo"];
  visibility: string;
  onVisibilityChange: (v: string) => void;
}

const Header = ({ data, visibility, onVisibilityChange }: HeaderProps) => (
  <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Battery className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight">Battery Passport</span>
      </div>
      <div className="flex items-center gap-3">
        <Select value={visibility} onValueChange={onVisibilityChange}>
          <SelectTrigger className="h-7 gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 text-xs font-medium text-primary hover:bg-primary/15 focus:ring-0 focus:ring-offset-0">
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
          <Badge className="gap-1.5 whitespace-nowrap bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            {data.status || "–"} · {data.schemaVersion || "–"}
          </Badge>
        </div>
      </div>
    </header>
);

export default Header;
