# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `bun run dev` - Start frontend development server (Vite + Solid.js)
- `bun run worker:dev` - Start Cloudflare Workers development server

### Code Quality

- `bun run type-check` - TypeScript type checking
- `bun run format` - Fix code formatting with Prettier
- `bun run format:check` - Check code formatting

### Build & Deploy

- `bun run build` - Build frontend for production
- `bun run worker:deploy` - Deploy Cloudflare Worker

## Architecture

This is an offline-first shopping list app with real-time sync capabilities.

### Tech Stack

- **Frontend**: Solid.js with Vite and Tailwind CSS v4
- **Backend**: Cloudflare Durable Objects for persistent state
- **Real-time Sync**: Triplit client with IndexedDB for offline storage
- **Package Manager**: Bun

### Key Components

- `src/App.tsx` - Main shopping list UI component
- `src/triplit/client.ts` - Triplit client configuration with IndexedDB storage
- `src/triplit/schema.ts` - Database schema defining shopping_items collection
- `src/durable-object.ts` - Cloudflare Durable Object for backend persistence
- `src/worker.ts` - Cloudflare Worker entry point

### Data Flow

1. Frontend uses Triplit client for local-first data management
2. Triplit syncs with backend via WebSocket/HTTP
3. Backend uses Cloudflare Durable Objects for persistent storage
4. IndexedDB provides offline capability when network is unavailable

### Environment Variables

Configure in `.env`:

- `VITE_TRIPLIT_SERVER_URL` - Triplit server endpoint
- `VITE_TRIPLIT_TOKEN` - Authentication token for Triplit

### Shopping Items Schema

```typescript
{
  id: string,
  text: string,
  completed: boolean,
  created_at: Date,
  updated_at: Date
}
```

### Instructions

- The frontend app does not use cloudflare pages. It is cloudflare workers with static assets. See docs for integrating with vite here https://developers.cloudflare.com/workers/vite-plugin/
