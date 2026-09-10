# Mật Ong Phan Thiết — Shop

Cửa hàng mật ong & nông sản (design Figma Make) với admin và thanh toán SePay QR.

## Stack

- Next.js App Router + Tailwind CSS v4
- Prisma + SQLite
- SePay personal webhook + VietQR

## Chạy local

```bash
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

- Cửa hàng: http://localhost:3000
- Admin: http://localhost:3000/admin (mặc định mật khẩu `admin123`)

## SePay

Cấu hình trong `.env`:

- `SEPAY_BANK_BIN`, `SEPAY_BANK_ACCOUNT`, `SEPAY_ACCOUNT_NAME`, `SEPAY_BANK_NAME`
- `SEPAY_TRANSFER_PREFIX` (mặc định `SEVQR`)
- `SEPAY_WEBHOOK_API_KEY` — webhook URL: `POST /api/webhooks/sepay` (header `Authorization: Apikey <key>`)

Checkout chọn **Chuyển khoản online (SePay QR)** → trang `/pay/[id]` hiện QR và poll trạng thái.
