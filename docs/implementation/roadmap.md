# Implementation Roadmap

The roadmap is ordered by user value and technical dependency.

## Phase 0 — Documentation Sync

Tasks:

- Replace `AGENTS.md`.
- Add `docs/STATUS.md`.
- Rename `refractor_mapping.md` to `refactor_mapping.md`.
- Correct current-state and dependency documents.
- Add decision records.

Acceptance:

- No guide describes the old route inventory as current.
- Source-of-truth order is documented.
- Current known gaps are listed once in `STATUS.md`.
- The typo path is removed.

## Phase 1 — Foundation

Tasks:

- Add React Router.
- Add NotFound.
- Convert internal navigation to route-aware links.
- Configure SPA fallback.
- Correct Lenis lifecycle and reduced-motion behavior.
- Coordinate route and hash scrolling.
- Fix title, description, favicon, social metadata, and redundant font loading.
- Replace the Vite root README.
- Add CI for lint and build.

Acceptance:

- Direct loading works for every route.
- Unknown paths show NotFound.
- Modifier-click works.
- Reduced-motion mode disables smooth scrolling.
- `npm run lint` passes.
- `npm run build` passes.
- Metadata no longer contains Vite placeholders.

## Phase 2 — Visual Identity

Tasks:

- Lock usage of `caursty`, `Catur Setyo Ragil`, and `Catur/caur`.
- Add an original hero poster and optimized video sources.
- Tune overlay and crop for desktop/mobile.
- Refine hero hierarchy and navigation visibility.
- Fix ambient Surabaya time.
- Shorten or conditionally remove the preloader.

Acceptance:

- Hero is readable at 360px, 768px, 1440px.
- Hero video and poster share a defined focal point.
- No horizontal overflow.
- The design is recognizably original.
- Preloader does not block repeat visits or reduced-motion users.

## Phase 3 — Projects

Tasks:

- Expand project data with slugs and case-study content.
- Render one dominant featured project on Home.
- Add `/projects/:slug`.
- Include problem, role, contribution, challenge, result, and links.
- Improve screenshot loading and dimensions.

Acceptance:

- One complete project case study exists.
- Unknown project slug is handled.
- Homepage featured project is visually distinct.
- All links are verified.
- Team/personal contribution is explicit.

## Phase 4 — Resume, Contact, and Blog

Tasks:

- Add the real CV file or URL.
- Replace developer-facing resume fallback.
- Verify contact links.
- Publish one useful article or hide Blog from primary navigation.
- Add intentional Blog empty state.

Acceptance:

- Resume works on direct load.
- Contact method works.
- Blog is not an unexplained empty grid.
- Unknown post slug is handled.

## Phase 5 — Guestbook

Prerequisite:

- Persistence provider and deployment target are chosen.

Tasks:

- Implement shared API.
- Add server validation.
- Add moderation.
- Add rate limiting.
- Add likes and one-level replies.
- Add full UI states.

Acceptance:

- Messages persist across browsers.
- Pending moderation is explained.
- Invalid writes fail safely.
- Likes deduplicate.
- Failure does not break Home.
- LocalStorage is no longer presented as production state.

## Phase 6 — View Counter

Tasks:

- Record provider decision.
- Implement provider-neutral adapter.
- Define counting semantics.
- Preserve zero.
- Add safe timeout and fallback.

Acceptance:

- Counter does not block hero.
- Zero and failure states work.
- Development rerenders do not inflate counts.
- Semantics and privacy behavior are documented.

## Phase 7 — Final Quality

Tasks:

- Accessibility audit.
- Performance audit.
- Image optimization.
- Dead-code and dependency cleanup.
- Cross-browser check.
- Content proofreading.
- Final documentation sync.

Acceptance:

- Lint and build pass in CI.
- Keyboard navigation works.
- Focus is visible.
- Reduced-motion behavior works.
- Core Web experience is usable on a slow mobile connection.
- No stale placeholders remain.
- `STATUS.md` reflects the shipped state.
