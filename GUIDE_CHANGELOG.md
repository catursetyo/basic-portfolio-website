# Guide Revision Changelog

## Included

- Rewritten root `AGENTS.md`.
- New `docs/STATUS.md`.
- Revised documentation index.
- Corrected product positioning and implementation priorities.
- Corrected current-state audit.
- Approved React Router based on the current route complexity.
- Corrected Lenis, reduced-motion, route, metadata, resume, Blog, guestbook, and counter guidance.
- Added objective acceptance criteria.
- Added mandatory agent completion report.
- Added decision records.
- Renamed `refractor_mapping.md` to `refactor_mapping.md`.

## Files to Replace

Copy the contents of this package into the repository root while preserving paths.

## File to Delete

```text
docs/architecture/refractor_mapping.md
```

It is replaced by:

```text
docs/architecture/refactor_mapping.md
```

## Existing Files Not Rewritten in This Package

The current feature-specific behavior is covered for Blog, Guestbook, Resume, and View Counter. Other source-code files are intentionally not modified by this documentation package.

## Recommended Commit

```bash
git add AGENTS.md docs GUIDE_CHANGELOG.md
git rm docs/architecture/refractor_mapping.md
git commit -m "docs: overhaul AI agent guide and sync redesign rules"
```

Run the `git rm` command only after confirming the old typo file exists and the corrected replacement has been copied.
