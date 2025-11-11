import { db } from "@/database";
import {
  GETProjectProjectIdJobsJobIdParamType,
  GETProjectsProjectIdParamType,
  POSTProjectsJsonType,
  POSTProjectsProjectIdJobsJsonType,
  POSTProjectsProjectIdJobsParamType,
} from "./validators";
import {
  jobTable,
  materialThicknessTable,
  projectTable,
} from "@/database/schema";
import { eq } from "drizzle-orm";
import { GLOBAL_DEFAULTS } from "../../(data)/constants";
import { calculateJobPrice } from "./utils";
import { ApiError } from "../../(lib)/api-error";

export const getAllProjects = async (userId: string) => {
  return db.query.projectTable.findMany({
    where: eq(projectTable.createdBy, userId),
  });
};

export const createProject = async (
  userId: string,
  payload: POSTProjectsJsonType,
) => {
  return db.insert(projectTable).values({
    ...payload,
    createdBy: userId,
  });
};

export const getProjectDetail = async (
  params: GETProjectsProjectIdParamType,
) => {
  return db.query.projectTable.findFirst({
    with: {
      jobs: {
        with: {
          thickness: true,
          material: true,
        },
      },
    },
    where: eq(projectTable.id, params.projectId),
  });
};

export const createJob = async (
  params: POSTProjectsProjectIdJobsParamType,
  payload: POSTProjectsProjectIdJobsJsonType,
) => {
  const {
    cutLengthMm,
    engraveLengthMm,
    holesCount,
    postMin,
    qty,
    setupMin,
    title,
    materialThicknessId,
    customerName,
    notes,
  } = payload;

  // get cutCostPerM, drillSecsPerHole from material and it's thickness
  const materialThickness = await db.query.materialThicknessTable.findFirst({
    where: eq(materialThicknessTable.id, materialThicknessId),
    with: {
      material: true,
    },
  });

  if (!materialThickness) {
    throw new ApiError({
      message: "Material thickness not found",
      status: 400,
    });
  }

  const cutCostPerM = parseFloat(materialThickness.cutCostPerM);
  const drillSecsPerHole = parseFloat(materialThickness.drillSecsPerHole);
  const engraveCostPerM = materialThickness.engraveCostPerM
    ? parseFloat(materialThickness.engraveCostPerM)
    : undefined;

  const {
    afterMinPrice,
    afterRounding,
    beforeRounding,
    cuttingCost,
    cuttingTimeMin,
    drillingCost,
    drillingTimeMin,
    engravingCost,
    finalPrice,
    marginAmount,
    postProcessingCost,
    pricePerUnit,
    setupCost,
    subtotalPerUnit,
    subtotalTotal,
    totalMachineTimeMin,
    totalPrice,
  } = calculateJobPrice({
    machineEurMin: GLOBAL_DEFAULTS.machineEurMin,
    marginPct: GLOBAL_DEFAULTS.defaultMarginPct,
    minPriceEur: GLOBAL_DEFAULTS.minPriceEur,
    roundingStepEur: GLOBAL_DEFAULTS.roundingStepEur,
    cutLengthMm,
    engraveLengthMm,
    holesCount,
    postMin,
    qty,
    setupMin,
    cutCostPerM,
    drillSecsPerHole,
    engraveCostPerM,
  });

  return db.insert(jobTable).values({
    title,
    cutLengthMm: String(cutLengthMm),
    engraveLengthMm: String(engraveLengthMm),
    holesCount: holesCount,
    resultTotal: String(finalPrice),
    materialId: materialThickness.materialId,
    projectId: params.projectId,
    thicknessId: materialThickness.id,
    customerName,
    marginPct: String(GLOBAL_DEFAULTS.defaultMarginPct),
    notes,
    overrideMachineEurMin: String(GLOBAL_DEFAULTS.machineEurMin),
    postMin: String(postMin),
    qty: qty,
    setupMin: String(setupMin),
    resultPricePerUnit: String(pricePerUnit),
  });
};

export const getJobDetail = async (
  params: GETProjectProjectIdJobsJobIdParamType,
) => {
  return db.query.jobTable.findFirst({
    where: eq(jobTable.id, params.jobId),
    with: {
      project: true,
      material: true,
      thickness: true,
    },
  });
};
