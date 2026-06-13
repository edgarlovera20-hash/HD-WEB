# Web Automation Policy — HD-WEB

## Platform Identifier

`HD-WEB`

## Purpose

HD-WEB is the public-facing front door of the Heavenly Dreams ecosystem. It captures leads, presents public information, and routes users to internal platforms. It must never expose internal business logic, private APIs, or non-public data.

## Permitted Automations

| Automation | Description |
|---|---|
| Generate leads | Capture form submissions and create lead records via `WEB_LEAD_TO_CRM` workflow |
| Serve public forms | Display contact forms, subscription forms, and lead capture forms |
| Emit public events | Publish `web.lead.submitted` events upon form submission |
| Redirect to platforms | Route authenticated users to HD-RH, HD-CRM, or HD-OPERATIONS portals |
| Display public vacancy listings | Show published vacancies from HD-RH |

## Forbidden Actions

| Action | Reason |
|---|---|
| Execute internal automations | Internal workflows belong to each platform; HD-WEB only triggers approved n8n entry points |
| Expose private API endpoints | Internal platform APIs must never be directly accessible from the public web |
| Access client, candidate, or financial data | Private domain data must never be exposed publicly |
| Perform RBAC operations | User and role management is exclusively HD-ADMIN responsibility |
| Store sensitive business data | HD-WEB stores only public content and transient lead data |
| Run AI agents with access to internal systems | Any AI on HD-WEB must be isolated to public-facing interactions only |

## Automation Boundaries

1. HD-WEB may only call the `WEB_LEAD_TO_CRM` n8n workflow (via its service principal `n8n-web-sp`).
2. All other n8n workflows are forbidden from being triggered by HD-WEB.
3. HD-WEB may read from public data endpoints only (vacancy listings, public content).
4. HD-WEB must never hold a service principal with write permissions beyond `crm:lead:create`.

## Audit Requirements

- All lead form submissions must produce an `AuditEntry` with `actorType: "system"` and `platform: "HD-WEB"`.
- All n8n workflow triggers from HD-WEB must carry a `correlationId`.

## SEO and Public Content

- Public content (landing pages, SEO pages, blog) may be managed independently.
- No internal system identifiers (UUIDs, userIds, clientIds) may appear in public URLs or page content.
