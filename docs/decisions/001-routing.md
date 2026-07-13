# ADR 001 — Use React Router

Status: Accepted

## Context

The initial redesign used `window.location.pathname`, `history.pushState`, and manual matching to avoid adding a router.

The application now includes:

- multiple top-level routes,
- blog slug routes,
- planned project slug routes,
- active navigation,
- not-found behavior,
- direct route loading,
- browser history and link semantics.

The manual solution is no longer the simplest reliable architecture.

## Decision

Add `react-router-dom` and define routes declaratively.

Use:

- `BrowserRouter`,
- `Routes`,
- `Route`,
- `Link`,
- `NavLink`,
- route parameters,
- a catch-all NotFound route.

Add deployment rewrites to `index.html`.

## Alternatives

### Continue manual routing

Rejected because it requires custom handling for matching, active states, nested routes, 404 behavior, modifier-click, and scroll coordination.

### Migrate to Next.js

Rejected because the application does not need a framework migration to solve client routing.

## Consequences

- One approved dependency is added.
- `App.jsx` becomes simpler.
- Internal links preserve browser behavior.
- Hosting configuration must support SPA fallback.
- Scroll behavior must be coordinated with Lenis.

## Revisit When

Revisit only if the application moves to a framework for broader server-rendering or content requirements, not for visual reasons.
