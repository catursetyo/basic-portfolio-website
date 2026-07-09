# Implementation Roadmap

## Phase 0: Planning

- Add this documentation set.
- Confirm CV file name.
- Confirm guestbook persistence service for messages, one-level replies, and likes.
- Verify Abacus endpoint docs before coding the counter.

## Phase 1: Visual Shell

- Update global tokens in `index.css`.
- Rebuild navbar as compact glass navigation.
- Rebuild home hero with cinematic dark/glass direction.
- Shorten or soften preloader.

## Phase 2: Content Structure

- Move project data into `src/data/projects.js`.
- Add featured project support.
- Add `Blog.jsx`, `Guestbook.jsx`, and `Resume.jsx`.
- Add simple route switch.

## Phase 3: Required Features

- Add featured project on home.
- Build projects showcase page.
- Build blog index.
- Build resume redirect.
- Add view counter helper and UI.
- Add guestbook UI, reply UI, like UI, and persistence integration.

## Phase 4: Polish

- Verify mobile layouts.
- Add reduced-motion fallbacks.
- Tune glass contrast.
- Check empty/error states.

## Phase 5: Verification

Run:

```bash
npm run build
npm run lint
```

Then manually check:

- `/`
- `/projects`
- `/blog`
- `/guestbook`
- `/resume`
- Mobile viewport.
