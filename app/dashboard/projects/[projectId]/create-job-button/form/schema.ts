import z from "zod";

export const createJobFormSchema = z.object({
  materialThicknessId: z.uuid(),
  cutLengthMm: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a valid non-negative number",
    ),
  holesCount: z
    .string()
    .refine((val) => /^\d+$/.test(val), "Must be a valid non-negative integer"),
  setupMin: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a valid non-negative number",
    ),
  postMin: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a valid non-negative number",
    ),
  engraveLengthMm: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a valid non-negative number",
    ),
  qty: z
    .string()
    .refine((val) => /^\d+$/.test(val), "Must be a valid non-negative integer"),
  customerName: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  title: z.string().min(1).max(100),
});
export type CreateJobFormType = z.infer<typeof createJobFormSchema>;
