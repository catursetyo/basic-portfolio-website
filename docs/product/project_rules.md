# Project Rules

## Goal

Create a personal, cinematic, readable portfolio that presents Catur Setyo Ragil through real backend, data, AI, web, coursework, and competition projects.

The site should feel memorable without pretending that visual effects are professional experience.

## Positioning

Use this baseline positioning:

> IT student · backend developer · AI engineer

Avoid broad claims such as “data scientist” or “AI engineer” as the primary identity unless the project evidence and resume support them clearly.

## Audience

Primary:

- Internship and junior-role recruiters.
- Technical reviewers.
- Potential collaborators.

Secondary:

- Competition teammates.
- Other students and developers.
- General visitors.

## Required V1 Experience

- Long-scroll homepage.
- Original hero asset and identity block.
- About and social/contact section.
- One strong featured project.
- Supporting project list.
- Dedicated project index.
- Project detail/case-study route.
- Public resume route.
- Real not-found page.
- Responsive mobile experience.
- Metadata and social preview.
- Accessible keyboard and reduced-motion behavior.

Conditional V1 features:

- Blog only when useful content exists.
- Guestbook only when shared persistence, validation, owner deletion, and failure states exist.
- View counter only when it can fail quietly and does not delay the page.

## Priority

1. Truthful content.
2. Working navigation and routes.
3. Readability and accessibility.
4. Strong project presentation.
5. Responsive visual identity.
6. Performance.
7. Optional social features.
8. Decorative effects.

## Content Rules

- Use real dates, links, screenshots, and roles.
- Clearly distinguish personal, team, coursework, competition, and client work.
- State what Catur personally implemented.
- Do not invent impact metrics.
- Do not call a prototype “production” without evidence.
- Do not mark broken or unfinished demos as live.
- Use `Under development`, `Archived`, or `Prototype` where appropriate.
- An empty section should be hidden or intentionally explained.

## Brand Rules

- Primary handle/wordmark: `caursty`.
- Personal name: `Catur Setyo Ragil`.
- Casual introduction: `Catur` or `caur`.
- Do not use an unrelated fictional persona.
- Inspiration from akryst.moe is limited to mood, hierarchy, pacing, and restrained interaction patterns.

## Visual Rules

- Dark and image-led.
- Calm motion.
- Soft overlays and selective glass surfaces.
- Thin separators and small metadata.
- Content width around 1100–1200px on desktop.
- Original imagery only.
- Avoid a direct visual clone.
- Avoid all-glass layouts.
- Avoid unreadably low-contrast text.

## Technical Rules

- Keep Vite + React.
- Keep Tailwind CSS, Framer Motion, Lenis, Lucide React, and Space Grotesk.
- React Router is approved for route correctness.
- Static content stays local until a genuine editing workflow requires more.
- Secrets require a backend boundary.
- Guestbook state must be shared and server-validated before launch.

## Non-Goals for V1

- Next.js migration.
- Full CMS.
- User accounts.
- Admin dashboard.
- Music integration.
- Live Discord status.
- Three-dimensional scenes.
- Complex WebGL effects.
- Full analytics dashboard.
- Exact akryst.moe recreation.

## V1 Definition of Shipped

V1 is shipped when:

- Core routes load directly and through client navigation.
- One project has a complete case study.
- Resume and contact methods work.
- Mobile layout works at 360px width.
- Keyboard focus is visible.
- Reduced-motion users can navigate without smooth-scroll or transform-heavy effects.
- The hero asset is optimized.
- No primary route is empty or exposes developer-facing setup text.
- `npm run lint` and `npm run build` pass.
- Deployment fallback, metadata, favicon, and social preview are configured.
