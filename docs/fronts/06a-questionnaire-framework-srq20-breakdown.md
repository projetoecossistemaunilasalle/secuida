# Front 06A — Questionnaire Framework & SRQ-20 Breakdown

## Purpose

This document breaks down the sixth implementation task for SeCuida.

It is derived from:

- `docs/Project-Context.md`
- `docs/PRD.md`
- `docs/fronts/06-questionnaire-framework-srq20.md`
- `docs/fronts/05a-guided-flow-chatbot-framework-breakdown.md`

The goal is to extend the guided-flow framework with generic questionnaire behavior and use SRQ-20 as the first real validation case, without hardcoding SRQ-20 into React components.

---

## Current State

After Front 05A, SeCuida should have a generic flow schema, runtime engine, constrained chat UI, and at least one non-questionnaire flow. It still needs questionnaire-specific concepts: consent, fixed question sets, scoring, thresholds, safety interruption, and result recommendations.

---

## Target Shape

A questionnaire is a specialized flow type.

```txt
questionnaire content
  → generic questionnaire schema
  → scoring and safety engine
  → guided-flow runtime
  → Orientation UI
```

SRQ-20 proves the framework; it is not the framework itself.

---

## Questionnaire Model

Add questionnaire-oriented types under:

```txt
src/domain/questionnaires/
  types.ts
  questionnaireSchema.ts
  validateQuestionnaire.ts
  scoreQuestionnaire.ts
  resolveQuestionnaireResult.ts
```

Questionnaire content should remain JSON-compatible and include consent, instrument metadata, fixed question IDs, answer options, scoring method, thresholds, interruption rules, recommendations, and non-diagnostic result copy.

---

## SRQ-20 Required Behavior

- The user is clearly told this is SRQ-20.
- Consent is required before questions begin.
- There are 20 yes/no questions.
- Affirmative answers are scored.
- Score `>= 7` maps to a possible-distress support result.
- Result copy avoids diagnostic language.
- Suicidal ideation affirmative answer interrupts immediately.
- Interruption routes/surfaces immediate support at `/apoio`.
- Interrupted SRQ-20 is not offered for resumption.

---

## Implementation Slices

### PR 06A — Add Generic Questionnaire Types And Validation

Scope:

1. define questionnaire types;
2. extend flow validation for questionnaire flows;
3. require consent metadata for questionnaire flows;
4. validate fixed question IDs and next references;
5. add tests for valid and invalid questionnaire fixtures.

Acceptance criteria:

- questionnaire validation is generic;
- a questionnaire without consent fails validation;
- broken question references fail validation;
- no SRQ-20-specific React logic is introduced.

### PR 06B — Add Generic Scoring And Result Mapping

Scope:

1. implement sum-affirmative scoring;
2. implement threshold result resolution;
3. map results to resource/recommendation IDs;
4. test score bands and recommendation mapping.

Acceptance criteria:

- scoring runs outside React;
- score `>= 7` can map to a configured result;
- another questionnaire could reuse the same scoring path.

### PR 06C — Add Safety Interruption Rules

Scope:

1. implement declarative interruption rules;
2. support route/action destinations such as `/apoio`;
3. mark interrupted flows as non-resumable when configured;
4. test affirmative suicidal-ideation interruption.

Acceptance criteria:

- safety rules are declarative content;
- Q17 affirmative interrupts immediately;
- interrupted SRQ-20 is not resumable;
- no sensitive answer data is persisted.

### PR 06D — Add SRQ-20 Content And UI Integration

Scope:

1. add SRQ-20 questionnaire content under `src/content/flows/srq20.ts` or `src/content/questionnaires/srq20.ts`;
2. register it with the flow registry;
3. expose it from Orientation entry options;
4. render consent, questions, interruption, and results through existing guided-flow UI;
5. add full SRQ-20 tests.

Acceptance criteria:

- SRQ-20 is represented as structured content;
- all 20 questions are present;
- consent is required;
- score and interruption behavior matches the PRD;
- result copy is supportive and non-diagnostic.

---

## Files Expected To Change First

```txt
src/domain/questionnaires/types.ts
src/domain/questionnaires/questionnaireSchema.ts
src/domain/questionnaires/validateQuestionnaire.ts
src/domain/questionnaires/scoreQuestionnaire.ts
src/domain/questionnaires/resolveQuestionnaireResult.ts
src/domain/flow-engine/advanceFlow.ts
src/domain/flow-engine/safetyRules.ts
src/content/flows/registry.ts
src/content/flows/srq20.ts
src/features/orientation/OrientationScreen.tsx
src/tests/questionnaires/*.test.ts
```

---

## Risks and Guardrails

### Risk: diagnosis language

Guardrail: use wording such as “pode indicar sofrimento emocional” and never present a diagnosis.

### Risk: hardcoding SRQ-20

Guardrail: scoring, consent, thresholds, and interruption rules must be generic domain behavior.

### Risk: unsafe persistence

Guardrail: do not save answers, scores, transcripts, or interrupted state outside the active in-memory session.

### Risk: safety destination becoming alarmist

Guardrail: route to `/apoio` and preserve calm support copy and design treatment.

---

## Validation Commands

```bash
npm run lint
npm run test
npm run build
```

---

## Definition of Done

Front 06A is done when SRQ-20 runs as structured questionnaire content through generic domain logic, has automated tests for validation, scoring, thresholds, consent, and safety interruption, and preserves SeCuida's privacy and non-diagnostic product commitments.

