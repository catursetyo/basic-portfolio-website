# Current State Audit

## What Exists

- Vite + React app.
- Tailwind theme tokens in `src/index.css`.
- Framer Motion page/section animations.
- Lenis smooth scrolling.
- Project data embedded in `Projects.jsx`.
- Local assets in `public/`: profile image and project screenshots.

## Current Strengths

- Simple project structure.
- Already has motion and smooth scroll.
- Project screenshots exist.
- No complicated backend to untangle.

## Current Problems For The New Direction

- Visual language is brutalist, not akryst-inspired.
- Project data is embedded in UI.
- There are no routes for blog, guestbook, or resume.
- There is no external data boundary for view counter or guestbook.
- The current top nav conflicts with the desired soft/cinematic direction.

## Keep

- Existing dependencies.
- Existing project screenshots.
- Lenis, if it behaves well with route changes.
- Framer Motion for small page transitions.

## Replace

- Black/white grid dominance.
- Giant uppercase brutalist hero.
- Accordion-only project experience.
- Terminal overlay unless repurposed as subtle metadata.
