import type {
  ActivityCategory,
  ActivityUnit,
  EmissionFactor,
  EmissionScope,
  FactorSnapshot
} from "@/lib/types";
import { convertActivityAmount } from "@/lib/calculations/units";

export function classifyScope(category: ActivityCategory): EmissionScope {
  if (category === "electricity") {
    return "scope2";
  }

  return "scope1";
}

export function toFactorSnapshot(factor: EmissionFactor): FactorSnapshot {
  return {
    id: factor.id,
    category: factor.category,
    value: factor.value,
    numeratorUnit: factor.numeratorUnit,
    denominatorUnit: factor.denominatorUnit,
    scope: factor.scope,
    sourceName: factor.sourceName,
    region: factor.region,
    publicationYear: factor.publicationYear,
    methodologyNote: factor.methodologyNote,
    isDemo: factor.isDemo
  };
}

export function calculateEmissionsKgCo2e(params: {
  amount: number;
  unit: ActivityUnit;
  factor: EmissionFactor;
}): number {
  const normalizedAmount = convertActivityAmount(
    params.amount,
    params.unit,
    params.factor.denominatorUnit
  );

  return normalizedAmount * params.factor.value;
}
