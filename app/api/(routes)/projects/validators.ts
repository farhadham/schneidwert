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
  title: z.string().min(3).max(100),
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
