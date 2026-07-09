# Agent Guide

This repo is a Vite + React portfolio being redesigned around an akryst.moe-inspired direction.

## Read First

Start with [docs/README.md](docs/README.md). It explains the planning docs and the order to use them.

## Non-Negotiables

- Keep the existing stack unless a doc explicitly says otherwise: Vite, React, Tailwind, Framer Motion, Lenis, Lucide.
- Use akryst.moe as visual reference only. Do not copy its source, assets, character art, or identity.
- Target style: cinematic dark, image-led, soft glassmorphism, thin borders, small metadata, personal archive mood.
- Required site features: guestbook, project showcase page, featured repo/project on home, view counter via Abacus or equivalent, blog page, resume route that redirects to the CV file.
- Keep docs updated when implementation decisions change.

## Working Order

1. Read [docs/product/project_rules.md](docs/product/project_rules.md).
2. Read [docs/product/system_overview.md](docs/product/system_overview.md).
3. Read the relevant category doc before editing code.
4. Make the smallest working change.
5. Run `npm run build` and `npm run lint` when the change touches React, CSS, routing, or data fetching.

## Implementation Bias

- Prefer existing components and dependencies.
- Prefer native browser APIs over new packages.
- Add a new dependency only after [docs/dependencies/dependency_rules.md](docs/dependencies/dependency_rules.md) allows it.
- Use real content and assets when available; do not ship empty placeholder sections.
