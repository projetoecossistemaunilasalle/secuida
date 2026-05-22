# Front 14 — Dashboard Readiness

## Goal

Prepare the app so a future dashboard can edit flows, resources, services, and copy without requiring a frontend refactor.

The dashboard itself is out of scope for now.

---

## Principle

Anything editorial should be represented as structured data.

Avoid hardcoding editorial decisions into TypeScript functions.

---

## Dashboard-Ready Data

Future editable data:

```txt
flow metadata
flow entering phrases
flow nodes
flow options
transition messages
questionnaire questions
scoring rules
safety rules
resources
service directory
home copy
privacy copy
support contacts
```

---

## Avoid Executable Content

Do not use code-like strings in JSON.

Bad:

```json
{
  "next": "(score) => score > 7 ? 'high' : 'low'"
}
```

Good:

```json
{
  "result_rules": [
    {
      "if": {
        "score_gte": 7
      },
      "go_to": "possible-distress"
    }
  ]
}
```

---

## Required Metadata

Dashboard-ready records should include:

```txt
id
version
status
locale
created_at
updated_at
review status
```

Even if `created_at` and `updated_at` are initially static, the model should anticipate them.

---

## Acceptance Criteria

- Flow JSON requires no code changes for content edits.
- Resource JSON requires no code changes for content edits.
- Service JSON requires no code changes for content edits.
- Status/review fields exist.
- IDs are stable.
- Conditions are declarative, not executable code.
