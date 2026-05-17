---
title: Direct Send on Bubble Click
date: 2026-05-16
status: approved
---

# Direct Send on Bubble Click

## Problem

On the Orientação page, when a user clicks a suggestion bubble, the text fills the input field but does not send. The user must then press the Send button to submit. This extra step is unnecessary — the user has already made their choice.

## Goal

Clicking a bubble should immediately send the message and advance the flow, skipping the intermediate input-fill step.

## Design

### Behavioral change

**Before**: Click bubble → input fills with label → user presses Send → message sent, flow advances.

**After**: Click bubble → message sent directly, flow advances, input cleared.

### Implementation

**File**: `src/features/orientation/OrientationScreen.tsx`

Replace the `selectOption` function body (lines 49-51):

```ts
// Before
function selectOption(option: RuntimeOption) {
  setInputValue(option.label);
}

// After
function selectOption(option: RuntimeOption) {
  submitOption(option);
}
```

`submitOption` already handles all three paths:
- `global_action` with non-end target → navigates (e.g., `/apoio`)
- All other options → calls `advanceFlow`, clears input
- Input is cleared via `setInputValue('')` inside `submitOption`

### Unchanged behavior

- Text input remains visible and functional
- Typing still filters bubbles via substring match
- Send button still requires exact match to enable
- Bubble visibility filtering (exact match hides, partial text filters) unchanged
- All flow engine logic (advance, suspend, resume, scoring) unchanged

### Test updates

The existing test "fills the input when the user chooses an available option and only advances after send" must be updated:
- Assert that clicking a bubble immediately advances the flow (bot message appears)
- Assert that the input is cleared after clicking
- Remove assertions about input being filled with the option label
- Remove assertions about needing to press Send after selecting a bubble

## Scope

Single function body change in `OrientationScreen.tsx` + test updates. No new files, no new dependencies, no architectural changes.
