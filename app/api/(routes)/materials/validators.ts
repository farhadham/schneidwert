import z from "zod";
import { AllParamSchema } from "../../(validators)";

export const GETMaterialsMaterialIdParamSchema = AllParamSchema.pick({
  materialId: true,
});
export type GETMaterialsMaterialIdParamType = z.infer<
  typeof GETMaterialsMaterialIdParamSchema
>;
