import { db } from "@/database";
import { GETMaterialsMaterialIdParamType } from "./validators";
import { eq } from "drizzle-orm";
import { materialThicknessTable } from "@/database/schema";

export const getAllMaterials = async () => {
  return db.query.materialTable.findMany();
};

export const getThicknessesByMaterialId = async (
  param: GETMaterialsMaterialIdParamType,
) => {
  return db.query.materialThicknessTable.findMany({
    where: eq(materialThicknessTable.materialId, param.materialId),
  });
};
