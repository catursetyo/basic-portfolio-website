# Portfolio Redesign Documentation

This directory contains the product, architecture, design, feature, and quality rules for the `v2-redesign` branch.

Start with the repository-level `AGENTS.md`, then read `STATUS.md`.

## Quick Read Order

1. [`../AGENTS.md`](../AGENTS.md)
2. [`STATUS.md`](STATUS.md)
3. [`product/project_rules.md`](product/project_rules.md)
4. [`product/system_overview.md`](product/system_overview.md)
5. The document governing the current task.

## Directory Map

| Area | File | Purpose |
| --- | --- | --- |
| Status | [`STATUS.md`](STATUS.md) | Current implementation state, gaps, next priorities, and blockers. |
| Product | [`product/project_rules.md`](product/project_rules.md) | Scope, audience, content truth, priorities, and non-goals. |
| Product | [`product/system_overview.md`](product/system_overview.md) | Current and target application shape, routes, and data. |
| Architecture | [`architecture/architecture.md`](architecture/architecture.md) | Frontend structure, routing, data boundaries, scrolling, and deployment. |
| Architecture | [`architecture/backend.md`](architecture/backend.md) | Minimal backend contract for guestbook and optional counter. |
| Architecture | [`architecture/refactor_mapping.md`](architecture/refactor_mapping.md) | Current-file to target-file migration map. |
| Audit | [`audit/current_state.md`](audit/current_state.md) | Audit of the reviewed `v2-redesign` snapshot. |
| Design | [`design/design_system.md`](design/design_system.md) | Brand, color, typography, layout, imagery, glass, motion, and responsive rules. |
| Dependencies | [`dependencies/dependency_rules.md`](dependencies/dependency_rules.md) | Allowed, approved, discouraged, and removable dependencies. |
| Features | [`features/blog.md`](features/blog.md) | Blog content and route behavior. |
| Features | [`features/guestbook.md`](features/guestbook.md) | Guestbook behavior, validation, persistence, moderation, and UI. |
| Features | [`features/resume.md`](features/resume.md) | Resume route and fallback behavior. |
| Features | [`features/view_counter.md`](features/view_counter.md) | Provider-neutral counter contract and graceful failure. |
| Implementation | [`implementation/roadmap.md`](implementation/roadmap.md) | Ordered phases and phase acceptance criteria. |
| Quality | [`quality/code_quality.md`](quality/code_quality.md) | Code, accessibility, performance, security, and verification requirements. |
| Decisions | [`decisions/README.md`](decisions/README.md) | Architectural decision records and their statuses. |

## Source-of-Truth Precedence

When documents disagree:

1. Current user instruction.
2. Accepted decision record.
3. Feature-specific document.
4. Product rules.
5. Design system.
6. Architecture.
7. Status or audit documents.
8. Old implementation comments.

Resolve the conflict and update the stale document in the same change.

## Documentation Maintenance

- Update `STATUS.md` whenever a feature moves between planned, in progress, done, blocked, or removed.
- Update a feature document when its visible behavior changes.
- Add or revise a decision record for architecture changes.
- Update `refactor_mapping.md` when files are moved, renamed, split, or deleted.
- Do not preserve a typo, obsolete route, or outdated statement for historical reasons; Git already stores history.

## Important Correction

The old file name `architecture/refractor_mapping.md` was a typo. The canonical path is now:

```text
docs/architecture/refactor_mapping.md
```

Delete the old file after the replacement is committed.
