# Blog

## Goal

Add a blog page for notes, project writeups, learning logs, and AI/data/backend experiments.

## V1 Scope

- Blog index route: `/blog`.
- Static post metadata in a local data file.
- Optional inline post body or external markdown later.
- No CMS.
- No search in V1.

## Post Model

| Field | Rule |
| --- | --- |
| `title` | Required. |
| `slug` | Required, URL-safe. |
| `date` | ISO date string. |
| `excerpt` | 1-2 short sentences. |
| `tags` | Short array. |
| `body` | Optional for V1. |

## Layout

- Compact list, not a heavy card grid.
- Date/tag metadata in small text.
- First featured post can be highlighted with a glass panel.

## Later

Add per-post routes only after there are enough posts to justify it.
