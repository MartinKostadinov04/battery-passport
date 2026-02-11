import { QrCode, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { passportIdentity } from "@/data/batteryData";

const IdentityCard = () => {
  const p = passportIdentity;
  return (
    <Card className="mb-6">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
        {/* Left */}
        <div className="space-y-4">
          {/* Passport ID */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="h-4 w-4 text-primary" />
            <span className="font-mono">{p.passportId}</span>
          </div>

          {/* Model / Serial */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Model</p>
              <p className="text-xl font-bold">{p.modelNumber}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Serial</p>
              <p className="text-xl font-bold">{p.serialNumber}</p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="font-normal">Category: {p.category}</Badge>
            <Badge variant="secondary" className="font-normal">Weight: {p.weight}</Badge>
            <Badge className="gap-1 bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
              <span className="h-2 w-2 rounded-full bg-primary inline-block" />
              {p.status}
            </Badge>
          </div>

          {/* Manufacturer */}
          <div className="grid gap-1 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[120px]">Manufactured</span>
              <span>{p.manufacturedDate}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[120px]">Manufacturer</span>
              <span>{p.manufacturer.name}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[120px]">Address</span>
              <span>{p.manufacturer.address}</span>
            </div>
          </div>
        </div>

        {/* Right: Economic operator */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center min-w-[180px]">
          <Building2 className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Economic Operator</p>
          <p className="mt-1 text-sm font-medium">{p.economicOperator}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityCard;
