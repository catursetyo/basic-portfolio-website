# Project Rules

## Goal

Redesign the portfolio into a personal, cinematic, akryst-inspired site that presents Catur Setyo Ragil as a data scientist, AI engineer, backend developer, and IT student.

## Required Features

- Home page with a strong hero and one featured repo/project.
- Project showcase page with project cards/detail views.
- Blog page.
- Resume page or route that redirects to the CV file.
- Guestbook for visitors with one-level replies and likes.
- View counter using Abacus when possible.
- Contact/social section.

## Visual Rules

- Reference akryst.moe for mood, layout rhythm, and interaction style.
- Do not copy akryst assets, names, CSS wholesale, character imagery, or site identity.
- Use restrained glassmorphism: translucent dark surfaces, thin borders, blur only where it improves depth.
- Keep the site dark, readable, and image-led.
- Avoid turning every section into a glass card. Hero imagery and spacing carry the page.

## Technical Rules

- Keep Vite + React. Do not migrate to Next.js just because akryst appears to use Next.js.
- Keep Tailwind and Framer Motion already in the project.
- Prefer native browser APIs for routing, redirect, and fetch logic until the site genuinely outgrows them.
- No new UI kit.
- No backend except the small API needed for guestbook persistence, replies, likes, moderation, or secret-backed counters.

## Content Rules

- Featured project on home should be one real project, not a generic stat block.
- Blog may start with static markdown-like data inside the repo.
- Resume route must fail gracefully if the CV file is missing.
- Guestbook must make clear whether messages/replies are live, pending moderation, or temporarily unavailable.

## Non-Goals

- No dashboard/admin panel in the first redesign.
- No full CMS in the first redesign.
- No music integration unless explicitly requested later.
- No account system.
- No exact clone of akryst.
