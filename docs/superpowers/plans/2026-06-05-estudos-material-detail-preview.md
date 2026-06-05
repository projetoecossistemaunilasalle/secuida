# Estudos Material Detail Preview Split Plan Index

The original single implementation plan was intentionally split so logic/data work and UI/UX work can be executed by different workers or model profiles.

Use these plans in order:

1. `docs/superpowers/plans/2026-06-05-estudos-material-detail-logic.md`
   - Data model, featured-image catalog, validation, seed content, draft preview resolver, video URL parsing, export coverage.

2. `docs/superpowers/plans/2026-06-05-estudos-material-detail-ui.md`
   - Public Estudos detail UI, preview warning banners, dashboard image/body editor, reorder controls, focus retention, UI verification.

The UI plan depends on the logic plan. Do not execute the UI plan first.
