# System Overview

## Current State

The site is a Vite + React single-page portfolio. It currently uses:

- `src/App.jsx` as the app shell.
- `src/pages/Home.jsx`, `Projects.jsx`, `About.jsx`, and `Contact.jsx` as page sections.
- `src/components/layout/Navbar.jsx` for the top nav.
- `src/components/layout/SmoothScroller.jsx` for Lenis scrolling.
- `src/components/ui/Preloader.jsx` and `DataOverlay.jsx` for visual effects.
- `src/index.css` for Tailwind theme tokens and global styles.

The current visual style is high-contrast neo-brutalist: black/white, grid borders, giant uppercase text, terminal labels.

## Target State

The redesign should become a cinematic personal archive:

- Full-bleed first viewport with fixed scenic background, dark overlay, left identity block, vertical menu, and visit counter.
- Same-background scroll into about/social row, compact work cards, then guestbook at the bottom.
- Small navigational menu inspired by akryst.
- Soft glass panels for nav, project cards, guestbook, and counters.
- Project showcase preview on home plus a dedicated project route.
- Blog and resume routes.
- Guestbook, reply/like, and view counter integrations.

## Primary Routes

| Route | Purpose |
| --- | --- |
| `/` | Home long-scroll: hero, about/socials, featured work, guestbook, view counter. |
| `/projects` | Showcase all projects. |
| `/blog` | Blog index. |
| `/resume` | Redirect to public CV file. |
| `/contact` | Contact/social links if not folded into home. |

## Data Types

Keep data boring and local until it hurts:

- `Project`: title, slug, year, category, description, image, tech stack, links, featured flag.
- `Post`: title, slug, date, excerpt, tags, body or source path.
- `GuestbookMessage`: name, message, createdAt, approved, likeCount.
- `GuestbookReply`: messageId, name, message, createdAt, approved, likeCount.
- `GuestbookLike`: targetType, targetId, visitorIdHash.
- `Counter`: total views, optional per-page views.

## External Services

- Abacus can provide view counting.
- Guestbook requires persistence and a small backend/API once replies and likes are enabled. Use plain `fetch` from the frontend.
