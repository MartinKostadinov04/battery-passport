import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supplyChainData } from "@/data/batteryData";
import { CheckCircle2, Building2, Globe, Phone, Mail } from "lucide-react";

const SupplyChainTab = () => {
  const s = supplyChainData;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Manufacturer */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Manufacturer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /> {s.manufacturer.name}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><span className="ml-6">{s.manufacturer.address}</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {s.manufacturer.contact}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {s.manufacturer.email}</div>
            <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /> {s.manufacturer.website}</div>
          </CardContent>
        </Card>

        {/* Due Diligence */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Due Diligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
                <CheckCircle2 className="mr-1 h-3 w-3" /> {s.dueDiligenceStatus}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{s.dueDiligenceReport}</p>

            <div className="mt-4 rounded-lg border p-4">
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Economic Operator</p>
              <p className="text-sm font-medium">{s.economicOperator.name}</p>
              <p className="text-xs text-muted-foreground">{s.economicOperator.role}</p>
              <p className="text-xs text-muted-foreground">{s.economicOperator.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Third-Party Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {s.certifications.map((c) => (
                <TableRow key={c.name}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* EU Regulation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">EU Regulation Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {s.euRegulationCompliance.map((r) => (
            <div key={r.regulation} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className={`h-4 w-4 ${r.compliant ? 'text-primary' : 'text-destructive'}`} />
              <span>{r.regulation}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainTab;
