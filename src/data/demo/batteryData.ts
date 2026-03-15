// ========================================================
// Battery Passport Data — sourced from Industrial Battery CSV
// Categories map to tabs; subcategories map to card sections
// ========================================================

// ── Tab 1: Identifiers and Product Data ──────────────────
export const dppInfo = {
  schemaVersion: "1.0.0",
  status: "active",
  granularity: "battery pack",
  lastUpdated: "2026-02-11T08:15:00Z",
};

export const identifiers = {
  passportId: "urn:bp:2026:IND:LA:000001",
  batteryId: "SN-IND-LA-24V185Ah-000001",
  economicOperatorId: "EORI:BG123456789000",
  manufacturerId: "urn:org:elhim-iskra-jsc",
  facilityId: "urn:facility:pazardzhik-bg:elt-line-01",
};

export const productData = {
  manufacturerInfo: "Elhim-Iskra JSC; compliance contact: compliance@example.com; country: BG",
  manufacturingPlace: "Pazardzhik, Bulgaria",
  manufacturingDate: "2025-11",
  warrantyPeriod: "2027-11",
  batteryCategory: "Industrial rechargeable battery (>2kWh) – Flooded lead-acid traction pack (24 V, 185 Ah @C5, ~4.44 kWh)",
  batteryMass: 126, // kg
  batteryStatus: "in service",
};

// ── Tab 2: Symbols, Labels and Documentation of Conformity ──
export const symbolsAndLabels = {
  separateCollectionSymbol: "https://europa.eu/youreurope/business/images/symbols/WEEE_symbol_without_bar.svg",
  cadmiumLeadSymbol: "https://cdn-icons-png.flaticon.com/512/1216/1216895.png",
  carbonFootprintLabel: "https://example.com/assets/labels/cf_label_class_c.png",
  extinguishingAgent: "Water spray/mist; foam; dry powder (ABC). Avoid direct high-pressure water jet on energized equipment.",
  labelMeaning: "Symbols indicate separate collection, presence of lead (Pb), and declared carbon footprint class.",
  euDeclarationOfConformity: "https://example.com/docs/eu_declaration_of_conformity_LA-24V185Ah.pdf",
  testReports: "https://example.com/docs/test_reports_LA-24V185Ah.pdf",
};

// ── Tab 3: Battery Carbon Footprint ──────────────────────
export const carbonFootprintData = {
  totalPerFunctionalUnit: 45, // kgCO2eq/kWh — Histogram 1
  unit: "kgCO₂eq/kWh",
  performanceClass: "C",
  studyLink: "https://example.com/docs/public_cf_study_LA-24V185Ah.pdf",
  // Pie Chart 3
  lifecycleBreakdown: [
    { stage: "Raw Material Acquisition", value: 50, fill: "hsl(160, 84%, 39%)" },
    { stage: "Main Product Production", value: 35, fill: "hsl(200, 70%, 50%)" },
    { stage: "Distribution", value: 5, fill: "hsl(40, 90%, 55%)" },
    { stage: "End of Life & Recycling", value: 10, fill: "hsl(280, 50%, 55%)" },
  ],
};

// ── Tab 4: Supply Chain Due Diligence ────────────────────
export const supplyChainData = {
  dueDiligenceReport: "https://example.com/docs/due_diligence_report_2025.pdf",
};

// ── Tab 5: Battery Materials and Composition ─────────────
export const materialsData = {
  // Pie Chart 1 items
  chemistry: "Lead-acid, flooded (traction); PbO₂ positive / Pb negative; H₂SO₄ electrolyte",
  criticalRawMaterials: "Lead; antimony; sulfuric acid; polypropylene; copper",
  materialsUsed: "Positive plate: lead dioxide (PbO₂); Negative plate: sponge lead (Pb); Electrolyte: sulfuric acid (SG ~1.28); Separator: polyethylene; Case/Lid: polypropylene",
  hazardousSubstances: "Lead and sulfuric acid electrolyte (corrosive); antimony compounds in grids (as applicable).",
  impactInfo: "Toxicity and corrosion hazards; avoid spills; use PPE; recycle via licensed lead-acid battery recycler; comply with transport & waste regulations.",
};

