import { calculateEmissionsKgCo2e, toFactorSnapshot } from "@/lib/calculations/emissions";
import { getDemoFactorForCategory } from "@/lib/emission-factors/demo-factors";
import type { ActivityRecord } from "@/lib/types";

const sampleInputs = [
  {
    id: "sample-electricity-2026-07",
    category: "electricity",
    amount: 420,
    activityDate: "2026-07-12",
    description: "Ofis elektrik tuketimi"
  },
  {
    id: "sample-natural-gas-2026-08",
    category: "natural_gas",
    amount: 85,
    activityDate: "2026-08-04",
    description: "Isitma sistemi"
  },
  {
    id: "sample-diesel-2026-09",
    category: "diesel",
    amount: 120,
    activityDate: "2026-09-18",
    description: "Saha araci yakiti"
  },
  {
    id: "sample-gasoline-2026-10",
    category: "gasoline",
    amount: 64,
    activityDate: "2026-10-02",
    description: "Kontrollu ekipman yakiti"
  },
  {
    id: "sample-electricity-2026-10",
    category: "electricity",
    amount: 390,
    activityDate: "2026-10-08",
    description: "Depo elektrik tuketimi"
  }
] as const;

export function createSampleRecords(): ActivityRecord[] {
  return sampleInputs.map((input) => {
    const factor = getDemoFactorForCategory(input.category);

    return {
      id: input.id,
      category: input.category,
      amount: input.amount,
      unit: factor.denominatorUnit,
      activityDate: input.activityDate,
      description: input.description,
      factorId: factor.id,
      factorSnapshot: toFactorSnapshot(factor),
      emissionsKgCo2e: calculateEmissionsKgCo2e({
        amount: input.amount,
        unit: factor.denominatorUnit,
        factor
      }),
      createdAt: "2026-10-09T12:00:00.000Z"
    };
  });
}
