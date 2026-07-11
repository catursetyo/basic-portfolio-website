# Blog

## Purpose

The Blog contains real technical notes, project case studies, competition write-ups, and learning records. It is not required to make the portfolio look complete.

## Navigation Rule

The user has explicitly chosen to expose Blog in the hero and primary navigation before the first post is published.

When no post exists:

- keep `/blog` reachable,
- render the existing empty archive without fabricated posts,
- do not add filler merely to populate the page.

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

- Blog remains reachable from the hero and primary navigation.
- Direct loading of a post works.
- Unknown slug is handled.
- Dates format consistently.
- Mobile typography is readable.
- Empty state is intentional.
