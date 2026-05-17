# Chatbot Typing Indicator Design

## Summary

Add a "..." typing indicator with bouncing-dot animation to the Orientação chatbot. Bot responses currently appear instantly after user selections; this adds a ~1.2s delay with a visual indicator to make the conversation feel more natural.

## Decisions

| Aspect | Decision |
|---|---|
| Approach | Staged rendering — engine runs immediately, component controls message visibility |
| Delay | `TYPING_DELAY_MS = 1200` constant |
| Animation | Bouncing dots (3 dots, sequential bounce) |
| Batching | One typing indicator per batch, all bot messages appear together |
| Initial load | Typing indicator shows before first greeting |
| User messages | Instant (no delay) |
| Flow engine | Unchanged |
| Accessibility | `aria-hidden` on indicator, existing `aria-live="polite"` handles message announcements |
| Auto-scroll | Scrolls on both transcript changes and `visibleCount` changes |

## Architecture

### Why staged rendering

The flow engine's `advanceFlow()` is a pure synchronous function that produces **both** user and bot messages in one call. We cannot add the user message separately without duplicating it or modifying the engine. Instead, the engine runs immediately (preserving its contract), and the component controls which messages are **visible** to the user.

### Current flow

```
User selects option → submitOption() → advanceFlow() → all messages appear instantly
```

### New flow

```
User selects option
  → advanceFlow() called immediately (adds user + bot messages to state)
  → visibleCount set to transcript length BEFORE advance (shows user message only)
  → typing indicator shown at bottom
  → setTimeout(TYPING_DELAY_MS)
  → visibleCount updated to full transcript length (bot messages revealed)
```

### Initial load

```
Component mounts
  → transcript empty, typing indicator shown
  → setTimeout(TYPING_DELAY_MS)
  → createInitialFlowStateFromRegistry() called → all messages appear
```

## Component Changes (OrientationScreen.tsx)

### New constant

```ts
const TYPING_DELAY_MS = 1200
```

### New state

```ts
const [visibleCount, setVisibleCount] = useState(0)
const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
```

`visibleCount` tracks how many messages from `state.transcript` are currently visible. When it's less than `state.transcript.length`, the extra messages are bot messages waiting to be revealed (typing indicator shows instead).

### TypingIndicator component

A visual indicator rendered at the bottom of the transcript when `visibleCount < state.transcript.length`:

- Same bot avatar as regular bot messages (MessageCircle icon in primary-colored circle)
- Same green (`#EEF8F3`) bubble background and rounded shape
- Three dots with bouncing animation inside the bubble
- `aria-hidden="true"` on the animated dots (decorative — actual messages announced via existing `aria-live="polite"`)

### Transcript rendering change

```ts
// Before:
{state.transcript.map((message) => (
  <MessageBubble key={message.id} message={message} />
))}

// After:
{state.transcript.slice(0, visibleCount).map((message) => (
  <MessageBubble key={message.id} message={message} />
))}
{visibleCount < state.transcript.length && <TypingIndicator />}
```

### Initial load useEffect

```ts
useEffect(() => {
  typingTimerRef.current = setTimeout(() => {
    const initialState = createInitialFlowStateFromRegistry(flows, 'work-stress')
    setState(initialState)
    setVisibleCount(initialState.transcript.length)
  }, TYPING_DELAY_MS)

  return () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
  }
}, [])
```

### submitOption changes

```ts
const submitOption = (option: RuntimeOption) => {
  // 1. Clear any pending timer
  if (typingTimerRef.current) clearTimeout(typingTimerRef.current)

  // 2. Run engine immediately — adds user + bot messages to state
  const preAdvanceCount = state.transcript.length
  setState(current => advanceFlow(current, flows, option.label))

  // 3. Show user message immediately, bot messages hidden behind typing indicator
  setVisibleCount(preAdvanceCount + 1) // +1 for the user message advanceFlow just added

  // 4. After delay, reveal bot messages
  typingTimerRef.current = setTimeout(() => {
    setVisibleCount(prev => {
      // Use functional update to get the latest transcript length
      // visibleCount should match the full transcript after advanceFlow
      return prev // will be synced via a separate effect below
    })
  }, TYPING_DELAY_MS)
}
```

**Simpler alternative for step 4** — since `state` already has the full transcript after `advanceFlow`, we can capture it in a closure:

```ts
const submitOption = (option: RuntimeOption) => {
  if (typingTimerRef.current) clearTimeout(typingTimerRef.current)

  setState(current => {
    const newState = advanceFlow(current, flows, option.label)
    const totalMessages = newState.transcript.length

    // Show user message now, bot messages after delay
    setVisibleCount(current.transcript.length + 1)

    typingTimerRef.current = setTimeout(() => {
      setVisibleCount(totalMessages)
    }, TYPING_DELAY_MS)

    return newState
  })
}
```

This captures `totalMessages` in the closure from the state update, ensuring `visibleCount` reaches the correct value.

### Unmount cleanup useEffect

```ts
useEffect(() => {
  return () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
  }
}, [])
```

### Auto-scroll useEffect

Add `visibleCount` to the dependency array so the view scrolls down to show the typing indicator and newly revealed messages:

```ts
useEffect(() => {
  const log = transcriptRef.current
  if (log) log.scrollTop = log.scrollHeight
}, [state.transcript, visibleOptions.length, visibleCount])
```

## Animation CSS

```css
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: #6b7280;
  border-radius: 50%;
  display: inline-block;
  animation: typing-bounce 1.2s infinite ease-in-out;
}
```

Each dot gets a staggered `animation-delay`: `0s`, `0.15s`, `0.3s`.

## Cleanup

Both timeout paths (initial load and user selection) use a shared `typingTimerRef`. The initial load's useEffect return and a dedicated unmount useEffect both clear the ref to prevent state updates on unmounted components.

## Files Modified

- `src/features/orientation/OrientationScreen.tsx` — all changes are in this single file

## Scope

- No changes to the flow engine (`src/domain/flow-engine/`)
- No changes to flow content (`src/content/flows/`)
- No new dependencies (CSS animation only, `motion/react` not needed for this)
- No changes to tests in this spec (test updates handled during implementation)
