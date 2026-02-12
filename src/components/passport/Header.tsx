import { Battery, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dppInfo } from "@/data/batteryData";

const Header = () => (
  <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Battery className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight">Battery Passport</span>
      </div>
      <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
        <ShieldCheck className="h-3.5 w-3.5" />
        {dppInfo.status} · v{dppInfo.schemaVersion}
      </Badge>
    </div>
  </header>
);

export default Header;
