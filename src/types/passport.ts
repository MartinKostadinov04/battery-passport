// Raw API response types

export interface FileValue {
  snowflake: string;
  extension: string;
  filename: string;
  size: string;
  link: string;
}

export interface OntologyProperty {
  id: string;
  type: "short_text" | "long_text" | "date" | "measurement" | "number" | "range" | "file" | "image" | "category";
  name: string;
}

export interface OntologyDepth {
  type: "singular" | "series";
  properties: OntologyProperty[];
}

export interface OntologyResponse {
  name: string;
  description: string;
  ontology_id: string;
  meta: {
    updated_at: string;
    created_at: string;
    template_id: string;
  };
  depths: {
    SKU: OntologyDepth;
    Unit: OntologyDepth;
  };
}

export interface PassportDataResponse {
  last_updated: string;
  properties: Record<string, { value: string | number | string[] | FileValue }>;
  friendly_id: string | null;
}

// Per-tab typed data structures

export interface GeneralInfoData {
  dppInfo: {
    schemaVersion: string | null;
    granularity: string | null;
    status: string | null;
    lastUpdated: string | null;
  };
  identifiers: {
    passportId: string | null;
    batteryId: string | null;
    economicOperatorId: string | null;
    batteryModelId: string | null;
    manufacturerId: string | null;
    facilityId: string | null;
  };
  productData: {
    manufacturerInfo: string | null;
    manufacturingPlace: string | null;
    warrantyPeriod: string | null;
    batteryCategory: string | null;
    batteryMass: string | null;
    economicOperatorInfo: string | null;
    manufacturingDate: string | null;
    batteryStatus: string | null;
  };
}

export interface SymbolsLabelsData {
  separateCollectionSymbol: FileValue | null;
  cadmiumLeadSymbol: FileValue | null;
  carbonFootprintLabel: FileValue | null;
  extinguishingAgent: string | null;
  labelMeaning: string | null;
  euDeclarationOfConformity: FileValue | null;
  testReports: FileValue | null;
}

export interface CarbonFootprintData {
  totalPerFunctionalUnit: string | null;
  rawMaterialContribution: string | null;
  productionContribution: string | null;
  distributionContribution: string | null;
  endOfLifeContribution: string | null;
  performanceClass: string | null;
  studyLink: FileValue | null;
  absoluteCarbonFootprint: string | null;
}

export interface SupplyChainData {
  dueDiligenceReport: FileValue | null;
  thirdPartyAssurances: string | null;
  supplyChainIndices: string | null;
}

export interface MaterialsData {
  chemistry: string | null;
  criticalRawMaterials: string | null;
  materialsUsed: string | null;
  hazardousSubstances: string | null;
  impactInfo: string | null;
}

export interface CircularityData {
  circularityInfo: {
    dismantlingManual: FileValue | null;
    partNumbers: string | null;
    sparePartsInfo: string | null;
    safetyMeasures: FileValue | null;
  };
  recycledContent: {
    preConsumerNickel: string | null;
    preConsumerCobalt: string | null;
    preConsumerLithium: string | null;
    postConsumerNickel: string | null;
    postConsumerCobalt: string | null;
    postConsumerLithium: string | null;
    recycledLead: string | null;
    renewableContent: string | null;
  };
  endOfLife: {
    wastePrevention: FileValue | null;
    separateCollection: FileValue | null;
    collectionSecondLifeEol: FileValue | null;
  };
}

export interface PerformanceData {
  capacityEnergyVoltage: {
    ratedCapacity: string | null;
    capacityFade: string | null;
    minVoltage: string | null;
    maxVoltage: string | null;
    nominalVoltage: string | null;
    remainingCapacity: string | null;
    stateOfCharge: string | null;
  };
  powerCapability: {
    originalPower: string | null;
    powerFade: string | null;
    maxPermittedPower: string | null;
    powerEnergyRatio: string | null;
    remainingPower: string | null;
  };
  roundTripEfficiency: {
    initial: string | null;
    at50PercentCycleLife: string | null;
    fade: string | null;
  };
  internalResistance: {
    initial: string | null;
    increaseModule: string | null;
    increaseCell: string | null;
  };
  batteryLifetime: {
    calendarYears: string | null;
    expectedCycles: string | null;
    cycleLifeRefTest: string | null;
    cRate: string | null;
    actualCycles: string | null;
  };
  temperatureConditions: {
    rangeField: string[] | null;
    idleLowerBoundary: string | null;
    idleUpperBoundary: string | null;
    temperatureInfo: string | null;
    extremeTempAbove: string | null;
    extremeTempBelow: string | null;
    chargingTempAbove: string | null;
    chargingTempBelow: string | null;
  };
  negativeEvents: {
    deepDischargeEvents: string | null;
    overchargeEvents: string | null;
    accidents: FileValue | null;
  };
}

export interface PassportData {
  general: GeneralInfoData;
  symbols: SymbolsLabelsData;
  carbon: CarbonFootprintData;
  supplyChain: SupplyChainData;
  materials: MaterialsData;
  circularity: CircularityData;
  performance: PerformanceData;
}
