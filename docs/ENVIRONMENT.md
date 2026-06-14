# Environment Configuration — HD-WEB

## Overview

HD-WEB uses environment variables for all configuration. No internal API keys or secrets are exposed to the browser.

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `APP_NAME` | Application identifier | `HD-WEB` |
| `APP_PORT` | HTTP server port | `3000` |
| `PUBLIC_BASE_URL` | Public URL of the site | `https://heavenlydreams.com` |
| `HD_CORE_MODE` | HD-CORE resolution mode | `local` |
| `N8N_WEBHOOK_BASE_URL` | n8n webhook base URL (server-side only) | `http://localhost:5678` |
| `N8N_WEB_SECRET` | Secret for n8n webhook authentication | (never hardcode) |
| `RATE_LIMIT_MAX` | Max lead submissions per IP per minute | `5` |
| `LOG_LEVEL` | Logging level | `info` |

## Security Rules

1. Never commit a `.env` file with real values.
2. `N8N_WEB_SECRET` and any API keys must never be exposed in client-side JavaScript bundles.
3. HD-WEB must never hold credentials for internal platform databases.
4. All secrets must be server-side only.
