# Front 10 — Education Library

## Goal

Create a curated resource library for teachers, with trusted mental-health content and in-app viewing where appropriate.

The library supports both browsing and flow-based recommendations.

---

## Resource Model

```ts
type Resource = {
  id: string;
  title: string;
  source: string;
  description: string;
  tags: string[];
  audience: 'teachers' | 'public_school_teachers' | 'general';
  contentType: 'article' | 'summary' | 'pdf' | 'external';
  body?: ArticleBlock[];
  externalUrl?: string;
  review: {
    status: 'draft' | 'pending_review' | 'approved';
    version: string;
    reviewedBy?: string;
    reviewedAt?: string;
  };
};
````

---

## Content Sources

Initial sources may include:

* Ministério da Saúde;
* Feevale;
* PROFESP;
* other clinically approved teacher mental-health materials.

All content should be contextualized by the health/product team before publication.

---

## UI

Library screen:

```txt
search/filter
resource cards
source badges
tags
access button
```

Resource detail screen:

```txt
title
source
review/version info if needed
article or summary body
external/PDF link if needed
related resources
```

---

## Connection to Guided Flows

Flow results should reference resources by stable ID.

Example:

```json
{
  "recommendation_id": "teacher-work-mental-health"
}
```

The UI resolves that ID to a resource card.

---

## Acceptance Criteria

* Library renders from structured resource data.
* Resource IDs are stable.
* Flow result recommendations can link to resources.
* External/PDF resources are clearly labeled.
* Clinical/editorial status is represented in the model.