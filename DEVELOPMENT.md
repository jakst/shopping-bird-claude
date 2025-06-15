# Shopping Bird - Development Setup

This shopping list application is built with Solid.js, Vite, Tailwind CSS, Cloudflare Durable Objects, and Triplit for real-time sync.

## Prerequisites

- Node.js 24+
- Bun
- Cloudflare account (for deployment)

## Installation

1. Install dependencies:

```bash
bun install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update the `.env` file with your Triplit and Cloudflare credentials.

## Development

### Frontend Development

Start the frontend development server:

```bash
bun run dev
```

### Backend Development

Start the Cloudflare Workers development server:

```bash
bun run worker:dev
```

### Code Quality

Run linting:

```bash
bun run lint
```

Run type checking:

```bash
bun run type-check
```

Check formatting

```bash
bun run format:check
```

Fix formatting

```bash
bun run format
```

## Building

Build the frontend:

```bash
bun run build
```

## Deployment

Deploy the Cloudflare Worker:

```bash
bun run worker:deploy
```

## Architecture

- **Frontend**: Solid.js with Vite and Tailwind CSS
- **Backend**: Cloudflare Durable Objects for persistent state
- **Sync**: Triplit for real-time synchronization across devices
- **Offline**: Triplit IndexedDB integration for local storage when offline
