export const ACTIVITY_CATEGORIES = [
  "electricity",
  "natural_gas",
  "diesel",
  "gasoline"
] as const;

export const ACTIVITY_UNITS = ["kWh", "m3", "L"] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];
export type ActivityUnit = (typeof ACTIVITY_UNITS)[number];
export type EmissionScope = "scope1" | "scope2";

export type EmissionFactor = {
  id: string;
  category: ActivityCategory;
  value: number;
  numeratorUnit: "kgCO2e";
  denominatorUnit: ActivityUnit;
  scope: EmissionScope;
  sourceName: string;
  sourceUrl?: string;
  region: string;
  publicationYear: number;
  methodologyNote: string;
  isDemo: boolean;
};

export type FactorSnapshot = Pick<
  EmissionFactor,
  | "id"
  | "category"
  | "value"
  | "numeratorUnit"
  | "denominatorUnit"
  | "scope"
  | "sourceName"
  | "region"
  | "publicationYear"
  | "methodologyNote"
  | "isDemo"
>;

export type ActivityRecord = {
  id: string;
  category: ActivityCategory;
  amount: number;
  unit: ActivityUnit;
  activityDate: string;
  description?: string;
  factorId: string;
  factorSnapshot: FactorSnapshot;
  emissionsKgCo2e: number;
  createdAt: string;
};

export type LocalDataEnvelope = {
  schemaVersion: 1;
  records: ActivityRecord[];
  updatedAt: string;
};
