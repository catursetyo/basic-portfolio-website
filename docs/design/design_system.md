# Design System

## Direction

Reference: akryst.moe.

Interpretation: cinematic dark personal archive with restrained glassmorphism.

Homepage layout target: match the akryst scroll rhythm. The home route is a long-scroll composition, not a dashboard:

1. Full-viewport hero with fixed scenic background, left-aligned identity, small metadata, vertical menu, and visit counter at the lower right.
2. About/social row appears over the same background as the visitor scrolls.
3. Work/project cards follow as compact glass panels.
4. Guestbook lives at the lower part of the homepage.

Do:

- Full-bleed hero imagery or video-like treatment.
- Soft dark overlays.
- Small metadata text.
- Thin separators.
- Compact glass panels.
- Calm motion and hover tilt.

Do not:

- Copy akryst identity.
- Use akryst assets or character art.
- Use the owner's portrait as the hero background.
- Make every block a glass card.
- Use bright frosted-white glass.
- Keep the current brutalist black/white grid as the dominant system.

## Color Tokens

Use OKLCH tokens when implementing the redesign:

```css
:root {
  --bg: oklch(0.16 0.018 270);
  --bg-deep: oklch(0.11 0.016 270);
  --surface: oklch(0.22 0.02 270);
  --surface-soft: oklch(0.26 0.018 260);
  --text: oklch(0.93 0.012 255);
  --muted: oklch(0.68 0.018 255);
  --faint: oklch(0.5 0.018 255);
  --line: oklch(0.92 0.012 255 / 0.1);
  --accent: oklch(0.75 0.11 235);
  --accent-warm: oklch(0.78 0.12 75);
}
```

This keeps the site dark without becoming one-note slate.

## Glass Tokens

```css
.glass {
  background: oklch(0.24 0.018 265 / 0.52);
  border: 1px solid oklch(0.95 0.01 255 / 0.09);
  backdrop-filter: blur(18px);
}
```

Use glass for:

- Navigation.
- Project cards.
- Guestbook messages.
- Counter/status chips.
- Small social panels.

Avoid glass for:

- Full sections.
- Main body background.
- Every nested child element.

## Typography

V1 uses the installed `Space Grotesk` to avoid a new dependency.

Roles:

- Display: Space Grotesk 600-700, tight but readable.
- Body: Space Grotesk 300-400.
- Metadata: system monospace.

If the design feels too far from akryst after implementation, consider one font addition later for condensed labels.

## Layout

- Hero should occupy the first viewport and scroll into about/social content over the same background.
- Homepage sections after the hero should keep akryst-like centered widths: about/social row, work grid, then guestbook/side content.
- Keep content max width around `1100px` to `1200px`.
- Use two-column layouts on desktop and single-column on mobile.
- Use cards only for repeated items or functional panels.
- Section spacing should breathe: larger top/bottom spacing, tighter internal groups.

## Motion

- First-load transition should be short.
- Hero content can reveal once.
- Cards may tilt or brighten subtly on hover.
- Reduced motion should remove transforms and long transitions.

## Imagery

- Use existing project screenshots for project cards.
- Use `profile.png` only as a small avatar, never as full hero background.
- Use a non-personal generated/curated scenic asset later if the abstract CSS background feels too thin.
