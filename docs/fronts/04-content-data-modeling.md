# Front 04 — Content/Data Modeling

## Goal

Move product content out of JSX and into typed, validated, JSON-compatible structures.

This is essential for maintainability and future dashboard readiness.

---

## Content Types

SeCuida needs structured content for:

```txt
guided flows
questionnaires
support contacts
service directory
education resources
home/onboarding copy
privacy copy
navigation labels
```

---

## Why This Matters

The product depends heavily on trust and reviewed content. Embedded JSX makes it harder for product, design, clinical, and client stakeholders to review content.

A JSON-compatible content model makes it possible to later build a dashboard without refactoring the app.

---

## Proposed Content Folder

```txt
src/content/
  flows/
    registry.json
    srq20.json
    work-stress.json
    sleep-anxiety.json
    sadness-helplessness.json
    other.json

  resources/
    resources.json

  services/
    canoas-services.json
    national-services.json

  support/
    contacts.json
    breathing.json

  copy/
    home.json
    onboarding.json
    privacy.json
```

---

## Required Metadata

Every editable content object should have:

```json
{
  "id": "stable-id",
  "version": "1.0.0",
  "status": "draft",
  "locale": "pt-BR"
}
```

For clinically reviewed content:

```json
{
  "review": {
    "status": "pending_review",
    "reviewed_by": null,
    "reviewed_at": null,
    "notes": ""
  }
}
```

---

## Content Stability Rules

IDs should be stable and never casually renamed.

Good:

```txt
teacher-work-mental-health
srq20
support-cvv
canoas-caps-praca-brasil
```

Bad:

```txt
card1
new-resource
flow-v2-final
```

---

## Acceptance Criteria

- Flow, resource, service, and support content is not embedded directly inside React screens.
- Content files are JSON-compatible.
- Content files can be validated by scripts.
- Each content item has a stable ID.
- Future dashboard needs are considered in the schema.
