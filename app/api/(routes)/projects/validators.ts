import z from "zod";
import { AllParamSchema } from "../../(validators)";

export const POSTProjectsJsonSchema = z.object({
  name: z.string().min(3).max(100),
});
export type POSTProjectsJsonType = z.infer<typeof POSTProjectsJsonSchema>;

export const GETProjectsProjectIdParamSchema = AllParamSchema.pick({
  projectId: true,
});
export type GETProjectsProjectIdParamType = z.infer<
  typeof GETProjectsProjectIdParamSchema
>;

export const POSTProjectsProjectIdJobsParamSchema = AllParamSchema.pick({
  projectId: true,
});
export const POSTProjectsProjectIdJobsJsonSchema = z.object({
  materialThicknessId: z.uuid(),
  title: z.string().min(3).max(100),
  cutLengthMm: z.coerce.number(), // Total cutting length in mm
  holesCount: z.coerce.number(), // Number of holes/drillings
  setupMin: z.coerce.number(), // Setup time in minutes
  postMin: z.coerce.number(), // Post-processing time in minutes
  engraveLengthMm: z.coerce.number(), // Engraving length in mm
  qty: z.coerce.number(), // Quantity of parts,
  customerName: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
});
export type POSTProjectsProjectIdJobsParamType = z.infer<
  typeof POSTProjectsProjectIdJobsParamSchema
>;
export type POSTProjectsProjectIdJobsJsonType = z.infer<
  typeof POSTProjectsProjectIdJobsJsonSchema
>;

export const GETProjectProjectIdJobsJobIdParamSchema = AllParamSchema.pick({
  projectId: true,
  jobId: true,
});
export type GETProjectProjectIdJobsJobIdParamType = z.infer<
  typeof GETProjectProjectIdJobsJobIdParamSchema
>;
