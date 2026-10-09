import { z } from "zod";
import { ACTIVITY_CATEGORIES, ACTIVITY_UNITS } from "@/lib/types";

export const activityInputSchema = z.object({
  category: z.enum(ACTIVITY_CATEGORIES),
  amount: z.number().finite().positive(),
  unit: z.enum(ACTIVITY_UNITS),
  activityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().trim().max(240).optional()
});

export type ActivityInput = z.infer<typeof activityInputSchema>;
