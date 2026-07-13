# caursty

Catur Setyo Ragil's personal portfolio, built with Vite and React and deployed on Cloudflare Pages.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The guestbook requires these public Supabase values:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

## Verification

```bash
npm run lint
npm run build
```

Cloudflare Pages builds `main` with `npm run build` and publishes `dist/`.
