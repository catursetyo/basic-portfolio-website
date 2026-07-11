# ADR 003 — Require Shared Persistence for Guestbook

Status: Accepted; provider pending

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

The specific provider remains undecided.

## Alternatives

### Keep localStorage

Rejected for production because data is not shared or moderated.

### Remove guestbook permanently

Still an option if backend work is not worth the portfolio value.

### Hosted comment widget

Acceptable fallback if it supports the required behavior and visual integration without excessive privacy or branding tradeoffs.

## Consequences

- Guestbook work is delayed until provider and deployment are chosen.
- Core portfolio work remains higher priority.
- The frontend must use a real API contract.
- An admin dashboard is not required.

## Revisit When

Revisit when selecting the deployment platform and persistence provider.
