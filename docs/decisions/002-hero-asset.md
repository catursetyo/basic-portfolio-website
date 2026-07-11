# ADR 002 — Use an Original Still Hero Image in V1

Status: Accepted and implemented

## Context

The reference experience is strongly image-led. The previous implementation used CSS gradients, which were lightweight but looked generic.

A video hero would increase asset, playback, mobile, and accessibility complexity before the core portfolio content is complete.

## Decision

Use one original optimized still image as the V1 hero.

Requirements:

- original or properly licensed,
- not copied from the reference site,
- AVIF or WebP,
- safe focal point for desktop and mobile,
- dark overlay for text,
- meaningful fallback background,
- explicit dimensions or stable aspect behavior.

Implementation:

- File: `public/hero-data-garden.webp`.
- Dimensions: 1815 × 866.
- Approximate size: 156 KB.
- Subject: an original no-person blue-hour data garden with left-side copy space.

The profile avatar will not be used as a full-screen hero.

## Alternatives

### Keep gradients only

Allowed temporarily, but not considered the finished visual identity.

### Autoplay video

Deferred until the still-image version is complete and measured.

### Use the reference site's character imagery

Rejected.

## Consequences

- Faster and simpler initial load.
- Easier mobile crop control.
- Stronger original identity is still required through art direction.
- Video remains an optional later enhancement.

## Revisit When

Revisit after V1 content, accessibility, and performance checks pass.
