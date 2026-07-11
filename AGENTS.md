# AI Agent Guide

This repository contains Catur Setyo Ragil's personal portfolio. The current redesign lives on the `v2-redesign` branch and targets a cinematic, image-led personal archive inspired by the mood and layout rhythm of akryst.moe without copying its identity, assets, source code, or exact composition.

This file is the first instruction source for every AI coding agent working in the repository.

## 1. Project Mission

Build a portfolio that presents Catur honestly as:

> IT student · backend developer · data & AI builder

The site must make real projects easy to inspect. Visual polish supports the work; it must not hide weak, missing, or fabricated content.

Primary audience:

- Recruiters and internship reviewers.
- Collaborators and competition teammates.
- Developers inspecting Catur's projects.
- Visitors who want to contact Catur.

## 2. Read Order

Before editing code, read these files in order:

1. `AGENTS.md`
2. `docs/STATUS.md`
3. `docs/product/project_rules.md`
4. `docs/product/system_overview.md`
5. The document for the area being changed:
   - Architecture: `docs/architecture/architecture.md`
   - File migration: `docs/architecture/refactor_mapping.md`
   - Visual work: `docs/design/design_system.md`
   - Dependencies: `docs/dependencies/dependency_rules.md`
   - Feature behavior: `docs/features/*.md`
   - Verification: `docs/quality/code_quality.md`
6. Relevant decision record in `docs/decisions/`

Do not read every document blindly for a small task. Read the required sources and the specific file that governs the requested change.

## 3. Source-of-Truth Order

When documents disagree, use this order:

1. Explicit user instruction in the current task.
2. Accepted decision records in `docs/decisions/`.
3. Feature-specific documents in `docs/features/`.
4. `docs/product/project_rules.md`.
5. `docs/design/design_system.md`.
6. `docs/architecture/architecture.md`.
7. `docs/STATUS.md`.
8. Older comments or implementation notes.

After resolving a conflict, update the stale document in the same change.

## 4. Non-Negotiable Rules

### Product

- Use real project names, links, screenshots, roles, and outcomes.
- Do not invent metrics, clients, testimonials, experience, or production usage.
- Do not publish an empty route only to make the site look larger.
- The portfolio must remain understandable without animations.
- Project case studies are more important than guestbook, counters, or decorative effects.

### Visual Identity

- Use akryst.moe only as a mood and interaction reference.
- Do not copy its assets, character art, wordmark, CSS, guestbook content, or exact page composition.
- Brand handle: `caursty`.
- Personal name: `Catur Setyo Ragil`.
- Casual short name may be `Catur` or `caur`; do not use these interchangeably without context.
- Keep the site dark, calm, readable, and image-led.
- Avoid glassmorphism on entire sections or every nested element.
- Use an original hero asset. The profile image is an avatar, not the hero background.

### Technical

- Keep Vite, React, Tailwind CSS, Framer Motion, Lenis, Lucide React, and Space Grotesk.
- React Router is approved for the routing refactor.
- Do not migrate to Next.js for this redesign.
- Do not add a UI kit, GSAP, Three.js, a CMS, an account system, or a full admin panel in V1.
- Do not place secrets in frontend environment variables.
- Do not ship guestbook messages, replies, or likes as browser-only state.
- External services must fail without breaking the main portfolio.

### Quality

- Preserve semantic HTML and keyboard access.
- Respect `prefers-reduced-motion`.
- Avoid layout shift from images, counters, fonts, and loading states.
- Add visible focus indicators.
- Every form needs labels, validation, loading, success, and error states.
- Run verification before claiming completion.

## 5. Current Priority Order

Work in this order unless the user explicitly changes it:

1. Documentation and implementation consistency.
2. Routing, metadata, SPA fallback, and navigation correctness.
3. Original hero asset and responsive visual shell.
4. Featured project and project case studies.
5. Resume and contact readiness.
6. Blog content or a deliberate hidden/empty state.
7. Guestbook persistence.
8. View counter.
9. Optional visual polish.

Do not prioritize community widgets over core portfolio content.

## 6. Required Workflow

### Step 1: Inspect

- Read `docs/STATUS.md`.
- Inspect the current implementation before proposing a replacement.
- Search for existing components, utilities, styles, and data models.
- Identify whether the requested task changes product scope, architecture, design, or feature behavior.

### Step 2: Define the Change

Write a private implementation plan containing:

- Files to change.
- Expected behavior.
- Risks and edge cases.
- Verification commands.
- Documentation that may become stale.

Keep the change as small as possible while still being coherent. Do not split one functioning behavior across unfinished placeholder commits.

