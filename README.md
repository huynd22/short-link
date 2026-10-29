# Short Link

URL shortener đơn giản chạy trên Vercel. Nhập 1 link → tạo link ngắn → truy cập link ngắn sẽ **302 redirect** về link gốc. Mọi người bấm đều tới cùng một đích.

## Cấu trúc

- `app/page.tsx` — form nhập link
- `app/api/shorten/route.ts` — tạo code, lưu mapping vào Redis
- `app/[code]/route.ts` — tra code → 302 redirect
- `lib/redis.ts` — kết nối Upstash Redis
- `lib/url.ts` — validate link (chỉ cho http/https)

## Chạy local

1. Tạo 1 database Redis miễn phí ở [Upstash](https://console.upstash.com).
2. Copy `.env.example` thành `.env.local`, điền `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN`.
3. Cài và chạy:

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Deploy lên Vercel

1. Push repo này lên GitHub.
2. Vào [vercel.com](https://vercel.com) → New Project → import repo.
3. Trong tab **Storage**, thêm **Upstash Redis** (hoặc tự set 2 env var ở phần Settings → Environment Variables).
4. Deploy.

Link ngắn sẽ có dạng `https://<app>.vercel.app/<code>`. Muốn dùng domain riêng thì thêm Custom Domain trong Vercel.
