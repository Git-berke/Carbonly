export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex max-w-5xl flex-col gap-4">
        <p className="text-sm font-medium text-emerald-600">Carbonly MVP</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Karbon emisyonu hesaplama ve analiz paneli
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Kurulum tamamlandi. Siradaki adimda mimari klasorleri, hesaplama
          motoru, yerel veri saklama ve ekranlari adim adim ekleyecegiz.
        </p>
      </section>
    </main>
  );
}
