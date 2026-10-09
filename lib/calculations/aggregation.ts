import type { ActivityCategory, ActivityRecord, EmissionScope } from "@/lib/types";

export type MonthlyEmissionPoint = {
  month: string;
  emissionsKgCo2e: number;
};

export function aggregateByMonth(
  records: ActivityRecord[]
): MonthlyEmissionPoint[] {
  const totals = new Map<string, number>();

  for (const record of records) {
    const month = record.activityDate.slice(0, 7);
    totals.set(month, (totals.get(month) ?? 0) + record.emissionsKgCo2e);
  }

  return [...totals.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, emissionsKgCo2e]) => ({ month, emissionsKgCo2e }));
}

export function sumByScope(
  records: ActivityRecord[]
): Record<EmissionScope, number> {
  return records.reduce(
    (totals, record) => {
      totals[record.factorSnapshot.scope] += record.emissionsKgCo2e;
      return totals;
    },
    { scope1: 0, scope2: 0 }
  );
}

export function sumByCategory(
  records: ActivityRecord[]
): Record<ActivityCategory, number> {
  return records.reduce(
    (totals, record) => {
      totals[record.category] += record.emissionsKgCo2e;
      return totals;
    },
    { electricity: 0, natural_gas: 0, diesel: 0, gasoline: 0 }
  );
}

export function filterRecordsByDateRange(
  records: ActivityRecord[],
  range: { from?: string; to?: string }
): ActivityRecord[] {
  return records.filter((record) => {
    if (range.from && record.activityDate < range.from) {
      return false;
    }

    if (range.to && record.activityDate > range.to) {
      return false;
    }

    return true;
  });
}
