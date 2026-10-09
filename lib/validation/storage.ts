import { z } from "zod";
import { ACTIVITY_CATEGORIES, ACTIVITY_UNITS } from "@/lib/types";

const scopeSchema = z.enum(["scope1", "scope2"]);

const factorSnapshotSchema = z.object({
  id: z.string().min(1),
  category: z.enum(ACTIVITY_CATEGORIES),
  value: z.number().finite().positive(),
  numeratorUnit: z.literal("kgCO2e"),
  denominatorUnit: z.enum(ACTIVITY_UNITS),
  scope: scopeSchema,
  sourceName: z.string().min(1),
  region: z.string().min(1),
  publicationYear: z.number().int().min(1900),
  methodologyNote: z.string().min(1),
  isDemo: z.boolean()
});

export const activityRecordSchema = z.object({
  id: z.string().min(1),
  category: z.enum(ACTIVITY_CATEGORIES),
  amount: z.number().finite().positive(),
  unit: z.enum(ACTIVITY_UNITS),
  activityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().max(240).optional(),
  factorId: z.string().min(1),
  factorSnapshot: factorSnapshotSchema,
  emissionsKgCo2e: z.number().finite().nonnegative(),
  createdAt: z.string().datetime()
});

export const localDataEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  records: z.array(activityRecordSchema),
  updatedAt: z.string().datetime()
});
