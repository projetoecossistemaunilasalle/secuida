# Fronts 01-04 Implementation Plans

These plans turn the existing SeCuida prototype into a routed, feature-organized, content-driven PWA foundation.

They consolidate:

- `docs/PRD.md`
- `docs/Project-Context.md`
- `docs/fronts/README.md`
- Fronts `01` through `04` and their `A` breakdowns
- the current React/Vite app structure

## Plan Files

| Domain | File |
|---|---|
| Routing, app shell, and PWA foundation | [`01-routing-app-shell-pwa.md`](./01-routing-app-shell-pwa.md) |
| Folder ownership and feature boundaries | [`02-folder-structure-feature-boundaries.md`](./02-folder-structure-feature-boundaries.md) |
| Design system and reusable UI primitives | [`03-design-system-primitives.md`](./03-design-system-primitives.md) |
| Typed content and data modeling | [`04-content-data-modeling.md`](./04-content-data-modeling.md) |
| Guided flow and constrained chatbot framework | [`05-guided-flow-chatbot-framework.md`](./05-guided-flow-chatbot-framework.md) |

## Required Execution Method

Every implementation step in these plans must use a RED-GREEN-REFACTOR loop and should explicitly delegate bounded work to subagents when the environment supports them.

Use the loop this way:

1. **RED**: ask a subagent to add or update the smallest failing test, type assertion, smoke check, or documented acceptance check for the step.
2. **GREEN**: ask a worker subagent to implement only the code needed to satisfy that failing check.
3. **REFACTOR**: ask a separate review/refactor subagent to inspect the changed files for duplication, accessibility, privacy drift, and architectural leakage.

Subagents should receive narrow ownership. They must not revert unrelated edits, and they must report changed paths.

## Global Guardrails

- Do not add login, accounts, backend behavior, analytics, localStorage, saved answers, saved chat transcripts, or location persistence.
- Keep routes calm and Portuguese-first. Use `/apoio`, not `/crise`.
- Keep the app mobile-first and preserve bottom navigation.
- Keep domain/content modules independent from React.
- Treat all support, service, resource, and mental-health copy as reviewable content.
- Run `npm run lint` and `npm run build` before merging each completed slice.
