CREATE TABLE "EmissionFactor" (
  "id" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "value" DECIMAL(12, 6) NOT NULL,
  "numeratorUnit" TEXT NOT NULL,
  "denominatorUnit" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "sourceName" TEXT NOT NULL,
  "sourceUrl" TEXT,
  "region" TEXT NOT NULL,
  "publicationYear" INTEGER NOT NULL,
  "methodologyNote" TEXT NOT NULL,
  "isDemo" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "EmissionFactor_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "emission_factor_unique_reference"
  ON "EmissionFactor" (
    "category",
    "denominatorUnit",
    "region",
    "publicationYear",
    "sourceName"
  );

CREATE INDEX "emission_factor_category_idx"
  ON "EmissionFactor" ("category");

CREATE INDEX "emission_factor_scope_idx"
  ON "EmissionFactor" ("scope");

CREATE INDEX "emission_factor_demo_idx"
  ON "EmissionFactor" ("isDemo");
