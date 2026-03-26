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

## Local Development Setup

### Required environment variables
- `DATABASE_URL` — provisto automáticamente por Replit
- `TELEGRAM_BOT_TOKEN` — token del bot de Telegram (obtenido desde @BotFather)

### Optional environment variables
- `TELEGRAM_WEBHOOK_SECRET` — token secreto para autenticar webhooks de Telegram (recomendado en producción; sin él el endpoint es público)
- `TELEGRAM_WEBHOOK_URL` — URL pública del webhook (e.g. `https://tu-dominio.replit.app/api/telegram/webhook`); si está configurado, el bot registra el webhook automáticamente al iniciar

### Start all services
```bash
pnpm dev   # arranca api-server (PORT=8080) + pwa (PORT=23922) en paralelo
```

### Database migrations
```bash
pnpm --filter @workspace/db run push   # push del schema a PostgreSQL
```

### Regenerar clientes API
```bash
pnpm --filter @workspace/api-spec run codegen
```

## Connecting Telegram Webhook

Once deployed, register the webhook manually or via `TELEGRAM_WEBHOOK_URL` env var:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<tu-dominio>/api/telegram/webhook&secret_token=<WEBHOOK_SECRET>
```

## Security Notes

- **Production**: siempre configura `TELEGRAM_WEBHOOK_SECRET`. Sin él, cualquiera puede enviar updates falsos al endpoint.
- El API server emite un `warn` al iniciar si `TELEGRAM_WEBHOOK_SECRET` no está configurado en `NODE_ENV=production`.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`.

## Root Scripts

- `pnpm run dev` — arranca api-server + pwa juntos (puertos 8080 y 23922)
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
