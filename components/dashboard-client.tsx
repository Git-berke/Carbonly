"use client";

import { Activity, Flame, PlugZap, Trash2, TrendingUp } from "lucide-react";
import {
  aggregateByMonth,
  sumByCategory,
  sumByScope
} from "@/lib/calculations/aggregation";
import { formatCategory, formatKgCo2e, formatTonnesCo2e } from "@/lib/format";
import { useActivityRecords } from "@/hooks/use-activity-records";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function DashboardClient() {
  const { records, loadSampleRecords, clearRecords, deleteRecord } =
    useActivityRecords();
  const totalKg = records.reduce(
    (total, record) => total + record.emissionsKgCo2e,
    0
  );
  const scopeTotals = sumByScope(records);
  const categoryTotals = sumByCategory(records);
  const monthlyTotals = aggregateByMonth(records);
  const recentRecords = records.slice(0, 5);
  const maxMonthly = Math.max(
    0,
    ...monthlyTotals.map((item) => item.emissionsKgCo2e)
  );
  const maxCategory = Math.max(0, ...Object.values(categoryTotals));

  const summaryCards = [
    {
      title: "Toplam emisyon",
      value: formatKgCo2e(totalKg),
      detail: formatTonnesCo2e(totalKg),
      icon: Activity
    },
    {
      title: "Scope 1",
      value: formatKgCo2e(scopeTotals.scope1),
      detail: "Dogal gaz, dizel, benzin",
      icon: Flame
    },
    {
      title: "Scope 2",
      value: formatKgCo2e(scopeTotals.scope2),
      detail: "Elektrik tuketimi",
      icon: PlugZap
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col gap-3">
        <Badge tone={records.length > 0 ? "emerald" : "amber"} className="w-fit">
          {records.length > 0 ? "Yerel veri aktif" : "Bos veri durumu"}
        </Badge>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Toplam emisyon, Scope 1 / Scope 2 dagilimi, aylik trend ve son
              faaliyetler tarayicinizdaki kayitlardan hesaplanir.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" type="button" onClick={loadSampleRecords}>
              Ornek veri yukle
            </Button>
            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={clearRecords}
            >
              Verileri temizle
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{card.title}</CardTitle>
              <card.icon className="size-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{card.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {card.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Aylik emisyon trendi</CardTitle>
            <CardDescription>
              Kayit tarihine gore aylik toplam kg CO2e.
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
              <EmptyState label="Henuz kayit yok" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kategori dagilimi</CardTitle>
            <CardDescription>
              Elektrik, dogal gaz, dizel ve benzin karsilastirmasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {records.length > 0 ? (
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
              <EmptyState label="Kategori verisi bekleniyor" />
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Son faaliyet kayitlari</CardTitle>
            <CardDescription>
              Kaydettiginiz hesaplamalar cihazinizda saklanir.
            </CardDescription>
          </div>
          <TrendingUp className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentRecords.length > 0 ? (
            <div className="divide-y divide-border rounded-md border border-border">
              {recentRecords.map((record) => (
                <div
                  className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
                  key={record.id}
                >
                  <div>
                    <p className="font-medium">
                      {formatCategory(record.category)} -{" "}
                      {formatKgCo2e(record.emissionsKgCo2e)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {record.activityDate} · {record.amount} {record.unit}
                    </p>
                  </div>
                  <Button
                    aria-label="Kaydi sil"
                    size="icon"
                    type="button"
                    variant="ghost"
                    onClick={() => deleteRecord(record.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState label="Henuz faaliyet kaydi bulunmuyor." />
          )}
        </CardContent>
      </Card>
    </div>
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

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-border bg-muted p-6 text-sm text-muted-foreground">
      {label}
    </div>
  );
}
