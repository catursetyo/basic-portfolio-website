# Code Quality

## General Standards

- Prefer readable code over clever code.
- Keep components focused.
- Move repeated content into data modules.
- Do not create abstraction without real reuse.
- Delete obsolete code after a replacement is verified.
- Do not leave commented-out implementations.
- Keep naming consistent with product language.

## React

- Use stable keys based on real IDs or slugs.
- Do not use array index as a key for reorderable content.
- Clean up timers, listeners, animation frames, and external instances.
- Avoid effects for values that can be derived during render.
- Keep route state in the URL.
- Preserve native link behavior.
- Do not hide required content behind client-only animation.

## CSS and Tailwind

- Use tokens for shared colors and surfaces.
- Avoid one-off arbitrary colors when a token exists.
- Use utilities for local layout and shared classes for repeated visual patterns.
- Prevent horizontal overflow at 360px.
- Avoid fixed heights for variable text content.
- Provide fallback when `backdrop-filter` is unsupported.

## Accessibility

Required:

- semantic landmarks,
- heading hierarchy,
- visible focus,
- accessible names for icon buttons,
- visible form labels,
- field validation messages,
- meaningful image alt text,
- `aria-live` for async form status,
- reduced-motion support,
- keyboard-operable controls.

Do not use low-contrast metadata for important content.

## Performance

- Define image dimensions or aspect ratios.
- Lazy-load below-the-fold images.
- Prefer AVIF/WebP.
- Keep autoplay hero sources optimized, audio-free, poster-backed, and disabled for reduced motion.
- Avoid unnecessary frequent state updates.
- Do not load duplicate web fonts.
- Keep optional third-party requests nonblocking.
- Remove unused dependencies after verification.

## Security

- No secrets in `VITE_*`.
- Render guestbook content as text.
- Validate untrusted input on the server.
- Do not expose raw database errors.
- Rate-limit public writes.
- Do not trust client like counts or approval state.
- Use safe external-link attributes where appropriate.

## Required Commands

For code, CSS, route, data, or dependency changes:

```bash
npm run lint
npm run build
```

When tests exist:

```bash
npm test
```

Do not report success without command output.

## Manual Verification Matrix

Check relevant routes at minimum:

```text
/
 /projects
 /projects/<valid-slug>
 /projects/<invalid-slug>
 /blog
 /blog/<valid-slug> when content exists
 /blog/<invalid-slug>
 /resume
 /unknown-route
```

Viewports:

- 360 × 800.
- 768 × 1024.
- 1440 × 900.

Interaction:

- keyboard only,
- mouse,
- modifier-click internal links,
- browser back/forward,
- direct refresh,
- reduced motion,
- network failure for optional APIs.

## Route Verification

- Active navigation works on nested routes.
- Unknown route does not render Home.
- SPA fallback serves nested routes.
- Route changes scroll intentionally.
- Hash links work with Lenis enabled and disabled.

## Form Verification

- Empty submission.
- Minimum and maximum boundaries.
- Loading state.
- Success state.
- Server validation error.
- Network error.
- Retry without losing input.
- Keyboard submission.

## Review Checklist

- Real content only.
- No copied reference assets.
- No exact visual clone.
- No empty primary route.
- No developer-facing configuration message in production UI.
- No all-glass page.
- No hidden required content.
- No stale documentation.
- No claim that an unexecuted check passed.

## Agent Completion Report

Every AI agent must report:

1. Behavior changed.
2. Files changed.
3. Decisions and assumptions.
4. Commands run and results.
5. Manual checks.
6. Remaining issues.
7. Documentation updated.
