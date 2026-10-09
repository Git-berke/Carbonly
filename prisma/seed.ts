import { PrismaClient } from "@prisma/client";
import { DEMO_EMISSION_FACTORS } from "../lib/emission-factors/demo-factors";

const prisma = new PrismaClient();

async function main() {
  for (const factor of DEMO_EMISSION_FACTORS) {
    await prisma.emissionFactor.upsert({
      where: {
        category_denominatorUnit_region_publicationYear_sourceName: {
          category: factor.category,
          denominatorUnit: factor.denominatorUnit,
          region: factor.region,
          publicationYear: factor.publicationYear,
          sourceName: factor.sourceName
        }
      },
      update: {
        value: factor.value,
        numeratorUnit: factor.numeratorUnit,
        scope: factor.scope,
        methodologyNote: factor.methodologyNote,
        isDemo: factor.isDemo
      },
      create: {
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
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
