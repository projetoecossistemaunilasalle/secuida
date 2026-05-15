# Front 07A — Home, Philosophy & Onboarding Breakdown

## Purpose

This document breaks down the seventh implementation task for SeCuida.

It is derived from:

- `docs/Project-Context.md`
- `docs/PRD.md`
- `docs/fronts/07-home-philosophy-onboarding.md`
- `docs/fronts/04a-content-data-modeling-breakdown.md`
- `docs/fronts/11-privacy-lgpd-session.md`

The goal is to make Home clearly explain SeCuida's purpose, privacy posture, non-diagnostic nature, and main paths without creating persistence or a clinical intake feel.

---

## Current State

The prototype Home introduces confidentiality and three user choices, but the real product needs stronger trust-building, clearer philosophy, and an optional “Como funciona” onboarding-style section.

After Front 04A, Home copy may already live in `src/content/copy/home.ts`.

---

## Target Home Structure

1. warm welcome;
2. short philosophy statement;
3. privacy/trust strip;
4. three equal-weight entry paths;
5. “Como funciona” section;
6. quiet links to privacy and education content.

Home should answer what SeCuida is, whether it is anonymous, whether it is diagnostic, and what the user can do next.

---

## Onboarding Policy

Do not implement one-time onboarding persistence in this front.

Recommended first version:

- build onboarding as a regular Home section or route-accessible content;
- no `localStorage` completion flag;
- no cookies;
- no account or backend state;
- revisit persistence only after Privacy/LGPD policy approval.

---

## Implementation Slices

### PR 07A — Revise Home Content Model

Scope:

1. expand `src/content/copy/home.ts` with philosophy, trust strip, entry paths, and “Como funciona” copy;
2. add metadata/review fields where appropriate;
3. keep copy Portuguese-first and non-clinical.

Acceptance criteria:

- Home copy is content-driven;
- copy does not imply diagnosis or therapy;
- privacy claims are careful and not stronger than documented policy.

### PR 07B — Rebuild Home Layout

Scope:

1. render the stronger Home structure;
2. keep three primary paths equal-weight;
3. use design-system primitives from Front 03A;
4. preserve route targets for orientation, contacts, and support access.

Acceptance criteria:

- Home explains purpose within seconds;
- entry paths remain easy to tap on mobile;
- immediate support remains available through persistent navigation;
- no alarming visual hierarchy is introduced.

### PR 07C — Add Non-Persistent “Como Funciona” Experience

Scope:

1. add a “Como funciona” card/section;
2. explain privacy, non-diagnosis, guided orientation, resources, and professional support;
3. avoid completion state or “seen” persistence.

Acceptance criteria:

- onboarding-style information is accessible repeatedly;
- closing or reading it does not write persistent state;
- copy aligns with PRD privacy and safety principles.

---

## Files Expected To Change First

```txt
src/content/copy/home.ts
src/domain/copy/types.ts
src/features/home/HomeScreen.tsx
src/features/home/components/TrustStrip.tsx
src/features/home/components/HomeEntryPaths.tsx
src/features/home/components/HowItWorks.tsx
src/tests/home/*.test.tsx
```

---

## Risks and Guardrails

### Risk: overstating privacy

Guardrail: say the app is designed to preserve privacy; avoid absolute claims unless backed by implemented policy.

### Risk: making support path feel hidden

Guardrail: keep immediate support persistently available and visible through bottom navigation.

### Risk: one-time onboarding persistence too early

Guardrail: do not save onboarding completion in this front.

---

## Validation Commands

```bash
npm run lint
npm run test
npm run build
```

---

## Definition of Done

Front 07A is done when Home clearly communicates SeCuida's purpose, trust posture, non-diagnostic role, and main next steps through content-driven, mobile-first UI without introducing persistent onboarding state.
