# Current Implementation Status

Reviewed branch: `v2-redesign`  
Reviewed snapshot: `2cbcb0cf223af548ae689bb4b210f4cd0fb1f76b`  
Status date: 2026-07-11

This file describes what exists now. It is not a wish list.

## Done

- Vite + React application remains intact.
- Tailwind CSS, Framer Motion, Lenis, Lucide React, and local Space Grotesk are installed.
- Project data has been moved to `src/data/projects.js`.
- Social data has been moved to `src/data/socials.js`.
- Homepage has a long-scroll shell with:
  - hero,
  - about section,
  - social links,
  - project cards,
  - embedded guestbook area,
  - footer metadata.
- Projects index exists.
- Blog index and blog-post component scaffolds exist.
- Resume route scaffold exists.
- Guestbook has a local browser demo.
- View-counter fetch helper exists.
- Initial product, architecture, design, feature, and quality documents exist.

## In Progress

- Original visual identity and hero imagery.
- Responsive navigation behavior.
- Project content quality.
- Documentation synchronization.

## Known Problems

### Routing

- Routing is implemented with `window.location.pathname`, `pushState`, and manual matching.
- Unknown paths fall back to Home instead of a real 404 page.
- Nested active navigation is incomplete.
- Modifier-click behavior can be broken by unconditional `preventDefault`.
- Direct refresh depends on hosting fallback configuration.
- Route scroll behavior can conflict with Lenis.

### Visual and Brand

- Hero background is still gradient-based rather than using an original finished asset.
- `caursty`, `caur.`, and the full personal name do not yet have documented usage in the implementation.
- The role line can sound more senior than the portfolio evidence supports.
- The homepage maps every project into the same grid even though a featured project is defined.

### Metadata

- `index.html` still contains Vite favicon/title and a redundant Google Fonts Inter import.
- Open Graph, description, theme color, and social preview are not configured.
- Root README is still the Vite template.

### Scrolling and Motion

- Lenis configuration uses outdated or unnecessary option names.
- Manual RAF is not explicitly cancelled.
- Anchor listeners are registered manually.
- Reduced-motion CSS does not fully disable JavaScript smooth scrolling.
- Preloader blocks every initial visit for a fixed duration and hides the cursor.

### Counter

- Documentation and code use inconsistent environment-variable names.
- `Number(value) || null` loses a valid count of `0`.
- The UI also treats `0` as unavailable.
- Provider choice is not final.

### Ambient Time

- The interface labels time as Surabaya but formats in the visitor's local timezone.
- The component rerenders every second while displaying only hours and minutes.

### Blog

- `src/data/posts.js` is empty.
- Blog remains visible even without meaningful content.
- Empty-state behavior is not complete.

### Resume

- Resume URL is not configured.
- The fallback exposes implementation instructions instead of visitor-facing copy.

### Guestbook

- Messages, replies, and likes exist only in `localStorage`.
- This is a prototype, not a public guestbook.
- Validation differs from the written feature rules.
- Loading, success, error, moderation, and server persistence are not implemented.

### Legacy and Cleanup

- `src/pages/About.jsx` contains the old brutalist section and is no longer part of the current route flow.
- `react-use-measure` may be unused and must be verified before removal.
- The old `refractor_mapping.md` path is misspelled.

## Next Work

1. Replace manual routing with React Router and add a real 404 route.
2. Fix metadata, favicon, root README, and SPA deployment fallback.
3. Correct Lenis and reduced-motion behavior.
4. Lock brand naming and add an original still hero asset.
5. Implement one featured project and project detail routes.
6. Configure the real resume.
7. Add one useful blog article or hide Blog from primary navigation.
8. Select guestbook persistence and implement it.
9. Add the optional view counter through a provider-neutral adapter.
10. Run accessibility and performance verification.

## Blocked Decisions

- Final hero asset.
- Guestbook persistence provider and deployment target.
- Whether the counter uses the same backend as guestbook or an external service.
- Final CV file name and public path.

## Update Rule

Whenever a task changes actual implementation state, update this file in the same commit. Move items; do not duplicate them across sections.
