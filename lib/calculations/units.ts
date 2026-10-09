import type { ActivityUnit } from "@/lib/types";

export function convertActivityAmount(
  amount: number,
  fromUnit: ActivityUnit,
  toUnit: ActivityUnit
): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Activity amount must be a finite positive number.");
  }

  if (fromUnit === toUnit) {
    return amount;
  }

  throw new Error(`Unsupported unit conversion from ${fromUnit} to ${toUnit}.`);
}
