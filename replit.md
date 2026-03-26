# Workspace

## Overview

pnpm workspace monorepo para un proyecto Buildathon: Chatbot de Telegram + PWA Dashboard.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Telegram bot**: grammy
- **Frontend**: React + Vite (PWA)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (Telegram webhook + REST API)
│   └── pwa/                # React + Vite PWA Dashboard
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Key Features

- **PWA Dashboard** at `/` — muestra estadísticas, mensajes y usuarios del bot
- **Telegram Bot** — integrado via grammy, recibe mensajes y guarda en DB
- **Webhook endpoint** — `POST /api/telegram/webhook`
- **REST API endpoints**:
  - `GET /api/healthz` — health check
  - `GET /api/stats` — estadísticas totales
  - `GET /api/messages` — lista de mensajes paginada
  - `GET /api/users` — lista de usuarios de Telegram
  - `POST /api/telegram/webhook` — webhook para Telegram

## Database Schema

- `telegram_users` — usuarios conocidos del bot (telegramId, username, firstName, lastName)
- `messages` — mensajes entrantes y salientes (direction: incoming | outgoing)

## Environment Variables Required

- `DATABASE_URL` — provisto automáticamente por Replit
- `TELEGRAM_BOT_TOKEN` — token del bot de Telegram (desde @BotFather)

## Connecting Telegram Webhook

Once deployed, register the webhook with Telegram:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-domain>/api/telegram/webhook
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`.

## Root Scripts

- `pnpm run build` — runs typecheck + build all packages
- `pnpm run typecheck` — full typecheck using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API. grammy is externalized from esbuild bundle.

### `artifacts/pwa` (`@workspace/pwa`)
React + Vite PWA. Uses @workspace/api-client-react hooks.

### `lib/db` (`@workspace/db`)
Drizzle ORM. Push: `pnpm --filter @workspace/db run push`

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI spec. Codegen: `pnpm --filter @workspace/api-spec run codegen`
