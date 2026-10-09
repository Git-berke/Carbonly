import { CalendarDays, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { DEMO_EMISSION_FACTORS } from "@/lib/emission-factors/demo-factors";

export default function CalculatorPage() {
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
              Form baglantisi sonraki adimda localStorage kayit akisi ile
              etkinlestirilecek.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Kategori
                <select className="h-10 rounded-md border border-border bg-background px-3 text-sm">
                  <option>Elektrik</option>
                  <option>Dogal gaz</option>
                  <option>Dizel</option>
                  <option>Benzin</option>
                </select>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Tuketim miktari
                  <input
                    className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                    min="0"
                    placeholder="10"
                    type="number"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Birim
                  <select className="h-10 rounded-md border border-border bg-background px-3 text-sm">
                    <option>kWh</option>
                    <option>m3</option>
                    <option>L</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                Tuketim tarihi
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 pl-10 text-sm"
                    type="date"
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Aciklama
                <textarea
                  className="min-h-24 rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Opsiyonel not"
                />
              </label>
              <Button type="button">Hesapla ve kaydet</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sonuc</CardTitle>
            <CardDescription>
              Gecerli bir faaliyet girildiginde kg CO2e sonucu burada gorunur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed border-border bg-muted p-6 text-sm text-muted-foreground">
              Henuz hesaplama yapilmadi.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kullanilan demo faktorler</CardTitle>
            <CardDescription>
              Sonuclar temsili olup mevzuat uyumu icin kullanilamaz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_EMISSION_FACTORS.map((factor) => (
              <div
                className="rounded-md border border-border bg-background p-3"
                key={factor.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{factor.category}</p>
                  <Badge tone="amber">Demo</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {factor.value} {factor.numeratorUnit}/{factor.denominatorUnit}
                </p>
              </div>
            ))}
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
