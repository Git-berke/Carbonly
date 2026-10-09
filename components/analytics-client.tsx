"use client";

import { BarChart3, CalendarRange, PieChart } from "lucide-react";
import { useMemo, useState } from "react";
import {
  aggregateByMonth,
  filterRecordsByDateRange,
  sumByCategory,
  sumByScope
} from "@/lib/calculations/aggregation";
import { formatCategory, formatKgCo2e } from "@/lib/format";
import { useActivityRecords } from "@/hooks/use-activity-records";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function AnalyticsClient() {
  const { records } = useActivityRecords();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const filteredRecords = useMemo(
    () =>
      filterRecordsByDateRange(records, {
        from: from || undefined,
        to: to || undefined
      }),
    [from, records, to]
  );
  const scopeTotals = sumByScope(filteredRecords);
  const categoryTotals = sumByCategory(filteredRecords);
  const monthlyTotals = aggregateByMonth(filteredRecords);
  const maxMonthly = Math.max(
    0,
    ...monthlyTotals.map((item) => item.emissionsKgCo2e)
  );
  const maxCategory = Math.max(0, ...Object.values(categoryTotals));

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge tone="emerald">Analizler</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Emisyon analitigi
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Tarih araligi, Scope 1 / Scope 2 dagilimi, kategori toplamlari ve
            aylik trendler yerel kayitlardan hesaplanir.
          </p>
        </div>
        <div className="grid gap-2 rounded-lg border border-border bg-surface p-3 text-sm md:grid-cols-2">
          <label className="grid gap-1">
            Baslangic
            <input
              className="h-9 rounded-md border border-border bg-background px-3"
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </label>
          <label className="grid gap-1">
            Bitis
            <input
              className="h-9 rounded-md border border-border bg-background px-3"
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Metric
          title="Scope 1"
          value={formatKgCo2e(scopeTotals.scope1)}
          icon={BarChart3}
        />
        <Metric
          title="Scope 2"
          value={formatKgCo2e(scopeTotals.scope2)}
          icon={PieChart}
        />
        <Metric
          title="Kayit sayisi"
          value={`${filteredRecords.length}`}
          icon={CalendarRange}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Aylik trend</CardTitle>
            <CardDescription>
              Secili tarih araligindaki aylik toplam kg CO2e.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyTotals.length > 0 ? (
              <div className="space-y-3">
                {monthlyTotals.map((point) => (
                  <MeterRow
                    key={point.month}
                    label={point.month}
                    max={maxMonthly}
                    value={point.emissionsKgCo2e}
                  />
                ))}
              </div>
            ) : (
              <EmptyChart label="Trend verisi bekleniyor" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kategori dagilimi</CardTitle>
            <CardDescription>
              Secili araliktaki kategori toplamlari.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRecords.length > 0 ? (
              <div className="space-y-3">
                {Object.entries(categoryTotals).map(([category, value]) => (
                  <MeterRow
                    key={category}
                    label={formatCategory(category)}
                    max={maxCategory}
                    value={value}
                  />
                ))}
              </div>
            ) : (
              <EmptyChart label="Dagilim verisi bekleniyor" />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({
  title,
  value,
  icon: Icon
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        <Icon className="size-5 text-emerald-600" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

function MeterRow({
  label,
  value,
  max
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = max > 0 ? Math.max((value / max) * 100, 4) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{formatKgCo2e(value)}</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-emerald-600"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
      {label}
    </div>
  );
}
