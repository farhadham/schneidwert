import z from "zod";

export const AllParamSchema = z.object({
  orgId: z.uuid(),
  projectId: z.uuid(),
  jobId: z.uuid(),
  materialId: z.uuid(),
});
