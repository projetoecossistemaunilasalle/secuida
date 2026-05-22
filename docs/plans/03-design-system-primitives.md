# Design System Primitives Plan

## Goal

Extract the repeated UI patterns already present in the prototype into a small reusable design-system layer.

## Source Context

Front 03 requires a calm, human, non-clinical visual system with accessible primitives, reusable cards/buttons/badges, and no expanded dependency on fragile remote generated images.

## Target Files

```txt
src/design-system/components/Button.tsx
src/design-system/components/Card.tsx
src/design-system/components/Badge.tsx
src/design-system/components/Page.tsx
src/design-system/components/PageHeader.tsx
src/design-system/components/ActionCard.tsx
src/design-system/components/SupportContactCard.tsx
src/design-system/components/ServiceCard.tsx
src/design-system/styles/tokens.css
```

## RED-GREEN-REFACTOR Steps

### Step 1: Base Primitive Contract

**RED:** Ask a subagent to identify duplicated button, card, badge, and page spacing classes across current screens.

**GREEN:** Ask a worker subagent to create `Button`, `Card`, `Badge`, `Page`, and `PageHeader`.

**REFACTOR:** Ask a review subagent to inspect focus states, disabled states, touch targets, and text wrapping.

### Step 2: Home Actions

**RED:** Ask a subagent to locate repeated Home action button markup and document the shared props.

**GREEN:** Ask a worker subagent to create `ActionCard` and refactor Home to use it.

**REFACTOR:** Ask a review subagent to confirm the three entry paths remain equal weight and route to the correct screens.

### Step 3: Support Cards

**RED:** Ask a subagent to compare CVV, SAMU, and Bombeiros markup and identify shared structure.

**GREEN:** Ask a worker subagent to create `SupportContactCard` and render support contacts from data.

**REFACTOR:** Ask a review subagent to verify phone links remain `tel:` links, immediate support is not red-first, and the tone stays calm.

### Step 4: Service Cards

**RED:** Ask a subagent to compare contact directory cards and identify repeated fields.

**GREEN:** Ask a worker subagent to create `ServiceCard` and render services from structured content.

**REFACTOR:** Ask a review subagent to verify badges, address/phone/hours/notes, and responsive card layout remain readable.

## Acceptance Criteria

- Repeated card/button patterns are componentized.
- Home, support, and contacts use shared primitives.
- Components expose accessible native elements.
- New screens do not need to invent basic card or button styling.
- The existing green/blue/soft-surface visual direction remains recognizable.
