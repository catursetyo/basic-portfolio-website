# ADR 006 — Deploy with Cloudflare Pages

Status: Accepted

## Context

The portfolio is a static Vite application. Its host needs Git-based builds, public build-time variables, custom domains, and SPA route fallback without a separate runtime.

## Decision

Use Cloudflare Pages. Build `main` with `npm run build`, publish `dist/`, and use Pages' built-in SPA fallback. Keep Supabase as the independent guestbook backend.

## Consequences

- Deployment configuration lives in Cloudflare rather than a repository workflow.
- `caursty.dev` and `www.caursty.dev` are managed through Cloudflare DNS.
- No host-specific fallback file or deployment dependency is required in the repository.

## Revisit When

Revisit only if measured platform limits or availability problems affect the portfolio.
