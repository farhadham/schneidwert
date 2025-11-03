import z from "zod";

export const createJobFormSchema = z.object({
  materialThicknessId: z.uuid(),
  cutLengthMm: z.number().min(0),
  holesCount: z.number().min(0),
  setupMin: z.number().min(0),
  postMin: z.number().min(0),
  engraveLengthMm: z.number().min(0),
  qty: z.number().min(1),
  customerName: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  title: z.string().min(1).max(100),
});
export type CreateJobFormType = z.infer<typeof createJobFormSchema>;
