import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { endOfLifeData } from "@/data/batteryData";
import { Recycle, BookOpen, Wrench, AlertTriangle } from "lucide-react";

const EndOfLifeTab = () => {
  const e = endOfLifeData;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><Recycle className="h-4 w-4 text-primary" /> Collection & Recycling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{e.collectionInfo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><BookOpen className="h-4 w-4 text-primary" /> Dismantling Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{e.dismantlingReference}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recycling efficiency */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recycling Efficiency Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {e.recyclingEfficiency.map((mat) => (
            <div key={mat.material}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{mat.material}</span>
                <span className="font-medium">{mat.rate}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${mat.rate}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><Wrench className="h-4 w-4 text-primary" /> Spare Parts Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{e.sparePartsAvailability}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-primary" /> Transport & Handling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{e.recyclingInstructions}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EndOfLifeTab;
