# Current Implementation Status

Reviewed branch: `v2-redesign`
Reviewed state: current working tree
Status date: 2026-07-11

This file describes what exists now. It is not a wish list.

## Done

- Vite + React application remains intact.
- Tailwind CSS, Framer Motion, Lenis, Lucide React, and local Space Grotesk remain installed.
- Project and social content live in `src/data/` modules.
- Homepage now has an image-led long-scroll composition with:
  - an original no-person hero asset,
  - compact hero navigation,
  - about and social sections,
  - one dominant featured project,
  - supporting projects,
  - embedded guestbook preview,
  - quiet footer metadata.
- The generated hero is stored as `public/hero-data-garden.webp` at 1815 × 866 and about 156 KB.
- The profile image is used only as a small avatar, not as the background.
- Primary navigation appears after the homepage hero and remains visible on internal routes.
- Empty Blog content is hidden from primary navigation.
- Projects index uses inspectable screenshots and a responsive list layout.
- Guestbook fields have visible labels, native limits, keyboard focus, and an `aria-live` local-save status.
- The fixed preloader has been removed.
- Lenis skips reduced-motion users, supports hash links, and cancels its animation frame on cleanup.
- Ambient time uses the `Asia/Jakarta` timezone and updates once per minute.
- The counter preserves a valid count of zero.
- Basic title, description, theme color, and Open Graph metadata are configured.
- The resume fallback is visitor-facing rather than developer-facing.
- `PRODUCT.md` captures the brand register and strategic constraints.

## In Progress

- React Router migration and real not-found handling.
- Project case-study routes and contribution details.
- Final resume PDF or public URL.
- Shared guestbook persistence and moderation.
- Final view-counter provider decision.
- Dedicated favicon and social-preview artwork.
- Root repository README.

## Known Problems

### Routing

- Routing still uses `window.location.pathname`, `pushState`, and manual matching.
- Unknown paths still fall back to Home instead of a real 404 page.
- Direct refresh still depends on hosting fallback configuration.
- Some older page-level links still intercept modifier-click.

### Content

- Project summaries are not complete case studies.
- Personal contribution, challenge, result, and learning fields are incomplete.
- Blog data is empty; its routes remain directly reachable but are not promoted.
- The real resume file is not configured.

### Counter

- Provider choice and counting semantics are not final.
- Counter documentation and environment-variable naming still need one final contract.
- Timeout and privacy behavior are not implemented.

### Guestbook

- Messages, replies, and likes still use `localStorage`.
- The visible local-preview label is intentional; this is not a production guestbook.
- Shared persistence, moderation, rate limiting, loading, network error, and server validation are not implemented.

### Legacy and Cleanup

- `src/pages/About.jsx` remains unused and contains outdated positioning copy.
- `react-use-measure` may be unused and must be verified before removal.
- The root README remains the Vite template.
- A dedicated favicon is still missing.

## Next Work

1. Replace manual routing with React Router and add a real 404 route.
2. Add one complete project case study and `/projects/:slug`.
3. Configure SPA deployment fallback and verify direct route loads.
4. Add the final public resume file.
5. Replace the root README and add a dedicated favicon/social image.
6. Select and implement guestbook persistence.
7. Finalize the view-counter provider contract.
8. Remove verified legacy code and unused dependencies.
9. Run final accessibility, performance, and cross-browser audits.

## Blocked Decisions

- Guestbook persistence provider and deployment target.
- Whether the counter shares the guestbook backend or uses an external service.
- Final CV file name and public path.

## Update Rule

Whenever a task changes actual implementation state, update this file in the same commit. Move items; do not duplicate them across sections.
