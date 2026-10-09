import type { EmissionFactor } from "@/lib/types";
import { prisma } from "@/lib/db/prisma";
import { DEMO_EMISSION_FACTORS } from "@/lib/emission-factors/demo-factors";

export type EmissionFactorSourceMode = "database" | "demo";

export type EmissionFactorResult = {
  factors: EmissionFactor[];
  mode: EmissionFactorSourceMode;
};

export async function getEmissionFactors(): Promise<EmissionFactorResult> {
  if (!process.env.DATABASE_URL) {
    return {
      factors: DEMO_EMISSION_FACTORS,
      mode: "demo"
    };
  }

  const factors = await prisma.emissionFactor.findMany({
    orderBy: [{ category: "asc" }, { publicationYear: "desc" }]
  });

  return {
    factors: factors.map((factor) => ({
      id: factor.id,
      category: factor.category as EmissionFactor["category"],
      value: factor.value.toNumber(),
      numeratorUnit: factor.numeratorUnit as EmissionFactor["numeratorUnit"],
      denominatorUnit: factor.denominatorUnit as EmissionFactor["denominatorUnit"],
      scope: factor.scope as EmissionFactor["scope"],
      sourceName: factor.sourceName,
      sourceUrl: factor.sourceUrl ?? undefined,
      region: factor.region,
      publicationYear: factor.publicationYear,
      methodologyNote: factor.methodologyNote,
      isDemo: factor.isDemo
    })),
    mode: "database"
  };
}
