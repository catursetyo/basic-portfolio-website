# Architecture

## Stack

- Vite
- React
- Tailwind CSS
- Framer Motion
- Lenis
- Lucide React

Do not migrate to Next.js for this redesign. Akryst's stack is a reference, not a requirement.

## App Shape

Use a small app shell:

- Global layout: nav, preloader, scroll behavior, background treatment.
- Route switch: home, projects, blog, contact, resume redirect.
- Shared data: projects, posts, social links.

## Routing

Use the smallest route layer that works.

Preferred V1:

- A tiny path switch in `App.jsx` using `window.location.pathname`.
- Native `history.pushState` for internal navigation if needed.
- Plain anchor links for same-page section jumps.

Add `react-router` only when nested routes, blog slugs, route params, or route-level transitions become painful.

## Data Flow

- Static content lives in local JS modules.
- View counter uses browser `fetch` to Abacus.
- Guestbook uses browser `fetch` to a small backend/API for messages, one-level replies, likes, moderation, and spam control.
- Do not put private keys in frontend env vars.

## API Boundaries

The frontend may call public APIs directly only when:

- The API is designed for browser use.
- No secret token is needed.
- Failure can degrade gracefully.

If a secret is required, add a backend boundary before shipping that feature.

Guestbook replies and likes count as a backend-bound feature. Do not ship them as client-only state.

## Error States

Every external feature needs:

- Loading state.
- Empty state.
- Error state.
- Reduced-motion-safe fallback if animated.
