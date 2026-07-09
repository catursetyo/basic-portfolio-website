# Dependency Rules

## Keep

These are already installed and enough for the redesign:

- `react`
- `react-dom`
- `vite`
- `tailwindcss`
- `framer-motion`
- `lenis`
- `lucide-react`
- `clsx`
- `tailwind-merge`
- `@fontsource/space-grotesk`

## Avoid

Do not add these for V1:

- Next.js migration.
- Full UI kits.
- Shadcn registry components.
- GSAP.
- Three.js.
- CMS packages.
- Router library unless the native route switch becomes annoying.

## Allowed External Services

- Abacus for view counting.
- A persistence service for guestbook.
- Static file hosting for CV through `public/`.

## Guestbook Dependency Rule

Guestbook persistence needs a service. Preferred order:

1. Browser `fetch` to a simple public REST endpoint with row-level rules.
2. Giscus or another hosted comment widget if custom persistence is not available.
3. A small backend/API route only if a secret key is required.

Do not add a frontend SDK unless plain `fetch` becomes worse than the SDK.

## New Dependency Approval

Add a dependency only when all are true:

- Existing stack cannot do it cleanly.
- Native browser APIs cannot do it cleanly.
- The package removes more code than it adds.
- It is used immediately in shipped code.
