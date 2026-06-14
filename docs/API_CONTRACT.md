# API Contract — HD-WEB

## Overview

HD-WEB exposes only public-facing endpoints. There are no authenticated mutation endpoints accessible from the public internet that touch internal platform data.

## Base URL

```
https://hd-web.heavenlydreams.com/api/v1
```

## Public Endpoints (No Authentication Required)

### Lead Capture

| Method | Endpoint | Description |
|---|---|---|
| POST | /leads | Submit a lead capture form |

**Lead payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "source": "string",
  "formType": "contact | subscription | vacancy",
  "metadata": {}
}
```

This endpoint triggers the `WEB_LEAD_TO_CRM` n8n workflow.

### Vacancies (Public)

| Method | Endpoint | Description |
|---|---|---|
| GET | /vacancies | List published vacancies |
| GET | /vacancies/:slug | Get vacancy detail |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Public health check |

## Authentication

- Lead capture and vacancy endpoints are **public** (no auth required).
- Admin panel routes (served by HD-WEB but redirected to HD-ADMIN) require JWT.
- HD-WEB must never issue JWTs directly. Authentication is delegated to HD-CORE identity service.

## Audit Rules

- Every lead form submission must produce an `AuditEntry`.
- Submissions must carry a server-generated `correlationId`.

## Error Contract

| Code | Meaning |
|---|---|
| 400 | Validation error (form data) |
| 429 | Rate limit exceeded (anti-spam) |
| 500 | Internal error |

## Prohibited

- No internal platform API endpoints exposed publicly.
- No endpoints that return client, financial, candidate, or employee data.
- No endpoints callable by unauthenticated users that mutate internal platform state.
