# Dependency Rules

## Current Dependencies to Keep

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
- `@fontsource/barlow-condensed`
- `@fontsource/inter`
- `@fontsource/dm-sans`

## Approved Addition

### `react-router-dom`

Approved because the application now has:

- multiple top-level routes,
- nested slug routes,
- active navigation,
- not-found handling,
- browser history requirements,
- direct-route loading requirements.

The manual pathname switch is no longer the smallest reliable solution.

## Verify and Remove if Unused

- `react-use-measure`

Do not remove a package based only on memory. Search all imports and run build/lint after removal.

## Avoid in V1

- Next.js migration.
- Full UI kits.
- Shadcn registry adoption.
- GSAP.
- Three.js.
- WebGL frameworks.
- CMS packages.
- Global state libraries.
- Form libraries for the small current forms.
- Large validation libraries unless backend and frontend schemas genuinely need shared validation.
- Analytics suites that add cookies or privacy obligations without clear benefit.

## External Services

Allowed:

- Database/API provider for guestbook.
- Optional counting service.
- Static hosting for CV and social preview.
- Deployment platform functions.

Rules:

- Prefer plain `fetch` when the service has a simple browser-safe REST API.
- Use an SDK only when it materially reduces security risk or implementation complexity.
- Provider admin or service-role secrets remain server-side.
- Every external integration must have a fallback.

## New Dependency Checklist

A dependency may be added only when:

- Existing code cannot solve the problem cleanly.
- The feature is part of the current roadmap.
- The package is actively maintained.
- The package size and browser impact are acceptable.
- It removes more complexity than it adds.
- It is used immediately.
- Documentation and lockfile are updated.
- Build and lint pass.

## Update Rules

- Do not upgrade unrelated dependencies during a focused feature task.
- Do not perform major-version upgrades without reading migration notes.
- Keep dependency changes in a clear commit or change set.
- Record architecture-changing additions in `docs/decisions/`.

## Font Rules

- Use local `@fontsource` packages; do not duplicate them with remote font requests.
- Space Grotesk remains the portfolio wordmark and route-level display family.
- Barlow Condensed, Inter, and DM Sans are approved for the section-specific roles documented in `docs/design/design_system.md` because the user-supplied Figma frame depends on those distinct proportions.
- Import only the Latin subset and weights used by the implementation.
- Add another family only when a documented visual need cannot be met with the approved set.
