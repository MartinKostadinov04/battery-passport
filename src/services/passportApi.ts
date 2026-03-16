import type {
  PassportDataResponse,
  PassportData,
  FileValue,
  DesignData,
} from "@/types/passport";
import { PROPERTY_PATH_MAP } from "@/data/propertyMap";

const API_BASE = "https://api.formlyst.com/passport";

export async function fetchPassportValues(passportId: string, visibility: string): Promise<PassportDataResponse> {
  const res = await fetch(`${API_BASE}/${passportId}?visibility=${visibility}`);
  if (!res.ok) throw new Error(`Passport data fetch failed: ${res.status}`);
  return res.json();
}

function createEmptyPassportData(): PassportData {
  return {
    general: {
      dppInfo: { schemaVersion: null, granularity: null, status: null, lastUpdated: null },
      identifiers: { passportId: null, batteryId: null, economicOperatorId: null, batteryModelId: null, manufacturerId: null, facilityId: null },
      productData: { manufacturerInfo: null, manufacturingPlace: null, warrantyPeriod: null, batteryCategory: null, batteryMass: null, economicOperatorInfo: null, manufacturingDate: null, batteryStatus: null },
    },
    symbols: {
      separateCollectionSymbol: null, cadmiumLeadSymbol: null, carbonFootprintLabel: null,
      extinguishingAgent: null, labelMeaning: null,
      euDeclarationOfConformity: null, testReports: null,
    },
    carbon: {
      totalPerFunctionalUnit: null, rawMaterialContribution: null, productionContribution: null,
      distributionContribution: null, endOfLifeContribution: null, performanceClass: null,
      studyLink: null, absoluteCarbonFootprint: null,
    },
    supplyChain: { dueDiligenceReport: null, thirdPartyAssurances: null, supplyChainIndices: null },
    materials: { chemistry: null, criticalRawMaterials: null, materialsUsed: null, hazardousSubstances: null, impactInfo: null },
    circularity: {
      circularityInfo: { dismantlingManual: null, partNumbers: null, sparePartsInfo: null, safetyMeasures: null },
      recycledContent: { preConsumerNickel: null, preConsumerCobalt: null, preConsumerLithium: null, postConsumerNickel: null, postConsumerCobalt: null, postConsumerLithium: null, recycledLead: null, renewableContent: null },
      endOfLife: { wastePrevention: null, separateCollection: null, collectionSecondLifeEol: null },
    },
    performance: {
      capacityEnergyVoltage: { ratedCapacity: null, capacityFade: null, minVoltage: null, maxVoltage: null, nominalVoltage: null, remainingCapacity: null, stateOfCharge: null },
      powerCapability: { originalPower: null, powerFade: null, maxPermittedPower: null, powerEnergyRatio: null, remainingPower: null },
      roundTripEfficiency: { initial: null, at50PercentCycleLife: null, fade: null },
      internalResistance: { initial: null, increaseModule: null, increaseCell: null },
      batteryLifetime: { calendarYears: null, expectedCycles: null, cycleLifeRefTest: null, cRate: null, actualCycles: null },
      temperatureConditions: { rangeField: null, idleLowerBoundary: null, idleUpperBoundary: null, temperatureInfo: null, extremeTempAbove: null, extremeTempBelow: null, chargingTempAbove: null, chargingTempBelow: null },
      negativeEvents: { deepDischargeEvents: null, overchargeEvents: null, accidents: null },
    },
  };
}

function isFileValue(val: unknown): val is FileValue {
  return typeof val === "object" && val !== null && "snowflake" in val && "link" in val;
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

function normalizeValue(raw: string | number | string[] | FileValue): string | string[] | FileValue {
  if (isFileValue(raw)) return raw;
  if (Array.isArray(raw)) return raw.map(String);
  return String(raw);
}

export interface FetchPassportResult {
  data: PassportData;
  design: DesignData | null;
}

export async function fetchPassport(passportId: string, visibility = "internal"): Promise<FetchPassportResult> {
  const raw = await fetchPassportValues(passportId, visibility);
  const data = createEmptyPassportData();

  for (const [propId, entry] of Object.entries(raw.properties)) {
    const path = PROPERTY_PATH_MAP[propId];
    if (!path) continue;
    setNestedValue(data as unknown as Record<string, unknown>, path, normalizeValue(entry.value));
  }

  // Top-level last_updated is the authoritative timestamp — use as fallback
  if (raw.last_updated && data.general.dppInfo.lastUpdated === null) {
    data.general.dppInfo.lastUpdated = raw.last_updated;
  }

  return { data, design: raw.design ?? null };
}