// ── Tab 6: Circularity and Resource Efficiency ───────────
export const circularityInfo = {
  dismantlingManual: "https://example.com/docs/dismantling_manual_LA-24V185Ah.pdf",
  partNumbers: "https://example.com/docs/parts_list_LA-24V185Ah.html",
  sparePartsInfo: "Spare parts available via authorized service partners; see parts portal: https://example.com/spares",
  safetyMeasures: "https://example.com/docs/safety_measures_LA-24V185Ah.pdf",
};

// Pie Chart 2
export const recycledContent = {
  preConsumer: [
    { material: "Nickel", share: 0 },
    { material: "Cobalt", share: 0 },
    { material: "Lithium", share: 0 },
  ],
  postConsumer: [
    { material: "Nickel", share: 0 },
    { material: "Cobalt", share: 0 },
    { material: "Lithium", share: 0 },
  ],
  recycledLead: 60, // %
  renewableContent: 20, // %
};

export const endOfLifeLinks = {
  wastePrevention: "https://example.com/docs/end_user_waste_prevention.pdf",
  separateCollection: "https://example.com/docs/end_user_separate_collection.pdf",
  collectionSecondLifeEol: "https://example.com/docs/collection_second_life_eol_treatment.pdf",
};

// ── Tab 7: Performance and Durability ────────────────────
export const capacityEnergyVoltage = {
  ratedCapacity: 185, // Ah
  capacityFade: 4, // % — Line Chart 1
  stateOfCharge: 80, // % — Time Series 1
  minVoltage: 20.4, // V
  maxVoltage: 31.8, // V
  nominalVoltage: 24, // V
};

export const powerCapability = {
  originalPower: 5000, // W
  powerFade: 5, // % — Line Chart 1
  maxPermittedPower: 8000, // W
};

export const roundTripEfficiency = {
  initial: 80, // %
  at50PercentCycleLife: 78, // %
  fade: 2, // % — Line Chart 1
};

export const internalResistance = {
  initial: 0, // Ohm (pack-level)
  increase: 15, // %
};

export const batteryLifetime = {
  calendarYears: 6,
  expectedCycles: 1200,
  actualCycles: 450, // Time Series 1
  cycleLifeRefTest: "Flooded lead-acid cycling at 25°C; EoL at 80% capacity; ref: up to 1200 cycles @ 50% DoD; up to 900 cycles @ 80% DoD",
  cRate: 0.2, // A/Ah
};

export const temperatureConditions = {
  operatingTemp: 25, // °C
  idleLowerBoundary: -20, // °C
  idleUpperBoundary: 40, // °C
  // Histogram 2
  extremeTemps: [
    { label: "Above upper boundary", minutes: 10 },
    { label: "Below lower boundary", minutes: 5 },
    { label: "Charging above upper", minutes: 0 },
    { label: "Charging below lower", minutes: 0 },
  ],
};

// ── Chart data generators ────────────────────────────────

// Line Chart 1: Fade curves (capacity fade, power fade, RTE fade over time)
export const fadeChartData = [
  { month: 0, capacityFade: 0, powerFade: 0, rteFade: 0 },
  { month: 6, capacityFade: 0.5, powerFade: 0.6, rteFade: 0.2 },
  { month: 12, capacityFade: 1.0, powerFade: 1.2, rteFade: 0.5 },
  { month: 18, capacityFade: 1.5, powerFade: 1.8, rteFade: 0.8 },
  { month: 24, capacityFade: 2.0, powerFade: 2.5, rteFade: 1.0 },
  { month: 30, capacityFade: 2.5, powerFade: 3.0, rteFade: 1.2 },
  { month: 36, capacityFade: 3.0, powerFade: 3.8, rteFade: 1.5 },
  { month: 42, capacityFade: 3.5, powerFade: 4.3, rteFade: 1.8 },
  { month: 48, capacityFade: 4.0, powerFade: 5.0, rteFade: 2.0 },
];

// Time Series 1: SoC and cycle count snapshots
export const timeSeriesData = [
  { date: "2025-11", soc: 100, cycles: 0 },
  { date: "2025-12", soc: 85, cycles: 50 },
  { date: "2026-01", soc: 78, cycles: 120 },
  { date: "2026-02", soc: 80, cycles: 200 },
  { date: "2026-03", soc: 82, cycles: 280 },
  { date: "2026-04", soc: 75, cycles: 350 },
  { date: "2026-05", soc: 80, cycles: 450 },
];