### Step 3: Implement

- Reuse existing code when it is still appropriate.
- Remove obsolete code when a replacement is complete.
- Keep static content in data modules rather than large JSX files.
- Prefer explicit names over clever abstractions.
- Do not create generic components until at least two real usages exist.
- Keep animations secondary to layout and content.

### Step 4: Verify

For React, CSS, routing, data, or dependency changes, run:

```bash
npm run lint
npm run build
```

When tests exist, also run:

```bash
npm test
```

Manually verify relevant routes and viewports. The minimum matrix is defined in `docs/quality/code_quality.md`.

### Step 5: Update Documentation

Update:

- `docs/STATUS.md` when completion state changes.
- A feature document when behavior changes.
- A decision record when an architectural decision changes.
- `docs/architecture/refactor_mapping.md` when files move, split, or are removed.
- Environment-variable documentation when configuration changes.

Never leave documentation describing behavior that no longer exists.

### Step 6: Completion Report

Every completed task must report:

1. Summary of behavior changed.
2. Files changed.
3. Important decisions or assumptions.
4. Commands run and exact results.
5. Manual checks performed.
6. Known remaining issues.
7. Documentation updated.

Do not claim a command passed if it was not executed.

## 7. Routing Rules

Target routes:

| Route | Purpose |
| --- | --- |
| `/` | Long-scroll homepage. |
| `/projects` | Project index. |
| `/projects/:slug` | Project case study. |
| `/blog` | Blog index or honest empty state. |
| `/blog/:slug` | Blog article. |
| `/resume` | Resume redirect or public fallback. |
| `/contact` | Optional contact route if the homepage section is insufficient. |
| `*` | Not-found page. |

Rules:

- Use React Router after the routing refactor.
- Use route-aware links for internal navigation.
- Preserve modifier-click, open-in-new-tab, and browser history behavior.
- Provide a real not-found route.
- Configure the deployment platform to serve `index.html` for SPA routes.
- Reset or restore scroll intentionally on route changes.
- Home hash links must work with and without Lenis.

## 8. Content Rules

### Homepage

The homepage should contain:

1. Full-viewport hero.
2. Identity and compact navigation.
3. About and social links.
4. One primary featured project.
5. Supporting projects.
6. Guestbook only after persistence is ready, or clearly labeled as unavailable/demo.
7. Footer metadata.

### Projects

Every featured project must state:

- Problem.
- Catur's role.
- Main contribution.
- Technology used.
- Important technical decision or challenge.
- Result or learning.
- Working repository and/or live link when available.

Do not use generic marketing copy when concrete details are available.

### Blog

- Hide the route from primary navigation when it has no useful content, or render a deliberate empty state.
- Do not generate filler articles.
- Prefer case studies, technical notes, or competition write-ups based on real work.

### Resume

- Prefer a versioned PDF in `public/`.
- The route must not expose developer instructions to visitors.
- A missing resume must show a public-facing fallback and contact option.

## 9. Accessibility and Motion Rules

- All interactive controls require visible focus.
- Icon-only buttons require accessible names.
- Decorative images use empty alt text.
- Informative images use meaningful alt text.
- Form errors must be associated with fields.
- Dynamic success/error messages should use `aria-live`.
- Do not rely on hover alone.
- Disable smooth scrolling and nonessential transforms for reduced-motion users.
- Text must remain readable over every hero crop.

## 10. Performance Rules

- Prefer AVIF or WebP for large images.
- Define image width, height, or aspect ratio.
- Lazy-load below-the-fold images.
- Do not autoplay a large hero video in V1.
- A still hero image is the default; add video only after measuring performance.
- Avoid per-second rerenders when minute-level updates are sufficient.
- Avoid blocking preloaders on every route or every visit.
- Remove unused packages and imports only after verifying they are unused.

## 11. Security and External Data

- Render user-generated text as text, never injected HTML.
- Validate on both client and server.
- Rate-limit guestbook writes and likes.
- Deduplicate likes server-side.
- Store only anonymous identifiers required for abuse prevention.
- Never expose database service-role keys or private API tokens.
- Use safe loading, empty, error, and unavailable states for every fetch.

## 12. Definition of Done

A change is done only when:

- The requested behavior works.
- Existing relevant behavior still works.
- Lint and build pass, or the failure is reported honestly.
- Relevant desktop and mobile states were checked.
- Keyboard and reduced-motion behavior were considered.
- No placeholder, stale route, or dead code was unintentionally introduced.
- Documentation matches the resulting implementation.
- The completion report is provided.
