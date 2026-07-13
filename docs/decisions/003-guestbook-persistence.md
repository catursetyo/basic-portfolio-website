# ADR 003 — Require Shared Persistence for Guestbook

Status: Accepted; production verification pending

## Context

The current guestbook stores messages, replies, and likes in `localStorage`. That behavior is useful for UI prototyping but each visitor sees separate data.

A public guestbook contains untrusted shared content and therefore needs validation, moderation, abuse prevention, and persistence.

## Decision

Do not present the localStorage prototype as a live guestbook.

Before public launch, implement:

- shared database persistence,
- server-side validation,
- moderation,
- rate limiting,
- anonymous like deduplication,
- loading and failure states.

Use Supabase Auth, PostgreSQL functions, and RLS-backed tables. Visitors receive anonymous Auth identities; the owner signs in by magic link. The browser may execute only the granted RPC functions and cannot access the guestbook tables directly.

Owner privileges are intentionally available inline in the homepage guestbook. Do not add an admin dashboard until moderation volume makes one necessary.

## Alternatives

### Keep localStorage

Rejected for production because data is not shared or moderated.

### Remove guestbook permanently

Still an option if backend work is not worth the portfolio value.

### Hosted comment widget

Acceptable fallback if it supports the required behavior and visual integration without excessive privacy or branding tradeoffs.

### Custom API server

Rejected for V1 because Supabase Auth and database functions cover the required identity, validation, persistence, and authorization with less application code.

## Consequences

- Production activation requires a Supabase project, migration, owner Auth account, redirect allowlist, anonymous sign-in, and CAPTCHA configuration.
- Core portfolio work remains higher priority.
- `@supabase/supabase-js` is the frontend API and Auth client.
- Server-controlled owner roles and like markers cannot be inferred from visitor input.
- An admin dashboard is not required.

## Revisit When

Revisit if moderation volume requires a dedicated dashboard or the single-owner email rule needs multiple roles.
