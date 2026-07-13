# Current Implementation Status

Reviewed branch: `v2-redesign`
Reviewed state: current working tree
Status date: 2026-07-13

This file describes what exists now. It is not a wish list.

## Done

- Vite + React application remains intact.
- Tailwind CSS, Framer Motion, Lenis, Lucide React, and local Space Grotesk remain installed.
- Project and social content live in `src/data/` modules.
- Homepage now has an image-led long-scroll composition with:
  - an owner-supplied video hero with a still poster,
  - compact hero navigation,
  - about and social sections,
  - a compact repository-format project grid,
  - embedded guestbook,
  - quiet footer metadata.
- Hero uses `public/background/hero.webm` (VP9, 1.57 MB) with `public/background/hero.mp4` (H.264, 2.77 MB) fallback.
- `public/background/hero-poster.webp` provides the initial, failure, and reduced-motion background.
- Both video sources are 1920 × 1080, 30 fps, about 21 seconds, and contain no audio stream.
- The profile image is used only as a small avatar, not as the background.
- About displays the local technology icons from `public/icons/` in the requested stack order.
- Social platform labels use a Basic Latin WOFF2 subset of FiraMono Nerd Font from `public/fonts/`.
- Primary navigation appears after the homepage hero and remains visible on internal routes.
- Blog is intentionally visible in the hero and primary navigation while its post data remains empty.
- Projects index uses inspectable screenshots and a responsive list layout.
- The homepage landing sections now use the approved Figma typography roles: Barlow Condensed for navigation, Inter for metadata, DM Sans for supporting copy, and the existing Space Grotesk for the `caursty.` wordmark.
- The long-scroll content uses a transparent-to-black fade that keeps the hero video visible before settling into the solid archive background.
- About, social links, repository cards, and guestbook rows now share the compact type hierarchy and restrained opacity treatment from the approved landing frame.
- Guestbook fields have visible labels, native limits, keyboard focus, and an `aria-live` submission status.
- The primary guestbook form is collapsed by default and disclosed by an accessible `leave a message` CTA.
- A Supabase guestbook adapter and PostgreSQL migration now provide shared messages, anonymous likes, pending moderation, and one-level owner replies when public Supabase credentials are configured.
- Owner access uses a private `/owner/login` magic-link flow. Owner identity, replies, moderation controls, and the `liked by caur` marker are verified by database functions rather than visitor-submitted names.
- Direct table access is revoked; browser writes use validated RPC functions and anonymous Supabase Auth identities for rate limiting and like deduplication.
- The full homepage foreground from hero through footer sways as one plane with cursor position on fine pointers only.
- The fixed preloader has been removed.
- Lenis skips reduced-motion users, supports hash links, and cancels its animation frame on cleanup.
- Ambient time uses the `Asia/Jakarta` timezone and updates once per minute.
- The counter preserves a valid count of zero.
- Basic title, description, theme color, and Open Graph metadata are configured.
- The browser title is `caursty`.
- Unknown application paths render a dedicated NotFound page, and Cloudflare Pages provides the production SPA fallback.
- Cloudflare Pages builds `main`, publishes `dist/`, and serves `caursty.dev` and `www.caursty.dev`.
- The resume fallback is visitor-facing rather than developer-facing.
- `PRODUCT.md` captures the brand register and strategic constraints.

## In Progress

- React Router migration.
- Project case-study routes and contribution details.
- Final resume PDF or public URL.
- Provisioning the Supabase project, applying the migration, and configuring the owner Auth account.
- Final view-counter provider decision.
- Social-preview artwork.

## Known Problems

### Routing

- Routing still uses `window.location.pathname`, `pushState`, and manual matching.
- Some older page-level links still intercept modifier-click.

### Content

- Project summaries are not complete case studies.
- Personal contribution, challenge, result, and learning fields are incomplete.
- Blog data is empty; its routes are intentionally promoted without filler content.
- The real resume file is not configured.

### Counter

- Provider choice and counting semantics are not final.
- Counter documentation and environment-variable naming still need one final contract.
- Timeout and privacy behavior are not implemented.

### Guestbook

- No local `.env` is configured, so `localStorage` is available only during Vite development; production renders an unavailable state when Supabase is missing.
- The Supabase migration has not been applied to a remote project from this repository session.
- CAPTCHA and provider-level Auth rate limits still need production configuration in Supabase.

## Next Work

1. Replace manual routing with React Router.
2. Add one complete project case study and `/projects/:slug`.
3. Verify direct route loads on the Cloudflare Pages deployment.
4. Add the final public resume file.
5. Add the final social-preview image.
6. Apply the guestbook migration and configure Supabase Auth, redirect URLs, and production CAPTCHA.
7. Finalize the view-counter provider contract.
8. Run final accessibility, performance, and cross-browser audits.

## Blocked Decisions

- Supabase project URL and publishable key for each deployment environment.
- Whether the counter shares the guestbook backend or uses an external service.
- Final CV file name and public path.

## Update Rule

Whenever a task changes actual implementation state, update this file in the same commit. Move items; do not duplicate them across sections.
