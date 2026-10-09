"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculateEmissionsKgCo2e, toFactorSnapshot } from "@/lib/calculations/emissions";
import { getDemoFactorForCategory } from "@/lib/emission-factors/demo-factors";
import { createSampleRecords } from "@/lib/storage/sample-data";
import {
  createEmptyLocalDataEnvelope,
  LOCAL_DATA_STORAGE_KEY,
  parseLocalDataEnvelope,
  serializeLocalDataEnvelope
} from "@/lib/storage/local-data";
import type { ActivityCategory, ActivityRecord, ActivityUnit, LocalDataEnvelope } from "@/lib/types";

type AddRecordInput = {
  category: ActivityCategory;
  amount: number;
  unit: ActivityUnit;
  activityDate: string;
  description?: string;
};

export function useActivityRecords() {
  const [envelope, setEnvelope] = useState<LocalDataEnvelope>(() =>
    createEmptyLocalDataEnvelope()
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = window.localStorage.getItem(LOCAL_DATA_STORAGE_KEY);

      if (!raw) {
        setIsLoaded(true);
        return;
      }

      try {
        setEnvelope(parseLocalDataEnvelope(JSON.parse(raw)));
      } catch {
        setEnvelope(createEmptyLocalDataEnvelope());
      } finally {
        setIsLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(
      LOCAL_DATA_STORAGE_KEY,
      serializeLocalDataEnvelope(envelope)
    );
  }, [envelope, isLoaded]);

  const records = envelope.records;

  const addRecord = useCallback((input: AddRecordInput) => {
    const factor = getDemoFactorForCategory(input.category);
    const emissionsKgCo2e = calculateEmissionsKgCo2e({
      amount: input.amount,
      unit: input.unit,
      factor
    });
    const now = new Date().toISOString();
    const record: ActivityRecord = {
      id: crypto.randomUUID(),
      category: input.category,
      amount: input.amount,
      unit: input.unit,
      activityDate: input.activityDate,
      description: input.description || undefined,
      factorId: factor.id,
      factorSnapshot: toFactorSnapshot(factor),
      emissionsKgCo2e,
      createdAt: now
    };

    setEnvelope((current) => ({
      ...current,
      records: [record, ...current.records],
      updatedAt: now
    }));

    return record;
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setEnvelope((current) => ({
      ...current,
      records: current.records.filter((record) => record.id !== id),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const clearRecords = useCallback(() => {
    setEnvelope(createEmptyLocalDataEnvelope());
  }, []);

  const loadSampleRecords = useCallback(() => {
    setEnvelope({
      schemaVersion: 1,
      records: createSampleRecords(),
      updatedAt: new Date().toISOString()
    });
  }, []);

  return useMemo(
    () => ({
      records,
      isLoaded,
      addRecord,
      deleteRecord,
      clearRecords,
      loadSampleRecords
    }),
    [addRecord, clearRecords, deleteRecord, isLoaded, loadSampleRecords, records]
  );
}
