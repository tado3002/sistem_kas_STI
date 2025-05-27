# Sistem Kas STI

Proyek ini adalah backend sistem kas berbasis Node.js menggunakan framework NestJS dan ORM Prisma. Didesain untuk manajemen kas mahasiswa, aplikasi ini menyediakan API yang dapat diintegrasikan dengan berbagai frontend.

## Teknologi yang Digunakan

- [Node.js](https://nodejs.org/) (v20+)
- [NestJS](https://nestjs.com/) (v10+)
- [Prisma ORM](https://www.prisma.io/) (v6+)
- [PostgreSQL/MySQL/SQLite] (Sesuai konfigurasi Prisma)
- [pnpm](https://pnpm.io/) (Package manager)
- Docker (optional, untuk containerization)

## Pra-instalasi

1. **Pastikan sudah menginstall:**
   - Node.js (v20 atau lebih baru)
   - pnpm (`npm install -g pnpm`)
   - Database (PostgreSQL/MySQL/SQLite)
   
2. **Konfigurasi Environment Variable:**
   - Copy `.env.example` ke `.env` dan sesuaikan dengan database & konfigurasi lain.

3. **Sync Skema Prisma dengan Database:**
   ```bash
   pnpm prisma generate
   pnpm prisma migrate deploy # atau migrate dev sesuai kebutuhan
   ```

4. **Seed Database (Akun Demo):**
   - Script seed terdapat pada `prisma/seed.ts`. Akun demo akan diinsert otomatis saat seed dijalankan.
   - Untuk menjalankan seed:
     ```bash
     pnpm prisma db seed
     ```
   - Username demo: `Muhammad Murtadlo` (NIM: 24121026)
   - Password: Gunakan value dari environment variable `PASSWORD_SEEDER` saat menjalankan seed.

## Instalasi

```bash
pnpm install
```

## Menjalankan Aplikasi

### Mode Development

```bash
pnpm run start:dev
```

### Mode Production

```bash
pnpm run build
pnpm run start:prod
```

### Menjalankan dengan Docker

1. Pastikan Docker sudah terinstal.
2. Build dan jalankan container:
   ```bash
   docker build -t sistem-kas-sti .
   docker run -p 3000:3000 --env-file .env sistem-kas-sti
   ```

## Spesifikasi API

Dokumentasi lengkap endpoint API dapat dilihat di folder `doc` (atau sesuaikan dengan dokumentasi yang Anda miliki). Beberapa endpoint utama meliputi:

- Autentikasi & otorisasi (JWT)
- Manajemen user & mahasiswa
- Transaksi kas
- dll.

> **Catatan:** Pastikan untuk menyesuaikan isi bagian ini dengan dokumentasi API terbaru Anda.

## Testing

```bash
pnpm run test        # Unit test
pnpm run test:e2e    # End-to-end test
pnpm run test:cov    # Coverage
```

## Author

- Muhammad Murtadlo | [tado3002](https://github.com/tado3002)

---

