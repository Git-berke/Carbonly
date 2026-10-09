# Carbonly

Carbonly, giris gerektirmeyen karbon emisyonu hesaplama ve analiz uygulamasidir.

Bu repo Next.js App Router, TypeScript, Tailwind CSS, Prisma ve Vitest ile
Vercel'e hazir bir MVP olarak gelistirilmektedir.

## Gelistirme

```bash
npm install
npm run dev
```

`DATABASE_URL` tanimli degilse uygulama acikca demo emisyon faktorleriyle
calisir. Neon PostgreSQL kullanirken `.env.example` dosyasindaki degiskeni
Vercel ve yerel ortamda tanimlayin.

## Kontrol komutlari

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Neon PostgreSQL kurulumu

1. Neon'da yeni bir PostgreSQL projesi olusturun.
2. Connection string degerini `DATABASE_URL` olarak kopyalayin.
3. Yerelde `.env` dosyasina `DATABASE_URL=...` ekleyin.
4. Prisma semasini veritabanina uygulayin:

```bash
npm run db:migrate
npm run db:seed
```

Kullanici faaliyet kayitlari veritabanina yazilmaz. PostgreSQL yalnizca
herkese acik emisyon faktoru referans verisi icindir.

## Vercel yayinlama

1. GitHub reposunu Vercel'e import edin.
2. Framework preset olarak Next.js secili kalabilir.
3. Neon kullanilacaksa Vercel Project Settings > Environment Variables alanina
   `DATABASE_URL` ekleyin.
4. Database kullanmadan yayinlanirsa uygulama acik demo faktor modu ile
   calisir.
5. Deploy sonrasi `/`, `/calculator`, `/analytics` ve `/emission-factors`
   rotalarini kontrol edin.

## Notlar

- Giris, kayit, kullanici hesabi veya profil yoktur.
- Hesaplama kayitlari tarayicinin localStorage alaninda saklanir.
- Tarayici verisi temizlenirse kayitlar kaybolabilir; JSON yedegi alin.
- Demo faktorlerle uretilen sonuclar temsili olup mevzuat uyumu icin
  kullanilamaz.
