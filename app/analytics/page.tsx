import { BarChart3, CalendarRange, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge tone="emerald">Analizler</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Emisyon analitigi
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Tarih araligi, Scope 1 / Scope 2 dagilimi, kategori toplamları ve
            aylik trendler bu ekranda incelenecek.
          </p>
        </div>
        <div className="grid gap-2 rounded-lg border border-border bg-surface p-3 text-sm md:grid-cols-2">
          <label className="grid gap-1">
            Baslangic
            <input
              className="h-9 rounded-md border border-border bg-background px-3"
              type="date"
            />
          </label>
          <label className="grid gap-1">
            Bitis
            <input
              className="h-9 rounded-md border border-border bg-background px-3"
              type="date"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Metric title="Scope 1" value="0 kg CO2e" icon={BarChart3} />
        <Metric title="Scope 2" value="0 kg CO2e" icon={PieChart} />
        <Metric title="Secili aralik" value="Tum zamanlar" icon={CalendarRange} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Aylik trend</CardTitle>
            <CardDescription>
              Kayitlar eklendiginde responsive grafik burada gorunecek.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyChart label="Trend verisi bekleniyor" />
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
            <EmptyChart label="Dagilim verisi bekleniyor" />
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

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
      {label}
    </div>
  );
}
