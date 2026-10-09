import { getDemoFactorForCategory } from "@/lib/emission-factors/demo-factors";
import { toFactorSnapshot } from "@/lib/calculations/emissions";
import type { ActivityCategory, ActivityRecord } from "@/lib/types";

export function createTestRecord(params: {
  id: string;
  category: ActivityCategory;
  emissionsKgCo2e: number;
  activityDate: string;
}): ActivityRecord {
  const factor = getDemoFactorForCategory(params.category);

  return {
    id: params.id,
    category: params.category,
    amount: 10,
    unit: factor.denominatorUnit,
    activityDate: params.activityDate,
    factorId: factor.id,
    factorSnapshot: toFactorSnapshot(factor),
    emissionsKgCo2e: params.emissionsKgCo2e,
    createdAt: "2026-10-09T12:00:00.000Z"
  };
}
