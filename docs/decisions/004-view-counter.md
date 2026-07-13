# ADR 004 — Keep View Counter Optional and Provider-Neutral

Status: Accepted

## Context

The existing documentation names one counting service, while the implementation accepts a full endpoint and assumes several possible response fields.

The count is decorative metadata and should not tightly couple Home to a provider.

## Decision

Create a provider-neutral `getSiteViews()` contract:

```js
{
  count: number | null,
  error: string | null
}
```

Normalize provider responses inside the helper.

The counter:

- does not block rendering,
- preserves `0`,
- fails quietly,
- documents its counting semantics,
- avoids duplicate increments,
- may use the guestbook backend or an external service.

## Alternatives

### Hard-code one provider into Home

Rejected because provider details would leak into presentation code.

### Remove the counter

Still acceptable if no reliable low-maintenance provider is selected.

## Consequences

- Provider selection can change without rewriting UI.
- A decision update is required when the production provider is chosen.
- The feature may be omitted from V1 without affecting the core portfolio.

## Revisit When

Revisit after guestbook/backend deployment is decided.
