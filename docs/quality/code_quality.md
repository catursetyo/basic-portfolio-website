# Code Quality

## Standards

- Keep components small and readable.
- Move repeated content into data files.
- Keep visual effects opt-in and reduced-motion aware.
- Avoid layout shifts from hover, loading text, counters, or images.
- Use semantic elements: `main`, `nav`, `section`, `article`, `form`.

## Accessibility

- Body text contrast must be readable on dark/glass surfaces.
- Interactive elements need visible focus states.
- Forms need labels, validation messages, and disabled/loading states.
- Motion must respect `prefers-reduced-motion`.
- Images need useful alt text unless decorative.

## External Data

Every fetch helper should return a safe fallback:

- Counter failure shows no number or `--`, not a crash.
- Guestbook failure keeps existing page usable.
- Blog static data should render without network.

## Verification

Run these before finishing implementation work:

```bash
npm run build
npm run lint
```

Also verify manually:

- Desktop and mobile layout.
- Navigation between routes.
- Resume redirect.
- Guestbook empty/loading/error states.
- Counter error state.

## Review Checklist

- No copied akryst source or assets.
- No new dependency without a reason.
- No all-glass page soup.
- No unreadable muted text.
- No giant cards inside cards.
- No hidden required content behind animations.
