# Carbonly

Carbonly, giris gerektirmeyen karbon emisyonu hesaplama ve analiz MVP'sidir.
Ziyaretciler elektrik, dogal gaz, dizel ve benzin tuketimlerini girerek
tahmini kg CO2e sonucunu gorebilir, kayitlarini analiz edebilir ve verilerini
CSV/JSON olarak disa aktarabilir.

## Ozellikler

- Auth yok: login, signup, profil veya hesap olusturma bulunmaz.
- Dashboard: toplam emisyon, ton CO2e, Scope 1 / Scope 2, aylik trend,
  kategori dagilimi ve son kayitlar.
- Hesaplayici: elektrik, dogal gaz, dizel ve benzin icin demo faktorlerle
  kg CO2e hesaplama.
- Analizler: tarih filtresi, Scope dagilimi, kategori karsilastirmasi ve
  responsive Recharts grafikleri.
- Emisyon faktorleri: faktor degeri, birim, kaynak, bolge, yil, demo durumu ve
  metodoloji notu.
- Yerel veri: kullanici faaliyet kayitlari localStorage icinde saklanir.
- CSV disa aktarma, JSON yedek alma ve JSON yedekten ice aktarma.
- Light/dark tema, desktop sidebar ve mobil alt navigasyon.

## Mimari

```text
app/                 Next.js App Router rotalari
components/          UI, shell, grafik ve client ekran bilesenleri
hooks/               Tarayici localStorage veri akisi
lib/calculations/    Saf emisyon hesaplama ve toplama fonksiyonlari
lib/storage/         Local data semasi, CSV/JSON ve ornek veri
lib/validation/      Zod semalari
lib/emission-factors Demo faktorler ve veritabani repository katmani
prisma/              PostgreSQL referans faktor modeli, migration ve seed
tests/               Vitest unit testleri
```

Kullanici faaliyet kayitlari sunucuya gonderilmez. PostgreSQL yalnizca herkese
acik emisyon faktoru referans verisi icindir.

## Gelistirme

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde calisir. `DATABASE_URL` tanimli
degilse uygulama acikca demo emisyon faktorleriyle calisir.

## Kontrol Komutlari

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Tek komutla tum kontroller:

```bash
npm run verify
```

## Ortam Degiskenleri

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
```

`DATABASE_URL` opsiyoneldir. Tanimsizsa `/emission-factors` demo faktor modunda
calisir. Production ortaminda Neon PostgreSQL kullanilacaksa `DATABASE_URL`
yalnizca server environment variable olarak tanimlanmalidir; istemciye
aciklanmaz.

## Neon PostgreSQL Kurulumu

1. Neon'da yeni bir PostgreSQL projesi olusturun.
2. Pooled connection string degerini kopyalayin.
3. Yerelde `.env` dosyasina `DATABASE_URL=...` ekleyin.
4. Prisma Client uretin:

```bash
npm run db:generate
```

5. Migration'i uygulayin:

```bash
npm run db:deploy
```

6. Demo faktor seed verisini yukleyin:

```bash
npm run db:seed
```

Gelistirme sirasinda yeni migration uretmek gerekirse:

```bash
npm run db:migrate
```

## Vercel Yayinlama

1. GitHub reposunu Vercel'e import edin.
2. Framework preset olarak Next.js secili kalabilir.
3. Build command: `npm run build`
4. Install command: `npm install`
5. Neon kullanilacaksa Vercel Project Settings > Environment Variables alanina
   `DATABASE_URL` ekleyin.
6. Ilk deploy oncesi veya sonrasinda Neon'a migration ve seed uygulayin:

```bash
npm run db:deploy
npm run db:seed
```

Database kullanmadan yayinlanirsa uygulama acik demo faktor modu ile calisir.

## Deploy Sonrasi Smoke Test

- `/` aciliyor mu?
- `/calculator` icinde 10 kWh elektrik girince 5 kg CO2e sonucu gorunuyor mu?
- Kayit eklendikten sonra dashboard ve analytics guncelleniyor mu?
- Sayfa yenilenince localStorage kayitlari korunuyor mu?
- CSV indir, JSON yedek indir ve JSON ice aktar akislari calisiyor mu?
- `/emission-factors` faktorleri ve demo/veritabani modunu gosteriyor mu?

## Sinirlar

- Demo faktorlerle uretilen sonuclar temsili olup mevzuat uyumu icin
  kullanilamaz.
- Elektrik Scope 2 kabul edilir.
- Dogal gaz, dizel ve benzin yalnizca sahip olunan veya kontrol edilen ekipmanda
  dogrudan yakim varsayimiyla Scope 1 kabul edilir.
- Scope 3, sertifikali kurumsal envanter, CBAM uyum beyani ve kullanici hesabi
  kapsam disidir.
- Tarayici verisi temizlenirse localStorage kayitlari kaybolabilir; JSON yedegi
  alinmalidir.
