# Content And Data Modeling Plan

## Goal

Move reviewable product content out of JSX and into typed, JSON-compatible modules that can later become validated JSON or dashboard-managed data.

## Source Context

Front 04 requires stable IDs, metadata, review metadata where relevant, and separation of content from React rendering.

## Target Files

```txt
src/domain/content/types.ts
src/domain/copy/types.ts
src/domain/resources/types.ts
src/domain/services/types.ts
src/domain/support/types.ts
src/content/copy/home.ts
src/content/support/contacts.ts
src/content/services/canoas-services.ts
src/content/resources/resources.ts
src/content/flows/registry.ts
```

## RED-GREEN-REFACTOR Steps

### Step 1: Shared Metadata Types

**RED:** Ask a subagent to find every content collection that currently lacks stable IDs, locale, status, version, or review metadata.

**GREEN:** Ask a worker subagent to create shared `ContentMetadata`, `ReviewMetadata`, and per-domain content types.

**REFACTOR:** Ask a review subagent to check the types stay serializable and do not depend on React.

### Step 2: Home Copy

**RED:** Ask a subagent to list Home copy embedded in JSX and identify action labels/descriptions.

**GREEN:** Ask a worker subagent to move Home copy into `src/content/copy/home.ts` and render from it.

**REFACTOR:** Ask a review subagent to verify privacy/anonymity language remains accurate and does not imply saved progress.

### Step 3: Support Contacts

**RED:** Ask a subagent to list support contact content and phone link requirements.

**GREEN:** Ask a worker subagent to move CVV, SAMU, and Bombeiros data into `src/content/support/contacts.ts`.

**REFACTOR:** Ask a review subagent to verify all phone links retain display and `href` values, and review metadata is present.

### Step 4: Services

**RED:** Ask a subagent to list every Canoas service field currently embedded in JSX.

**GREEN:** Ask a worker subagent to move service entries into `src/content/services/canoas-services.ts`.

**REFACTOR:** Ask a review subagent to verify each service has stable ID, type, city/state, address, phone, optional hours/notes, and review metadata.

### Step 5: Resources And Flow Registry Placeholder

**RED:** Ask a subagent to identify current orientation result resource copy and confirm no full flow schema exists yet.

**GREEN:** Ask a worker subagent to move the resource recommendation into `src/content/resources/resources.ts` and add `src/content/flows/registry.ts` as a non-final placeholder.

**REFACTOR:** Ask a review subagent to confirm no SRQ-20 scoring, flow runtime, safety rules, or fake dashboard behavior was introduced.

## Acceptance Criteria

- Home, support, contact, and current resource content are no longer embedded directly in JSX.
- Content modules are plain data and JSON-compatible.
- Stable IDs exist for content collections and content items.
- Review metadata exists for support, service, and resource entries.
- Flow registry exists only as a placeholder for Front 05.
- No backend, analytics, persistence, flow engine, or questionnaire logic is introduced.

