import { describe, expect, it } from "vitest";
import { exportRecordsToCsv } from "@/lib/storage/export";
import {
  parseLocalDataEnvelope,
  validateLocalDataEnvelope
} from "@/lib/storage/local-data";
import { createTestRecord } from "@/tests/test-utils";

describe("storage validation", () => {
  it("returns an empty envelope for corrupted local data", () => {
    const parsed = parseLocalDataEnvelope({ schemaVersion: 1, records: "bad" });

    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.records).toEqual([]);
  });

  it("accepts valid local data envelopes", () => {
    const record = createTestRecord({
      id: "1",
      category: "electricity",
      emissionsKgCo2e: 5,
      activityDate: "2026-10-09"
    });

    const parsed = parseLocalDataEnvelope({
      schemaVersion: 1,
      records: [record],
      updatedAt: "2026-10-09T12:00:00.000Z"
    });

    expect(parsed.records).toHaveLength(1);
  });

  it("strictly rejects invalid JSON import envelopes", () => {
    const parsed = validateLocalDataEnvelope({
      schemaVersion: 1,
      records: "bad",
      updatedAt: "2026-10-09T12:00:00.000Z"
    });

    expect(parsed.success).toBe(false);
  });
});

describe("CSV export", () => {
  it("exports expected CSV headers and escapes descriptions", () => {
    const record = {
      ...createTestRecord({
        id: "1",
        category: "electricity",
        emissionsKgCo2e: 5,
        activityDate: "2026-10-09"
      }),
      description: 'Office, "A"'
    };

    expect(exportRecordsToCsv([record])).toContain(
      'Office, ""A""'
    );
    expect(exportRecordsToCsv([record]).split("\n")[0]).toBe(
      "id,category,amount,unit,activityDate,description,scope,factorId,emissionsKgCo2e,createdAt"
    );
  });
});
