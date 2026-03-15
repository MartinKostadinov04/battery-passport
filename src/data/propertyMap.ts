// Maps every ontology property ID to its location in the PassportData structure.
// path format: "tabKey.sectionKey.fieldKey"
// Category-type properties are excluded (they are structural dividers, not data).

export const PROPERTY_PATH_MAP: Record<string, string> = {
  // ── SKU: DPP Information ──────────────────────────────────
  "property_02347db2e540b001": "general.dppInfo.schemaVersion",
  "property_02347db2e540b002": "general.dppInfo.granularity",

  // ── SKU: Identifier ───────────────────────────────────────
  "property_02347db2e540b004": "general.identifiers.batteryModelId",
  "property_02347db2e580b000": "general.identifiers.manufacturerId",
  "property_02347db2e580b001": "general.identifiers.facilityId",

  // ── SKU: Product data ─────────────────────────────────────
  "property_02347db2e580b003": "general.productData.manufacturerInfo",
  "property_02347db2e580b004": "general.productData.manufacturingPlace",
  "property_02347db2e580b005": "general.productData.warrantyPeriod",
  "property_02347db2e580b006": "general.productData.batteryCategory",
  "property_02347db2e580b007": "general.productData.batteryMass",

  // ── SKU: Symbols, labels and documentation of conformity ──
  "property_02347db2e5c0b001": "symbols.separateCollectionSymbol",
  "property_02347db2e5c0b002": "symbols.cadmiumLeadSymbol",
  "property_02347db2e5c0b003": "symbols.carbonFootprintLabel",
  "property_02347db2e5c0b004": "symbols.extinguishingAgent",
  "property_02347db2e5c0b005": "symbols.labelMeaning",
  "property_02347db2e5c0b006": "symbols.euDeclarationOfConformity",
  "property_02347db2e5c0b007": "symbols.testReports",

  // ── SKU: Battery carbon footprint ─────────────────────────
  "property_02347db2e600b001": "carbon.totalPerFunctionalUnit",
  "property_02347db2e600b002": "carbon.rawMaterialContribution",
  "property_02347db2e600b003": "carbon.productionContribution",
  "property_02347db2e600b004": "carbon.distributionContribution",
  "property_02347db2e640b000": "carbon.endOfLifeContribution",
  "property_02347db2e640b001": "carbon.performanceClass",
  "property_02347db2e640b002": "carbon.studyLink",
  "property_02347db2e640b003": "carbon.absoluteCarbonFootprint",

  // ── SKU: Supply chain due diligence ───────────────────────
  "property_02347db2e640b005": "supplyChain.dueDiligenceReport",
  "property_02347db2e640b006": "supplyChain.thirdPartyAssurances",
  "property_02347db2e640b007": "supplyChain.supplyChainIndices",

  // ── SKU: Battery materials and composition ────────────────
  "property_02347db2e680b000": "materials.chemistry",
  "property_02347db2e680b001": "materials.criticalRawMaterials",
  "property_02347db2e680b002": "materials.materialsUsed",
  "property_02347db2e680b003": "materials.hazardousSubstances",
  "property_02347db2e680b004": "materials.impactInfo",

  // ── SKU: Circularity information ──────────────────────────
  "property_02347db2e680b006": "circularity.circularityInfo.dismantlingManual",
  "property_02347db2e6c0b000": "circularity.circularityInfo.partNumbers",
  "property_02347db2e6c0b001": "circularity.circularityInfo.sparePartsInfo",
  "property_02347db2e6c0b002": "circularity.circularityInfo.safetyMeasures",

  // ── SKU: Recycled and renewable content ───────────────────
  "property_02347db2e6c0b004": "circularity.recycledContent.preConsumerNickel",
  "property_02347db2e6c0b005": "circularity.recycledContent.preConsumerCobalt",
  "property_02347db2e6c0b006": "circularity.recycledContent.preConsumerLithium",
  "property_02347db2e6c0b007": "circularity.recycledContent.postConsumerNickel",
  "property_02347db2e700b000": "circularity.recycledContent.postConsumerCobalt",
  "property_02347db2e700b001": "circularity.recycledContent.postConsumerLithium",
  "property_02347db2e700b002": "circularity.recycledContent.recycledLead",
  "property_02347db2e700b003": "circularity.recycledContent.renewableContent",

  // ── SKU: Information on role of end-users ─────────────────
  "property_02347db2e700b005": "circularity.endOfLife.wastePrevention",
  "property_02347db2e700b006": "circularity.endOfLife.separateCollection",
  "property_02347db2e700b007": "circularity.endOfLife.collectionSecondLifeEol",

  // ── SKU: Capacity, energy, and voltage ────────────────────
  "property_02347db2e740b000": "performance.capacityEnergyVoltage.ratedCapacity",
  "property_02347db2e740b001": "performance.capacityEnergyVoltage.capacityFade",
  "property_02347db2e740b002": "performance.capacityEnergyVoltage.minVoltage",
  "property_02347db2e740b003": "performance.capacityEnergyVoltage.maxVoltage",
  "property_02347db2e740b004": "performance.capacityEnergyVoltage.nominalVoltage",

  // ── SKU: Power capability ─────────────────────────────────
  "property_02347db2e740b006": "performance.powerCapability.originalPower",
  "property_02347db2e740b007": "performance.powerCapability.powerFade",
  "property_02347db2e740b008": "performance.powerCapability.maxPermittedPower",
  "property_02347db2e780b000": "performance.powerCapability.powerEnergyRatio",

  // ── SKU: Round trip energy efficiency ─────────────────────
  "property_02347db2e780b002": "performance.roundTripEfficiency.initial",
  "property_02347db2e780b003": "performance.roundTripEfficiency.at50PercentCycleLife",
  "property_02347db2e780b004": "performance.roundTripEfficiency.fade",

  // ── SKU: Internal resistance ──────────────────────────────
  "property_02347db2e780b006": "performance.internalResistance.initial",
  "property_02347db2e7c0b000": "performance.internalResistance.increaseModule",
  "property_02347db2e7c0b001": "performance.internalResistance.increaseCell",

  // ── SKU: Battery lifetime ─────────────────────────────────
  "property_02347db2e7c0b003": "performance.batteryLifetime.calendarYears",
  "property_02347db2e7c0b004": "performance.batteryLifetime.expectedCycles",
  "property_02347db2e7c0b005": "performance.batteryLifetime.cycleLifeRefTest",
  "property_02347db2e7c0b006": "performance.batteryLifetime.cRate",

  // ── SKU: Temperature conditions ───────────────────────────
  "property_02347db2e800b000": "performance.temperatureConditions.rangeField",
  "property_02347db2e800b001": "performance.temperatureConditions.idleLowerBoundary",
  "property_02347db2e800b002": "performance.temperatureConditions.idleUpperBoundary",

  // ── Unit: DPP Information ─────────────────────────────────
  "property_02347db2e800b004": "general.dppInfo.status",
  "property_02347db2e800b005": "general.dppInfo.lastUpdated",

  // ── Unit: Identifier ──────────────────────────────────────
  "property_02347db2e800b007": "general.identifiers.passportId",
  "property_02347db2e840b000": "general.identifiers.batteryId",
  "property_02347db2e840b001": "general.identifiers.economicOperatorId",

  // ── Unit: Product Data ────────────────────────────────────
  "property_02347db2e840b003": "general.productData.economicOperatorInfo",
  "property_02347db2e840b004": "general.productData.manufacturingDate",
  "property_02347db2e840b005": "general.productData.batteryStatus",

  // ── Unit: Capacity, energy, and voltage ───────────────────
  "property_02347db2e840b007": "performance.capacityEnergyVoltage.remainingCapacity",
  "property_02347db2e840b008": "performance.capacityEnergyVoltage.stateOfCharge",

  // ── Unit: Power capability ────────────────────────────────
  "property_02347db2e880b001": "performance.powerCapability.remainingPower",

  // ── Unit: Battery lifetime ────────────────────────────────
  "property_02347db2e880b003": "performance.batteryLifetime.actualCycles",

  // ── Unit: Temperature conditions ──────────────────────────
  "property_02347db2e880b005": "performance.temperatureConditions.temperatureInfo",
  "property_02347db2e880b006": "performance.temperatureConditions.extremeTempAbove",
  "property_02347db2e8c0b000": "performance.temperatureConditions.extremeTempBelow",
  "property_02347db2e8c0b001": "performance.temperatureConditions.chargingTempAbove",
  "property_02347db2e8c0b002": "performance.temperatureConditions.chargingTempBelow",

  // ── Unit: Negative events ─────────────────────────────────
  "property_02347db2e8c0b004": "performance.negativeEvents.deepDischargeEvents",
  "property_02347db2e8c0b005": "performance.negativeEvents.overchargeEvents",
  "property_02347db2e8c0b006": "performance.negativeEvents.accidents",
};

// Properties whose values compose a single visualization together
export const VISUALIZATION_GROUPS = {
  carbonLifecycleBreakdown: [
    "property_02347db2e600b002", // Raw material
    "property_02347db2e600b003", // Production
    "property_02347db2e600b004", // Distribution
    "property_02347db2e640b000", // End of life
  ],
  recycledContentChart: [
    "property_02347db2e6c0b004", // Pre-consumer Ni
    "property_02347db2e6c0b005", // Pre-consumer Co
    "property_02347db2e6c0b006", // Pre-consumer Li
    "property_02347db2e6c0b007", // Post-consumer Ni
    "property_02347db2e700b000", // Post-consumer Co
    "property_02347db2e700b001", // Post-consumer Li
    "property_02347db2e700b002", // Recycled lead
    "property_02347db2e700b003", // Renewable content
  ],
  temperatureExtremes: [
    "property_02347db2e880b006", // Above upper
    "property_02347db2e8c0b000", // Below lower
    "property_02347db2e8c0b001", // Charging above
    "property_02347db2e8c0b002", // Charging below
  ],
} as const;
