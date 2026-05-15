# Front 09 — Contacts Directory

## Goal

Provide a useful directory of mental-health and support services relevant to teachers.

The app may begin with services in Canoas/RS, but the product audience is teachers broadly, especially public school teachers. The model should not assume Canoas is the only possible location forever.

---

## Data Model

```ts
type SupportService = {
  id: string;
  name: string;
  type: 'CAPS' | 'UBS' | 'Emergência' | 'Universidade' | 'Outro';
  city: string;
  state: string;
  address: string;
  phone?: string;
  openingHours?: string;
  lat?: number;
  lng?: number;
  notes?: string;
};
````

---

## Content Structure

```txt
src/content/services/
  canoas-services.json
  national-services.json
```

Later:

```txt
src/content/services/
  rs-services.json
  city-index.json
```

---

## Location Sorting

Location-aware sorting is optional and should not be part of the first version unless privacy review approves it.

Rules:

* Ask permission only after explaining why.
* Full directory must work without permission.
* Location is processed on-device.
* Location is not stored.
* Location is not transmitted.
* No map SDK unless specifically required.

---

## UI

Each service card should show:

```txt
service name
type badge
address
phone number
opening hours
notes
call action
```

Optional later:

```txt
distance
sort by nearest
filter by type
filter by city
```

---

## Acceptance Criteria

* Directory renders from data, not JSX.
* Services include city/state fields.
* Canoas is supported without making the architecture Canoas-only.
* App works without location permission.
* Optional location sorting is privacy-reviewed.