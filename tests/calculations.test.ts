import { describe, expect, it } from "vitest";
import { aggregateByMonth, sumByScope } from "@/lib/calculations/aggregation";
import {
  calculateEmissionsKgCo2e,
  classifyScope
} from "@/lib/calculations/emissions";
import { convertActivityAmount } from "@/lib/calculations/units";
import { getDemoFactorForCategory } from "@/lib/emission-factors/demo-factors";
import { activityInputSchema } from "@/lib/validation/activity";
import { createTestRecord } from "@/tests/test-utils";

describe("emissions calculations", () => {
  it("calculates kg CO2e from amount and factor", () => {
    const factor = getDemoFactorForCategory("electricity");

    expect(
      calculateEmissionsKgCo2e({ amount: 10, unit: "kWh", factor })
    ).toBe(5);
  });

  it("rejects invalid and negative input amounts", () => {
    expect(() => convertActivityAmount(-1, "kWh", "kWh")).toThrow();
    expect(() => convertActivityAmount(Number.NaN, "kWh", "kWh")).toThrow();

    expect(
      activityInputSchema.safeParse({
        category: "electricity",
        amount: 0,
        unit: "kWh",
        activityDate: "2026-10-09"
      }).success
    ).toBe(false);
  });

  it("keeps decimal precision for raw calculations", () => {
    const factor = getDemoFactorForCategory("gasoline");

    expect(
      calculateEmissionsKgCo2e({ amount: 1.5, unit: "L", factor })
    ).toBeCloseTo(3.465, 6);
  });

  it("classifies electricity as scope 2 and combustion categories as scope 1", () => {
    expect(classifyScope("electricity")).toBe("scope2");
    expect(classifyScope("natural_gas")).toBe("scope1");
    expect(classifyScope("diesel")).toBe("scope1");
    expect(classifyScope("gasoline")).toBe("scope1");
  });
});

describe("aggregation", () => {
  it("aggregates emissions by month in chronological order", () => {
    const records = [
      createTestRecord({
        id: "1",
        category: "electricity",
        emissionsKgCo2e: 5,
        activityDate: "2026-10-09"
      }),
      createTestRecord({
        id: "2",
        category: "diesel",
        emissionsKgCo2e: 12,
        activityDate: "2026-09-01"
      }),
      createTestRecord({
        id: "3",
        category: "gasoline",
        emissionsKgCo2e: 3,
        activityDate: "2026-10-10"
      })
    ];

    expect(aggregateByMonth(records)).toEqual([
      { month: "2026-09", emissionsKgCo2e: 12 },
      { month: "2026-10", emissionsKgCo2e: 8 }
    ]);
  });

  it("sums scope 1 and scope 2 consistently", () => {
    const records = [
      createTestRecord({
        id: "1",
        category: "electricity",
        emissionsKgCo2e: 5,
        activityDate: "2026-10-09"
      }),
      createTestRecord({
        id: "2",
        category: "diesel",
        emissionsKgCo2e: 12,
        activityDate: "2026-10-10"
      })
    ];

    expect(sumByScope(records)).toEqual({ scope1: 12, scope2: 5 });
  });
});
