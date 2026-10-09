import type { ActivityCategory, EmissionFactor } from "@/lib/types";

export const DEMO_EMISSION_FACTORS: EmissionFactor[] = [
  {
    id: "demo-electricity-tr-2026",
    category: "electricity",
    value: 0.5,
    numeratorUnit: "kgCO2e",
    denominatorUnit: "kWh",
    scope: "scope2",
    sourceName: "Carbonly demo factor set",
    region: "TR",
    publicationYear: 2026,
    methodologyNote:
      "Demo factor for product testing. Results are illustrative and not compliance-grade.",
    isDemo: true
  },
  {
    id: "demo-natural-gas-owned-equipment-2026",
    category: "natural_gas",
    value: 2,
    numeratorUnit: "kgCO2e",
    denominatorUnit: "m3",
    scope: "scope1",
    sourceName: "Carbonly demo factor set",
    region: "Generic",
    publicationYear: 2026,
    methodologyNote:
      "Demo factor under the explicit owned or controlled equipment direct-combustion assumption.",
    isDemo: true
  },
  {
    id: "demo-diesel-owned-equipment-2026",
    category: "diesel",
    value: 2.68,
    numeratorUnit: "kgCO2e",
    denominatorUnit: "L",
    scope: "scope1",
    sourceName: "Carbonly demo factor set",
    region: "Generic",
    publicationYear: 2026,
    methodologyNote:
      "Demo factor under the explicit owned or controlled equipment direct-combustion assumption.",
    isDemo: true
  },
  {
    id: "demo-gasoline-owned-equipment-2026",
    category: "gasoline",
    value: 2.31,
    numeratorUnit: "kgCO2e",
    denominatorUnit: "L",
    scope: "scope1",
    sourceName: "Carbonly demo factor set",
    region: "Generic",
    publicationYear: 2026,
    methodologyNote:
      "Demo factor under the explicit owned or controlled equipment direct-combustion assumption.",
    isDemo: true
  }
];

export function getDemoFactorForCategory(
  category: ActivityCategory
): EmissionFactor {
  const factor = DEMO_EMISSION_FACTORS.find((item) => item.category === category);

  if (!factor) {
    throw new Error(`No demo emission factor found for category: ${category}`);
  }

  return factor;
}
