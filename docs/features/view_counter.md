# View Counter

## Goal

Show a small optional visit count that supports the personal-archive mood.

The counter is decorative metadata, not a core feature.

## Provider Rule

The UI and client helper must be provider-neutral.

Do not couple component logic to one service response shape. Normalize the result in `src/lib/viewCounter.js`.

Possible providers:

- the same backend used by guestbook,
- a public counting service,
- a simple serverless endpoint.

Provider selection must be recorded in a decision document before production integration.

## Client Contract

```js
{
  count: number | null,
  error: string | null
}
```

A valid count of `0` must remain `0`.

Correct normalization pattern:

```js
const count = Number(rawValue);

return {
  count: Number.isFinite(count) ? count : null,
  error: null,
};
```

Do not use:

```js
Number(rawValue) || null
```

## UI

Examples:

```text
1,482 visits / v2
```

or when unavailable:

```text
-- visits / v2
```

The UI may hide the count completely if failure would look cleaner.

## Counting Semantics

Document whether the value means:

- requests,
- page loads,
- sessions,
- unique anonymous visitors,
- homepage views,
- all-route views.

Do not label page loads as unique visitors without deduplication.

## Privacy

- Do not fingerprint visitors.
- Do not expose IP information.
- Use only the minimum anonymous identifier required by the selected counting semantics.

## Failure Rules

- Counter request must not block hero rendering.
- Use a short timeout if the provider can hang.
- Failure does not produce a global error.
- Avoid repeated increments caused by rerenders.
- Do not increment once per second or once per component mount in development Strict Mode without protection.

## Environment

Prefer a generic endpoint name:

```text
VITE_VIEW_COUNTER_URL=
```

If the counter uses the shared API, use `VITE_API_BASE_URL` and a fixed `/api/views` path instead.

Do not maintain two different environment-variable names for the same endpoint.

## Acceptance Criteria

- Zero displays correctly.
- A view is not accidentally counted multiple times per intended event.
- Error fallback works.
- Counter does not delay content.
- Semantics are documented.
- Provider can be replaced without rewriting Home.
