import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getEmissionFactors } from "@/lib/emission-factors/repository";

export default async function EmissionFactorsPage() {
  const { factors, mode } = await getEmissionFactors();

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <section>
        <Badge tone={mode === "demo" ? "amber" : "emerald"}>
          {mode === "demo" ? "Demo faktor modu" : "Veritabani faktorleri"}
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal">
          Emisyon faktorleri
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Hesaplayicida kullanilan faktor degeri, birim, kaynak, bolge, yil ve
          metodoloji notlari burada seffaf bicimde listelenir.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Faktor katalogu</CardTitle>
          <CardDescription>
            Demo faktorlerle uretilen sonuclar temsili olup uyum raporu yerine
            gecmez.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Kategori</th>
                  <th className="py-3 pr-4 font-medium">Faktor</th>
                  <th className="py-3 pr-4 font-medium">Scope</th>
                  <th className="py-3 pr-4 font-medium">Kaynak</th>
                  <th className="py-3 pr-4 font-medium">Bolge</th>
                  <th className="py-3 pr-4 font-medium">Yil</th>
                  <th className="py-3 pr-4 font-medium">Durum</th>
                </tr>
              </thead>
              <tbody>
                {factors.map((factor) => (
                  <tr className="border-b border-border" key={factor.id}>
                    <td className="py-4 pr-4 font-medium">{factor.category}</td>
                    <td className="py-4 pr-4">
                      {factor.value} {factor.numeratorUnit}/
                      {factor.denominatorUnit}
                    </td>
                    <td className="py-4 pr-4">{factor.scope}</td>
                    <td className="py-4 pr-4">{factor.sourceName}</td>
                    <td className="py-4 pr-4">{factor.region}</td>
                    <td className="py-4 pr-4">{factor.publicationYear}</td>
                    <td className="py-4 pr-4">
                      <Badge tone={factor.isDemo ? "amber" : "emerald"}>
                        {factor.isDemo ? "Demo" : "Dogrulanmis"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
