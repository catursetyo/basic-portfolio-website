# Resume

## Goal

`/resume` redirects visitors to the CV file.

## File Location

Put the CV in `public/`, for example:

```text
public/cv-catur-setyo-ragil.pdf
```

## Behavior

- `/resume` redirects to the CV file.
- If the file is missing, show a small page with contact links instead of a broken navigation experience.
- External links to the resume should remain stable.

## Implementation Rule

Use native browser redirect logic. No routing package is needed for this alone.
