# Front 05 — Guided Flow / Chatbot Framework

## Goal

Create a generic, JSON-driven guided conversation framework.

The system should feel like a chat, but it is not AI and should not pretend to be AI. All user inputs are constrained to predefined options.

---

## Core Principle

TypeScript owns the engine.

JSON owns the flows.

React owns the rendering.

```txt
Flow JSON
  → schema validation
  → deterministic runtime engine
  → UI adapter
  → chat screen
````

---

## Flow File Model

Each flow should be a standalone JSON-compatible document.

Example:

```json
{
  "id": "work-stress",
  "version": "1.0.0",
  "locale": "pt-BR",
  "title": "Estresse no trabalho",
  "type": "guided_conversation",
  "status": "draft",
  "entry": {
    "node_id": "start",
    "entering_phrases": [
      "Estou sobrecarregado no trabalho",
      "Tenho muito estresse na escola",
      "Não estou dando conta das demandas"
    ],
    "transition_message": "Entendi. Vamos olhar para essa sobrecarga com calma."
  },
  "nodes": {
    "start": {
      "kind": "choice",
      "text": "O que mais tem pesado para você no trabalho?",
      "options": [
        {
          "id": "too-many-tasks",
          "label": "Muitas tarefas ao mesmo tempo",
          "next": "tasks-response"
        }
      ]
    }
  }
}
```

---

## Entering Phrases

Each flow declares its own public entry phrases.

The engine should not infer production entry phrases from internal options.

A development audit script may suggest missing or duplicate phrases, but editorial control should stay explicit.

Autocomplete should merge:

```txt
current node options
+ entering phrases from other flows
+ global support/navigation actions
```

---

## Flow Switching

If the user selects an entering phrase from another flow:

1. Current flow is suspended.
2. Current progress remains in memory.
3. New flow starts from its entry node.
4. Bot emits the target flow transition message.
5. When the new flow ends, the app may gently offer to resume the previous flow, unless a safety rule prevents it.

---

## Global Actions

Global actions should always be available in the option system, but not necessarily visually dominant.

Examples:

```txt
Quero apoio agora
Ver contatos
Ver materiais educativos
Encerrar por enquanto
```

The route target for immediate support should be `/apoio`, not `/crise`.

---

## Engine Modules

```txt
src/domain/flow-engine/
  types.ts
  loadFlows.ts
  validateFlow.ts
  resolveOptions.ts
  advanceFlow.ts
  suspendFlow.ts
  resumeFlow.ts
  scoreFlow.ts
  safetyRules.ts
```

---

## Runtime State

```ts
type FlowRuntimeState = {
  activeFlowId?: string;
  activeNodeId?: string;
  transcript: ChatMessage[];
  suspendedFlows: Record<string, SuspendedFlowState>;
  answers: Record<string, unknown>;
  scores: Record<string, number>;
  safetyFlags: Record<string, boolean>;
};
```

Privacy decisions may later restrict whether this can be stored beyond memory.

Until Privacy/LGPD verification, treat this as in-memory session state only.

---

## Acceptance Criteria

* A new flow can be added without editing React components.
* Flow switching works through `entering_phrases`.
* Current node options and flow entry options appear together in autocomplete.
* The engine has no React dependency.
* Invalid flow JSON fails validation before runtime.
* Future dashboard can edit the same shape.