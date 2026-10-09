import type { LocalDataEnvelope } from "@/lib/types";
import { localDataEnvelopeSchema } from "@/lib/validation/storage";

export const LOCAL_DATA_SCHEMA_VERSION = 1;
export const LOCAL_DATA_STORAGE_KEY = "carbonly.local-data.v1";

export function createEmptyLocalDataEnvelope(): LocalDataEnvelope {
  return {
    schemaVersion: LOCAL_DATA_SCHEMA_VERSION,
    records: [],
    updatedAt: new Date().toISOString()
  };
}

export function parseLocalDataEnvelope(input: unknown): LocalDataEnvelope {
  const parsed = localDataEnvelopeSchema.safeParse(input);

  if (!parsed.success) {
    return createEmptyLocalDataEnvelope();
  }

  return parsed.data;
}

export function validateLocalDataEnvelope(input: unknown):
  | { success: true; data: LocalDataEnvelope }
  | { success: false; error: string } {
  const parsed = localDataEnvelopeSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "JSON yedegi Carbonly yerel veri semasi ile uyumlu degil."
    };
  }

  return {
    success: true,
    data: parsed.data
  };
}

export function serializeLocalDataEnvelope(envelope: LocalDataEnvelope): string {
  return JSON.stringify(envelope, null, 2);
}
