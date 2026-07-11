# Architecture Decision Records

Decision records capture choices that should not be repeatedly reopened without new evidence.

## Status Values

- `Proposed`
- `Accepted`
- `Superseded`
- `Rejected`

## Records

| ID | Decision | Status |
| --- | --- | --- |
| [`001`](001-routing.md) | Use React Router for application routes. | Accepted |
| [`002`](002-hero-asset.md) | Use an original optimized still image for the V1 hero. | Accepted |
| [`003`](003-guestbook-persistence.md) | Require shared backend persistence before public guestbook launch. | Accepted; provider pending |
| [`004`](004-view-counter.md) | Keep view counter provider-neutral and optional. | Accepted |

## Template

```md
# ADR NNN — Title

Status: Proposed

## Context

## Decision

## Alternatives

## Consequences

## Revisit When
```

Revise or supersede a decision record when the architecture changes. Do not silently contradict an accepted record in another document.
