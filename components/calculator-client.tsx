"use client";

import { CalendarDays, CheckCircle2, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateEmissionsKgCo2e } from "@/lib/calculations/emissions";
import { getDemoFactorForCategory } from "@/lib/emission-factors/demo-factors";
import { formatCategory, formatKgCo2e, formatScope } from "@/lib/format";
import { useActivityRecords } from "@/hooks/use-activity-records";
import type { ActivityCategory } from "@/lib/types";
import { activityInputSchema } from "@/lib/validation/activity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const categories: ActivityCategory[] = [
  "electricity",
  "natural_gas",
  "diesel",
  "gasoline"
];

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function CalculatorClient() {
  const { addRecord } = useActivityRecords();
  const [category, setCategory] = useState<ActivityCategory>("electricity");
  const [amount, setAmount] = useState("");
  const [activityDate, setActivityDate] = useState(getTodayInputValue);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const factor = getDemoFactorForCategory(category);
  const numericAmount = Number(amount);
  const preview = useMemo(() => {
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return null;
    }

    return calculateEmissionsKgCo2e({
      amount: numericAmount,
      unit: factor.denominatorUnit,
      factor
    });
  }, [factor, numericAmount]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedMessage(null);

    const parsed = activityInputSchema.safeParse({
      category,
      amount: numericAmount,
      unit: factor.denominatorUnit,
      activityDate,
      description: description.trim() || undefined
    });

    if (!parsed.success) {
      setError("Lutfen pozitif bir miktar ve gecerli tarih girin.");
      return;
    }

    const record = addRecord(parsed.data);
    setError(null);
    setSavedMessage(`${formatKgCo2e(record.emissionsKgCo2e)} kaydedildi.`);
    setAmount("");
    setDescription("");
  }

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-0">
      <section className="space-y-4">
        <div>
          <Badge tone="emerald">Hesaplayici</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Karbon emisyonu hesapla
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Elektrik Scope 2 olarak, dogal gaz, dizel ve benzin ise sahip
            olunan veya kontrol edilen ekipmanda dogrudan yakim varsayimiyla
            Scope 1 olarak siniflandirilir.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Faaliyet bilgisi</CardTitle>
            <CardDescription>
              Girdiler tarayicinizdaki yerel veri alanina kaydedilir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium">
                Kategori
                <select
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as ActivityCategory)
                  }
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {formatCategory(item)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Tuketim miktari
                  <input
                    className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                    min="0"
                    placeholder="10"
                    step="0.01"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Birim
                  <input
                    className="h-10 rounded-md border border-border bg-muted px-3 text-sm"
                    readOnly
                    value={factor.denominatorUnit}
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                Tuketim tarihi
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 pl-10 text-sm"
                    type="date"
                    value={activityDate}
                    onChange={(event) => setActivityDate(event.target.value)}
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Aciklama
                <textarea
                  className="min-h-24 rounded-md border border-border bg-background px-3 py-2 text-sm"
                  maxLength={240}
                  placeholder="Opsiyonel not"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {savedMessage ? (
                <p className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="size-4" />
                  {savedMessage}
                </p>
              ) : null}
              <Button type="submit">Hesapla ve kaydet</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sonuc</CardTitle>
            <CardDescription>
              Gecerli miktar girildiginde kg CO2e sonucu aninda hesaplanir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {preview ? (
              <div className="rounded-lg border border-border bg-background p-5">
                <p className="text-3xl font-semibold">
                  {formatKgCo2e(preview)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {amount} {factor.denominatorUnit} x {factor.value}{" "}
                  {factor.numeratorUnit}/{factor.denominatorUnit}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone="emerald">{formatScope(factor.scope)}</Badge>
                  <Badge tone="amber">Demo faktor</Badge>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted p-6 text-sm text-muted-foreground">
                Henuz hesaplama yapilmadi.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kullanilan faktor</CardTitle>
            <CardDescription>
              Sonuclar temsili olup mevzuat uyumu icin kullanilamaz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">{formatCategory(category)}</p>
                <Badge tone="amber">Demo</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {factor.value} {factor.numeratorUnit}/{factor.denominatorUnit}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {factor.methodologyNote}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-emerald-600" />
          <p>
            Uygulama tam kurumsal karbon ayak izi veya Scope 3 hesaplama
            iddiasi tasimaz.
          </p>
        </div>
      </aside>
    </div>
  );
}
