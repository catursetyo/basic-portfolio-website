# Refactor Mapping

This file keeps the requested `refractor_mapping.md` spelling while documenting the refactor plan.

## Current To Target

| Current File | Target Role | Action |
| --- | --- | --- |
| `src/App.jsx` | App shell and route switch | Replace section-only rendering with simple route-aware shell. |
| `src/index.css` | Design tokens and shared utilities | Replace brutalist tokens with cinematic dark/glass tokens. |
| `src/components/layout/Navbar.jsx` | Akryst-inspired navigation | Convert top bar into compact glass nav/menu. |
| `src/components/layout/SmoothScroller.jsx` | Smooth scroll helper | Keep, but verify route changes reset scroll. |
| `src/components/ui/Preloader.jsx` | First-load intro | Keep shorter and softer; avoid blocking content too long. |
| `src/components/ui/DataOverlay.jsx` | Ambient metadata | Either remove or repurpose for view count/location/status. |
| `src/pages/Home.jsx` | Hero and featured project | Rebuild around full-bleed hero, intro, featured project, counter. |
| `src/pages/Projects.jsx` | Project showcase | Convert accordion/list into project showcase page. |
| `src/pages/About.jsx` | About block | Fold into home or keep as route/section with avatar and focus areas. |
| `src/pages/Contact.jsx` | Contact/social links | Convert into thin social list; optionally fold into guestbook/contact route. |

## New Files To Add When Implementing

| File | Purpose |
| --- | --- |
| `src/data/projects.js` | Project data currently embedded in `Projects.jsx`. |
| `src/data/posts.js` | Blog post metadata and content. |
| `src/data/socials.js` | Social/contact links. |
| `src/pages/Blog.jsx` | Blog index page. |
| `src/pages/Guestbook.jsx` | Reusable homepage guestbook section and form. |
| `src/pages/Resume.jsx` | Redirect component for CV file. |
| `src/lib/viewCounter.js` | Abacus fetch helper. |
| `src/lib/guestbook.js` | Guestbook fetch helper. |

## Minimum Viable Refactor

1. Move project data out of `Projects.jsx`.
2. Replace visual tokens in `index.css`.
3. Rebuild `Home`, `Navbar`, `Projects`.
4. Add blog and resume routes; keep guestbook embedded on home.
5. Add counter and guestbook integrations after the visual shell works.
