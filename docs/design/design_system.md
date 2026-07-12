# Design System

## Direction

A cinematic, dark, personal archive with restrained glass surfaces, clear project content, small metadata, and calm motion.

Reference sites may guide mood and pacing. They must not supply copied identity, artwork, layout measurements, CSS, or content.

## Brand Naming

Use:

- `caursty` as the primary handle and wordmark.
- `Catur Setyo Ragil` in metadata, resume, SEO, and formal introductions.
- `Catur` or `caur` in conversational copy.

Recommended hero line:

> IT student · backend developer · data & AI builder

Do not present multiple job titles that the project evidence cannot support.

## Homepage Rhythm

1. Full-height hero.
2. About and social row over a continued visual background.
3. Compact repository-format project grid.
4. Optional guestbook and recent posts.
5. Quiet footer.

The homepage is not a dashboard.

## Color Tokens

```css
:root {
  --bg: oklch(0.14 0.018 268);
  --bg-deep: oklch(0.095 0.014 268);
  --surface: oklch(0.19 0.02 265);
  --surface-soft: oklch(0.23 0.022 260);
  --text: oklch(0.95 0.01 245);
  --muted: oklch(0.76 0.018 245);
  --faint: oklch(0.62 0.016 245);
  --line: oklch(0.92 0.012 245 / 0.13);
  --accent: oklch(0.82 0.11 220);
  --accent-warm: oklch(0.79 0.13 72);
}
```

Tokens may be tuned after testing on the final hero asset. Do not change them randomly per component.

## Contrast

- Main body text must remain readable on the darkest and brightest hero crops.
- Muted text is secondary, not nearly invisible.
- Metadata may be faint only when it is nonessential.
- Interactive text must not rely only on a subtle color shift.

## Glass

Base:

```css
.glass {
  background: oklch(0.17 0.018 265 / 0.68);
  border: 1px solid oklch(0.92 0.012 245 / 0.13);
  backdrop-filter: blur(16px);
}
```

Use for:

- compact navigation,
- project cards,
- guestbook rows,
- status chips,
- small functional panels.

Avoid for:

- entire sections,
- the body background,
- every nested element,
- large empty containers.

Glass is not the identity. Imagery, type, spacing, and content create the identity.

## Typography

Local families:

- Space Grotesk: primary wordmark and existing route-level display text.
- Barlow Condensed: hero menu and fixed-header navigation.
- Inter: section labels, counters, compact metadata, and form labels.
- DM Sans: homepage About copy, social values, repository descriptions, guestbook content, and compact action text.

All families load locally through `@fontsource`; do not add a remote Google Fonts request. Import only the Latin subset and weights used by the interface.

Roles:

- Wordmark/display: Space Grotesk 600–700.
- Condensed navigation: Barlow Condensed 600–700.
- Body and supporting headings: DM Sans 300–700.
- Metadata: Inter 400.

Guidelines:

- Wordmark should not cover the visual subject.
- Body text uses comfortable line height.
- Avoid uppercase for long paragraphs.
- Avoid very wide text lines.
- Use a consistent heading scale across routes.
- Keep letter spacing at `0`; the condensed navigation family supplies the intended narrow rhythm without manual tracking.

## Background Fade

- The hero video remains fixed behind the homepage.
- The long-scroll layer begins transparent, reaches a translucent `#19191e` shortly below the fold, and ends as solid `#19191e`.
- The fade must preserve readable text without creating a visible hard seam between the hero and About section.

## Imagery

Hero:

- Current sources: `public/hero.webm` (VP9) followed by `public/hero.mp4` (H.264).
- Still fallback: `public/hero-poster.webp`.
- Provide a safe focal point for desktop and mobile crops.
- Add a dark overlay for text readability.
- Do not use `profile.png` as the full hero.
- Autoplay must remain muted, inline, looped, and audio-free.
- Reduced-motion users receive only the poster and do not download the video sources.

Current crop:

- Desktop uses a centered cover crop while reserving darker copy space on the left.
- Mobile uses a right-biased crop with a stronger dark overlay behind the wordmark and menu.

Projects:

- Homepage cards show owner/repository, description, and primary language only.
- Repository cards use compact DM Sans copy, Inter language metadata, a thin border, and a restrained translucent surface.
- Keep project screenshots on `/projects` and future case-study routes.
- Use real screenshots.
- Preserve aspect ratio.
- Define dimensions or `aspect-ratio`.
- Lazy-load below-the-fold media.
- Do not hide screenshots behind decorative masks that prevent inspection.

Avatar:

- Small and secondary.
- Use accurate alt text if informative.

Guestbook:

- Use compact, unframed rows instead of cards.
- Use Inter for names, dates, counts, and controls; use DM Sans for message content.
- Keep the primary composer collapsed until the visitor activates the `leave a message` disclosure CTA.

## Layout

Desktop:

- Main width: 1100–1200px.
- Two-column about/social section.
- Compact two-column repository grid.
- Generous section spacing.

Mobile:

- Validate at 360px.
- Single-column content.
- Hero copy must remain readable.
- Navigation must not require horizontal precision.
- Tap targets should be comfortable.
- Do not preserve desktop card heights.

## Navigation

Homepage:

- Hero menu may be the primary first-viewport navigation.
- Fixed nav can remain subtle or appear after the hero.

Internal pages:

- Fixed or sticky navigation is visible immediately.
- Active state works on nested routes.
- Home control has an accessible label.

## Motion

Allowed:

- short first reveal,
- subtle opacity/position entrance,
- restrained project hover,
- cursor-directed sway of the complete homepage foreground layer,
- calm route transition,
- gentle background movement only when inexpensive.

Avoid:

- constant parallax,
- cursor replacement,
- long blocking preloaders,
- card movement that changes layout,
- heavy motion on every scroll,
- effects that conceal content.

Reduced-motion behavior:

- disable Lenis,
- remove nonessential transforms,
- remove long transitions,
- keep all content visible.

Cursor sway is limited to fine pointers, moves the full foreground layer no more than 8px horizontally or 6px vertically, uses a soft trailing ease, and never applies to the fixed background media.

## Focus and Interaction

Use a visible focus indicator:

```css
:where(a, button, input, textarea, select):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

Hover may enhance an element, but focus must expose the same action.

## Component Rules

- Build a component for repeated real patterns, not hypothetical reuse.
- Project cards should have consistent information order.
- Chips are metadata, not primary calls to action.
- Buttons must look interactive.
- External links indicate they leave the site when useful.
- Do not put cards inside cards without a functional reason.

## Visual Acceptance Criteria

- Hero text is readable on desktop and mobile crops.
- The site still makes sense with blur unsupported.
- No horizontal overflow at 360px.
- Focus is visible.
- Reduced-motion mode is calm and usable.
- Project screenshots are inspectable.
- The page does not look like an exact clone of the reference.
