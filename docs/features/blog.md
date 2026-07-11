# Blog

## Purpose

The Blog contains real technical notes, project case studies, competition write-ups, and learning records. It is not required to make the portfolio look complete.

## Launch Rule

Blog may appear in primary navigation only when at least one useful published post exists.

When no post exists:

- hide Blog from primary navigation, or
- render a deliberate public empty state.

Do not render an unexplained empty grid.

## Content Rules

Allowed:

- project architecture notes,
- backend or database lessons,
- AI experiments,
- CTF write-ups that do not expose active competition flags or unsafe secrets,
- coursework reflections,
- deployment and debugging notes.

Avoid:

- generated filler,
- copied tutorials,
- invented experience,
- shallow summaries written only for SEO.

## Data

Static V1 posts may live in `src/data/posts.js`.

Required fields:

```js
{
  slug,
  title,
  date,
  excerpt,
  tags,
  sections,
  published
}
```

Only render `published: true` in production.

## Routes

- `/blog`
- `/blog/:slug`

Unknown slugs must show NotFound or a clear missing-post state.

## Accessibility

- Use an `article` element for a post.
- Keep line length readable.
- Use hierarchical headings.
- Link text must be descriptive.
- Code blocks must be horizontally scrollable without breaking the page.

## Acceptance Criteria

- At least one real post exists before primary navigation exposure.
- Direct loading of a post works.
- Unknown slug is handled.
- Dates format consistently.
- Mobile typography is readable.
- Empty state is intentional.
