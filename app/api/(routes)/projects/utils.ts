export interface JobInput {
  // Material parameters (from database)
  cutCostPerM: number; // €/meter
  drillSecsPerHole: number; // seconds per hole
  engraveCostPerM?: number; // €/meter (optional)

  // Job input values
  cutLengthMm: number; // Total cutting length in mm
  holesCount: number; // Number of holes/drillings
  setupMin: number; // Setup time in minutes
  postMin: number; // Post-processing time in minutes
  engraveLengthMm: number; // Engraving length in mm
  qty: number; // Quantity of parts

  // Cost settings
  machineEurMin: number; // Machine cost €/minute
  marginPct: number; // Margin percentage (0-100)
  minPriceEur: number; // Minimum price per job
  roundingStepEur: number; // Rounding step (e.g., 0.50)
}

export interface CalculationBreakdown {
  // Cost components
  cuttingCost: number;
  drillingCost: number;
  setupCost: number;
  postProcessingCost: number;
  engravingCost: number;

  // Time components (for transparency)
  cuttingTimeMin: number;
  drillingTimeMin: number;
  totalMachineTimeMin: number;

  // Subtotals
  subtotalPerUnit: number; // Before margin
  subtotalTotal: number; // Before margin, with quantity

  // Final pricing
  marginAmount: number;
  pricePerUnit: number; // After margin
  totalPrice: number; // After margin and quantity

  // Applied adjustments
  beforeRounding: number;
  afterRounding: number;
  afterMinPrice: number;
  finalPrice: number;
}

/**
 * Main calculation function
 */
export function calculateJobPrice(input: JobInput): CalculationBreakdown {
  // Convert mm to meters for cutting calculations
  const cutLengthM = input.cutLengthMm / 1000;
  const engraveLengthM = input.engraveLengthMm / 1000;

  // 1. CUTTING COSTS
  // Cost = (cutting length in meters) × (€/meter for this material/thickness)
  const cuttingCost = cutLengthM * input.cutCostPerM;

  // 2. DRILLING COSTS
  // Time = (number of holes) × (seconds per hole) / 60 → minutes
  // Cost = drilling time × machine cost per minute
  const drillingTimeMin = (input.holesCount * input.drillSecsPerHole) / 60;
  const drillingCost = drillingTimeMin * input.machineEurMin;

  // 3. SETUP COSTS
  // Cost = setup minutes × machine cost per minute
  const setupCost = input.setupMin * input.machineEurMin;

  // 4. POST-PROCESSING COSTS
  // Cost = post-processing minutes × machine cost per minute
  const postProcessingCost = input.postMin * input.machineEurMin;

  // 5. ENGRAVING COSTS (optional)
  // Cost = (engraving length in meters) × (€/meter for engraving)
  const engravingCost = input.engraveCostPerM
    ? engraveLengthM * input.engraveCostPerM
    : 0;

  // TOTAL MACHINE TIME (for transparency)
  const cuttingTimeMin = 0; // We don't calculate time from cutting, only cost
  const totalMachineTimeMin = drillingTimeMin + input.setupMin + input.postMin;

  // SUBTOTAL (sum of all cost components)
  const subtotalTotal =
    cuttingCost + drillingCost + setupCost + postProcessingCost + engravingCost;

  // PRICE PER UNIT
  // Divide total cost by quantity to get per-unit cost
  const subtotalPerUnit =
    input.qty > 0 ? subtotalTotal / input.qty : subtotalTotal;

  // 6. APPLY MARGIN
  // Margin is applied to the subtotal
  const marginMultiplier = 1 + input.marginPct / 100;
  const totalPriceWithMargin = subtotalTotal * marginMultiplier;
  const marginAmount = totalPriceWithMargin - subtotalTotal;

  // 7. APPLY ROUNDING
  // Round to nearest step (e.g., 0.50 → rounds to nearest 0.50€)
  const beforeRounding = totalPriceWithMargin;
  const afterRounding =
    input.roundingStepEur > 0
      ? Math.round(beforeRounding / input.roundingStepEur) *
        input.roundingStepEur
      : beforeRounding;

  // 8. APPLY MINIMUM PRICE
  // Ensure the price meets the minimum threshold
  const afterMinPrice = Math.max(afterRounding, input.minPriceEur);

  // FINAL PRICE
  const finalPrice = afterMinPrice;
  const finalPricePerUnit = input.qty > 0 ? finalPrice / input.qty : finalPrice;

  return {
    // Cost breakdown
    cuttingCost: roundTo2(cuttingCost),
    drillingCost: roundTo2(drillingCost),
    setupCost: roundTo2(setupCost),
    postProcessingCost: roundTo2(postProcessingCost),
    engravingCost: roundTo2(engravingCost),

    // Time breakdown
    cuttingTimeMin: roundTo2(cuttingTimeMin),
    drillingTimeMin: roundTo2(drillingTimeMin),
    totalMachineTimeMin: roundTo2(totalMachineTimeMin),

    // Subtotals
    subtotalPerUnit: roundTo2(subtotalPerUnit),
    subtotalTotal: roundTo2(subtotalTotal),

    // Final pricing
    marginAmount: roundTo2(marginAmount),
    pricePerUnit: roundTo2(finalPricePerUnit),
    totalPrice: roundTo2(finalPrice),

    // Applied adjustments (for transparency/debugging)
    beforeRounding: roundTo2(beforeRounding),
    afterRounding: roundTo2(afterRounding),
    afterMinPrice: roundTo2(afterMinPrice),
    finalPrice: roundTo2(finalPrice),
  };
}

/**
 * Helper: Round to 2 decimal places
 */
function roundTo2(num: number): number {
  return Math.round(num * 100) / 100;
}
