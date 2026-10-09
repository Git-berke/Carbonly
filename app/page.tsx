import { Activity, Flame, PlugZap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const summaryCards = [
  {
    title: "Toplam emisyon",
    value: "0 kg CO2e",
    detail: "0.00 ton CO2e",
    icon: Activity
  },
  {
    title: "Scope 1",
    value: "0 kg CO2e",
    detail: "Dogal gaz, dizel, benzin",
    icon: Flame
  },
  {
    title: "Scope 2",
    value: "0 kg CO2e",
    detail: "Elektrik tuketimi",
    icon: PlugZap
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col gap-3">
        <Badge tone="amber" className="w-fit">
          Ornek veri modu hazirlanacak
        </Badge>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Kayit ekledikce toplam emisyon, Scope 1 / Scope 2 dagilimi,
              aylik trend ve son faaliyetler burada guncellenecek.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
            Veriler yalnizca tarayici localStorage alaninda tutulur.
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
              Hesaplama kayitlari eklendiginde grafik burada gorunecek.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
              Henuz kayit yok
            </div>
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
            <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
              Kategori verisi bekleniyor
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Son faaliyet kayitlari</CardTitle>
            <CardDescription>
              Kaydettiginiz hesaplamalar burada listelenecek.
            </CardDescription>
          </div>
          <TrendingUp className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed border-border bg-muted p-6 text-sm text-muted-foreground">
            Henuz faaliyet kaydi bulunmuyor.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
