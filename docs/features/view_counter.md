# View Counter

## Goal

Show a small view count/status element inspired by akryst's visitor counter.

## Service

Use Abacus if available. The referenced project describes itself as a highly scalable, stateless counting API and a CountAPI replacement.

Reference:

- https://github.com/jasonlovesdoggo/abacus
- https://abacus.jasoncameron.dev

## Rules

- Keep the API base URL in an env var: `VITE_ABACUS_BASE_URL`.
- Keep namespace/key values in env vars or constants.
- Do not guess endpoints. Verify the current Abacus docs before implementation.
- Counter failure must not break the page.

## UI

Place the counter in the hero/footer metadata:

```text
1,482 players visited / v2.1
```

Adapted for this site:

```text
1,482 visits / v1
```

## Fetch Helper Contract

`getSiteViews()` should return:

```js
{
  count: number | null,
  error: string | null
}
```

The component decides whether to show the count, a placeholder, or nothing.
