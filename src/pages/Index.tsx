import Header from "@/components/passport/Header";
import IdentityCard from "@/components/passport/IdentityCard";
import Footer from "@/components/passport/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralInfoTab from "@/components/passport/tabs/GeneralInfoTab";
import PerformanceTab from "@/components/passport/tabs/PerformanceTab";
import MaterialsTab from "@/components/passport/tabs/MaterialsTab";
import CarbonFootprintTab from "@/components/passport/tabs/CarbonFootprintTab";
import SupplyChainTab from "@/components/passport/tabs/SupplyChainTab";
import EndOfLifeTab from "@/components/passport/tabs/EndOfLifeTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <IdentityCard />
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {[
              { value: "general", label: "General Information" },
              { value: "performance", label: "Performance & Durability" },
              { value: "materials", label: "Materials & Composition" },
              { value: "carbon", label: "Carbon Footprint" },
              { value: "supply", label: "Supply Chain" },
              { value: "eol", label: "End of Life" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border px-4 py-2 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="general"><GeneralInfoTab /></TabsContent>
          <TabsContent value="performance"><PerformanceTab /></TabsContent>
          <TabsContent value="materials"><MaterialsTab /></TabsContent>
          <TabsContent value="carbon"><CarbonFootprintTab /></TabsContent>
          <TabsContent value="supply"><SupplyChainTab /></TabsContent>
          <TabsContent value="eol"><EndOfLifeTab /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
