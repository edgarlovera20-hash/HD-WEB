# Events — HD-WEB

## Overview

HD-WEB produces public-facing events (lead submissions) and consumes a limited set of events for displaying public content. It must never consume or produce events that expose internal domain data.

## Produced Events

| Event | Producer | Consumers | Payload Summary | Sensitivity |
|---|---|---|---|---|
| `web.lead.submitted` | HD-WEB | HD-CRM, HD-BRAIN | leadId, source, formType, utm_source, createdAt, correlationId | public |
| `web.page.viewed` | HD-WEB | Analytics only | pageUrl, sessionId, timestamp | anonymous |

## Consumed Events

| Event | Consumer | Source | Action Taken |
|---|---|---|---|
| `rh.vacancy.published` | HD-WEB | HD-RH | Display vacancy on public jobs page |

## Rules

1. All shared event names must come from `HD-CORE/packages/contracts/src/events.ts`.
2. `web.lead.submitted` must include `correlationId` to trace lead through CRM pipeline.
3. HD-WEB must never consume events containing client PII, financial data, or candidate data.
4. Analytics events (`web.page.viewed`) must be anonymized and must not include user identifiers.
5. All events must be processed idempotently by consumers.
