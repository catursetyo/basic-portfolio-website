# Resume

## Goal

The `/resume` route gives visitors a reliable way to view Catur's current CV.

## Preferred V1

Place a versioned public PDF in `public/`, for example:

```text
public/catur-setyo-ragil-cv.pdf
```

Then redirect or provide a clear open/download action.

An external public URL may be used through:

```text
VITE_RESUME_URL=
```

Do not expose private storage URLs that expire unexpectedly.

## Behavior

When configured:

- `/resume` redirects or renders a simple resume landing page.
- Provide a visible fallback link if automatic redirect is blocked.

When missing:

- Show visitor-facing copy such as “My resume is being updated.”
- Provide contact email or social links.
- Do not show environment-variable setup instructions.

## Metadata

Resume links should use the formal name `Catur Setyo Ragil`.

## Acceptance Criteria

- The PDF opens in a new browser session.
- Direct loading of `/resume` works.
- Missing configuration has a public fallback.
- The route does not loop.
- The file name and documentation match.
- Mobile visitors can access the file.
