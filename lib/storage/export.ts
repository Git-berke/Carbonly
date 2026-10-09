import type { ActivityRecord } from "@/lib/types";

const CSV_HEADERS = [
  "id",
  "category",
  "amount",
  "unit",
  "activityDate",
  "description",
  "scope",
  "factorId",
  "emissionsKgCo2e",
  "createdAt"
];

function escapeCsvValue(value: string | number | undefined): string {
  const raw = value === undefined ? "" : String(value);

  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replaceAll('"', '""')}"`;
  }

  return raw;
}

export function exportRecordsToCsv(records: ActivityRecord[]): string {
  const rows = records.map((record) =>
    [
      record.id,
      record.category,
      record.amount,
      record.unit,
      record.activityDate,
      record.description,
      record.factorSnapshot.scope,
      record.factorId,
      record.emissionsKgCo2e,
      record.createdAt
    ]
      .map(escapeCsvValue)
      .join(",")
  );

  return [CSV_HEADERS.join(","), ...rows].join("\n");
}
