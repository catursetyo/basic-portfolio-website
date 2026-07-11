# ADR 005 — Use Optimized Video Sources for the Hero

Status: Accepted

## Context

The still hero established the layout and contrast treatment. Optimized 1080p WebM and MP4 exports are now available with a matching WebP poster.

## Decision

Use the WebM VP9 source first and MP4 H.264 as fallback. The decorative video autoplays muted, loops inline, has no audio stream, and uses the poster while loading or when playback is unavailable.

Reduced-motion users receive only the poster; the video element is not rendered.

## Consequences

- WebM transfer size is about 1.57 MB.
- MP4 fallback size is about 2.77 MB.
- The poster remains the social image and visual fallback.
- Text readability still depends on the existing dark overlays and responsive crop.

## Revisit When

Re-encode or restore a still-only hero if production performance measurements show unacceptable loading, battery, or playback cost.
