import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { usePassportData } from "@/hooks/usePassportData";
import { applyDesign } from "@/utils/applyDesign";
import Header from "@/components/passport/Header";
import IdentityCard from "@/components/passport/IdentityCard";
import Footer from "@/components/passport/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralInfoTab from "@/components/passport/tabs/GeneralInfoTab";
import SymbolsLabelsTab from "@/components/passport/tabs/SymbolsLabelsTab";
import CarbonFootprintTab from "@/components/passport/tabs/CarbonFootprintTab";
import SupplyChainTab from "@/components/passport/tabs/SupplyChainTab";
import MaterialsTab from "@/components/passport/tabs/MaterialsTab";
import CircularityTab from "@/components/passport/tabs/CircularityTab";
import PerformanceTab from "@/components/passport/tabs/PerformanceTab";
import { Loader2 } from "lucide-react";
import { PASSPORT_TABS } from "@/components/passport/passportConfig";

const Index = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const visibility = searchParams.get("visibility") ?? "internal";
  const setVisibility = (v: string) => setSearchParams({ visibility: v });
  const { data: queryResult, isLoading, error } = usePassportData(id, visibility);
  const data = queryResult?.data;
  const design = queryResult?.design ?? null;

  useEffect(() => {
    const name = data?.general.identifiers.batteryId ?? id ?? "Battery Passport";
    document.title = `${name} | Battery Passport`;
    return () => { document.title = "Battery Passport"; };
  }, [data, id]);

  useEffect(() => {
    applyDesign(design);
  }, [design]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading battery passport…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="max-w-md text-center space-y-2">
          <p className="text-lg font-semibold text-destructive">Failed to load passport</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Passport data could not be retrieved."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header data={data.general.dppInfo} passportData={data} visibility={visibility} onVisibilityChange={setVisibility} logoUrl={design?.logo_url ?? null} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <IdentityCard data={data.general} />
        <Tabs defaultValue="identifiers" className="w-full">
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0 overflow-x-auto">
            {PASSPORT_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded border px-4 py-2 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="identifiers"><GeneralInfoTab data={data.general} /></TabsContent>
          <TabsContent value="symbols"><SymbolsLabelsTab data={data.symbols} /></TabsContent>
          <TabsContent value="carbon"><CarbonFootprintTab data={data.carbon} /></TabsContent>
          <TabsContent value="supply"><SupplyChainTab data={data.supplyChain} /></TabsContent>
          <TabsContent value="materials"><MaterialsTab data={data.materials} /></TabsContent>
          <TabsContent value="circularity"><CircularityTab data={data.circularity} /></TabsContent>
          <TabsContent value="performance"><PerformanceTab data={data.performance} /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
