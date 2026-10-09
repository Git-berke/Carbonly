"use client";

import { BarChart3, CalendarRange, PieChart } from "lucide-react";
import { useMemo, useState } from "react";
import {
  aggregateByMonth,
  filterRecordsByDateRange,
  sumByCategory,
  sumByScope
} from "@/lib/calculations/aggregation";
import { formatKgCo2e } from "@/lib/format";
import { useActivityRecords } from "@/hooks/use-activity-records";
import {
  CategoryEmissionsChart,
  MonthlyEmissionsChart,
  ScopeEmissionsChart
} from "@/components/charts/emissions-charts";
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
  const scopeChartData = [
    { scope: "scope1" as const, emissionsKgCo2e: scopeTotals.scope1 },
    { scope: "scope2" as const, emissionsKgCo2e: scopeTotals.scope2 }
  ].filter((item) => item.emissionsKgCo2e > 0);
  const categoryChartData = Object.entries(categoryTotals)
    .map(([category, emissionsKgCo2e]) => ({
      category: category as keyof typeof categoryTotals,
      emissionsKgCo2e
    }))
    .filter((item) => item.emissionsKgCo2e > 0);

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
              <MonthlyEmissionsChart data={monthlyTotals} />
            ) : (
              <EmptyChart label="Trend verisi bekleniyor" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scope dagilimi</CardTitle>
            <CardDescription>
              Scope 1 ve Scope 2 toplamlarinin karsilastirmasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scopeChartData.length > 0 ? (
              <ScopeEmissionsChart data={scopeChartData} />
            ) : (
              <EmptyChart label="Dagilim verisi bekleniyor" />
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Kategori karsilastirmasi</CardTitle>
          <CardDescription>
            Secili araliktaki elektrik, dogal gaz, dizel ve benzin toplamlari.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categoryChartData.length > 0 ? (
            <CategoryEmissionsChart data={categoryChartData} />
          ) : (
            <EmptyChart label="Kategori verisi bekleniyor" />
          )}
        </CardContent>
      </Card>
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

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
      {label}
    </div>
  );
}
