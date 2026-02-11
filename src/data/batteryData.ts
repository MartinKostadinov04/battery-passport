export const passportIdentity = {
  passportId: "did:web:batterypass.eu:CZB:BP00042",
  modelNumber: "EV-LI-2024-PRO",
  serialNumber: "CZB-BP-2024-00042",
  category: "EV",
  weight: "499.00 kg",
  status: "Original",
  manufacturedDate: "2024-03-15",
  manufacturer: {
    name: "CellZone Battery GmbH",
    address: "Musterstraße 12, 80331 München, Germany",
  },
  economicOperator: "EuroCell Distribution AG",
  verificationHash: "0x7f3a…b2c1",
};

export const generalInfo = {
  chemistry: "Lithium Nickel Manganese Cobalt Oxide (NMC 811)",
  ratedCapacity: "75.0 kWh",
  nominalVoltage: "400 V",
  minVoltage: "280 V",
  maxVoltage: "450 V",
  expectedLifetimeCycles: 1500,
  expectedLifetimeYears: 8,
  tempRangeUpper: "45 °C",
  tempRangeLower: "-20 °C",
  cellType: "Prismatic",
  dimensions: "1,800 × 1,200 × 150 mm",
  energyDensity: "250 Wh/kg",
  maxChargePower: "150 kW",
  maxDischargePower: "200 kW",
};

export const performanceData = {
  stateOfHealth: 98.5,
  originalPowerCapability: 200,
  currentPowerCapability: 197,
  roundTripEfficiency: 95.2,
  internalResistance: "0.8 mΩ",
  capacityFade: [
    { month: "0", capacity: 100 },
    { month: "6", capacity: 99.2 },
    { month: "12", capacity: 98.5 },
    { month: "18", capacity: 97.8 },
    { month: "24", capacity: 97.1 },
    { month: "30", capacity: 96.5 },
    { month: "36", capacity: 95.9 },
    { month: "42", capacity: 95.3 },
    { month: "48", capacity: 94.7 },
  ],
  powerFade: [
    { month: "0", power: 100 },
    { month: "6", power: 99.5 },
    { month: "12", power: 99.0 },
    { month: "18", power: 98.4 },
    { month: "24", power: 97.9 },
    { month: "30", power: 97.3 },
    { month: "36", power: 96.8 },
    { month: "42", power: 96.2 },
    { month: "48", power: 95.7 },
  ],
};

export const materialsData = {
  criticalRawMaterials: [
    { name: "Nickel", percentage: 33 },
    { name: "Cobalt", percentage: 10 },
    { name: "Lithium", percentage: 7 },
    { name: "Manganese", percentage: 10 },
  ],
  recycledContent: [
    { material: "Nickel", share: 12 },
    { material: "Cobalt", share: 20 },
    { material: "Lithium", share: 8 },
    { material: "Lead", share: 85 },
  ],
  hazardousSubstances: [
    { substance: "Electrolyte (LiPF6)", casNumber: "21324-40-3", concentration: "12%", classification: "Acute Tox. 3" },
    { substance: "Nickel compounds", casNumber: "Various", concentration: "33%", classification: "Carc. 1A" },
    { substance: "Cobalt compounds", casNumber: "Various", concentration: "10%", classification: "Carc. 1B" },
  ],
  renewableContentShare: 14,
};

export const carbonFootprintData = {
  totalCarbonFootprint: 3250,
  unit: "kg CO₂e",
  performanceClass: "B",
  breakdown: [
    { stage: "Raw Material", value: 1300, fill: "hsl(160, 84%, 39%)" },
    { stage: "Production", value: 975, fill: "hsl(200, 70%, 50%)" },
    { stage: "Distribution", value: 325, fill: "hsl(40, 90%, 55%)" },
    { stage: "Recycling", value: 650, fill: "hsl(280, 50%, 55%)" },
  ],
  studyReference: "ISO 14067:2018 — Carbon Footprint Study, TÜV SÜD Report #CF-2024-042",
};

export const supplyChainData = {
  manufacturer: {
    name: "CellZone Battery GmbH",
    address: "Musterstraße 12, 80331 München, Germany",
    contact: "+49 89 123 456 78",
    email: "info@cellzone-battery.eu",
    website: "www.cellzone-battery.eu",
  },
  dueDiligenceStatus: "Compliant",
  dueDiligenceReport: "OECD Due Diligence Guidance — Report dated 2024-02-28",
  certifications: [
    { name: "ISO 9001:2015", status: "Valid", expiry: "2026-01-15" },
    { name: "ISO 14001:2015", status: "Valid", expiry: "2025-11-30" },
    { name: "IATF 16949:2016", status: "Valid", expiry: "2025-08-20" },
    { name: "REACH Compliance", status: "Compliant", expiry: "N/A" },
  ],
  euRegulationCompliance: [
    { regulation: "EU Battery Regulation 2023/1542", compliant: true },
    { regulation: "EU Taxonomy Regulation", compliant: true },
    { regulation: "REACH (EC 1907/2006)", compliant: true },
    { regulation: "RoHS Directive 2011/65/EU", compliant: true },
    { regulation: "CBAM Regulation (EU) 2023/956", compliant: true },
  ],
  economicOperator: {
    name: "EuroCell Distribution AG",
    role: "Importer / Distributor",
    address: "Industrieweg 5, 1010 Vienna, Austria",
  },
};

export const endOfLifeData = {
  collectionInfo: "Return to authorized collection points. Free take-back guaranteed under EU Battery Regulation Art. 49.",
  dismantlingReference: "Dismantling Manual DM-CZB-2024-042 — available upon request from manufacturer.",
  recyclingEfficiency: [
    { material: "Cobalt", rate: 95 },
    { material: "Nickel", rate: 95 },
    { material: "Lithium", rate: 80 },
    { material: "Copper", rate: 98 },
    { material: "Aluminium", rate: 90 },
  ],
  sparePartsAvailability: "Battery Management System (BMS) modules and cell replacements available for 8 years from date of manufacture.",
  recyclingInstructions: "Battery must be discharged to < 50% SoC before transport. Handle per ADR Class 9 regulations.",
};
