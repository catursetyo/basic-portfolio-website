# Refactor Mapping

This is the canonical refactor map.

## Current to Target

| Current File | Target Role | Action |
| --- | --- | --- |
| `src/App.jsx` | App composition | Replace manual path matching with router composition. |
| `src/app/router.jsx` | Route definition | Add during React Router refactor. |
| `src/app/ScrollManager.jsx` | Route/hash scroll coordination | Add when replacing mixed scroll logic. |
| `src/index.css` | Tokens and shared styles | Keep, then split only if it becomes difficult to navigate. |
| `src/components/layout/Navbar.jsx` | Route-aware navigation | Use `NavLink`, nested active state, and homepage visibility behavior. |
| `src/components/layout/SmoothScroller.jsx` | Lenis lifecycle | Use supported options, reduced-motion opt-out, and safe cleanup. |
| `src/components/ui/Preloader.jsx` | Removed loading overlay | Deleted; add a new intro only when it has measured user value. |
| `src/components/ui/DataOverlay.jsx` | Ambient location/time metadata | Fix timezone and update once per minute. |
| `src/pages/Home.jsx` | Homepage composition | Split only when sections become hard to maintain. |
| `src/pages/Projects.jsx` | Project index | Keep; link each project to a case study. |
| `src/pages/ProjectDetail.jsx` | Project case study | Add. |
| `src/pages/Blog.jsx` | Blog index | Add intentional empty state or hide navigation until content exists. |
| `src/pages/BlogPost.jsx` | Blog detail | Use route params and not-found behavior. |
| `src/pages/Guestbook.jsx` | Embedded guestbook | Supabase-backed when configured, with a labeled local preview fallback. |
| `src/pages/OwnerLogin.jsx` | Private owner access | Keep unlisted; authenticate by magic link and expose controls inline in Guestbook. |
| `src/pages/Resume.jsx` | Resume route | Use public PDF or visitor-facing fallback. |
| `src/pages/NotFound.jsx` | Application 404 | Add. |
| `src/pages/About.jsx` | Legacy brutalist page | Delete after confirming no imports or links remain. |
| `src/data/projects.js` | Project source data | Expand to case-study fields and add slugs. |
| `src/data/posts.js` | Blog source data | Add real published content; the empty route is currently visible by explicit user choice. |
| `src/data/socials.js` | Contact source data | Keep. |
| `src/lib/guestbook.js` | Guestbook transformations | Keep pure row nesting and local preview helpers here. |
| `src/lib/guestbookApi.js` | Guestbook API boundary | Keep Supabase Auth and RPC calls here. |
| `src/lib/supabase.js` | Supabase client | Keep public environment configuration isolated here. |
| `src/lib/viewCounter.js` | Counter adapter | Make provider-neutral and preserve valid zero values. |
| `index.html` | Document metadata | Replace Vite title/favicon, remove redundant Inter import, add SEO/social metadata. |
| `README.md` | Repository documentation | Replace the Vite template. |

## Approved New Files

```text
src/app/router.jsx
src/app/ScrollManager.jsx
src/pages/ProjectDetail.jsx
src/pages/NotFound.jsx
src/pages/OwnerLogin.jsx
src/lib/api.js
src/lib/guestbookApi.js
src/lib/supabase.js
supabase/migrations/202607120001_guestbook.sql
public/og-image.jpg
public/catur-setyo-ragil-cv.pdf
```

Names of public assets may change, but documentation and links must stay consistent.

## Cleanup Candidates

Verify before removing:

- `src/pages/About.jsx`
- `react-use-measure`
- unused old brutalist CSS selectors
- Google Fonts Inter links
- `/vite.svg`
- manual route helper functions
- manual Lenis anchor listeners
- localStorage guestbook production code

## Refactor Order

1. Add React Router and route definitions.
2. Add NotFound and route-aware navigation.
3. Add ScrollManager and correct Lenis integration.
4. Fix metadata and deployment fallback.
5. Add project slug/detail support.
6. Fix Blog and Resume public behavior.
7. Replace guestbook prototype after backend choice.
8. Remove verified legacy files and dependencies.
9. Update status and documentation.

## Rule

Do not combine every item into one large rewrite. Each step must leave the site runnable and verifiable.
