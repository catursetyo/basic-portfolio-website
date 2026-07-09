# Portfolio Redesign Docs

This directory stores the planning rules for the portfolio redesign. Read this file first, then open the category doc that matches the work.

## Directory Map

| Area | File | Purpose |
| --- | --- | --- |
| Product | [product/project_rules.md](product/project_rules.md) | Scope, must-have features, non-goals, and product rules. |
| Product | [product/system_overview.md](product/system_overview.md) | Current site, target site, content model, and route inventory. |
| Architecture | [architecture/architecture.md](architecture/architecture.md) | Frontend architecture, routing, data flow, and integration boundaries. |
| Architecture | [architecture/backend.md](architecture/backend.md) | Minimal backend/API shape for guestbook, replies, likes, and counters. |
| Architecture | [architecture/refractor_mapping.md](architecture/refractor_mapping.md) | Current-file to target-file migration map. Name keeps the requested spelling. |
| Design | [design/design_system.md](design/design_system.md) | Visual direction, colors, glassmorphism rules, typography, layout, and motion. |
| Dependencies | [dependencies/dependency_rules.md](dependencies/dependency_rules.md) | What can be reused, what is banned, and when new dependencies are allowed. |
| Quality | [quality/code_quality.md](quality/code_quality.md) | Code standards, accessibility, test/build checks, and review checklist. |
| Features | [features/guestbook.md](features/guestbook.md) | Guestbook behavior and persistence options. |
| Features | [features/view_counter.md](features/view_counter.md) | View counter plan using Abacus. |
| Features | [features/blog.md](features/blog.md) | Blog route and content rules. |
| Features | [features/resume.md](features/resume.md) | Resume redirect route and CV file rules. |
| Audit | [audit/current_state.md](audit/current_state.md) | Current implementation audit before redesign. |
| Implementation | [implementation/roadmap.md](implementation/roadmap.md) | Phase-by-phase redesign plan. |

## Source Of Truth

- Product scope lives in `docs/product`.
- Visual decisions live in `docs/design/design_system.md`.
- Code movement lives in `docs/architecture/refractor_mapping.md`.
- Feature-specific behavior lives in `docs/features`.

If two docs disagree, prefer the more specific doc and update the older one.
