# Shopping Bird - Development Setup

This shopping list application is built with Solid.js, Vite, Tailwind CSS, Cloudflare Durable Objects, and Triplit for real-time sync.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

## Installation

1. Install dependencies:
```bash
npm install
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
npm run dev
```

### Backend Development  
Start the Cloudflare Workers development server:
```bash
npm run worker:dev
```

### Code Quality
Run linting:
```bash
npm run lint
```

Run type checking:
```bash
npm run type-check
```

## Building

Build the frontend:
```bash
npm run build
```

## Deployment

Deploy the Cloudflare Worker:
```bash
npm run worker:deploy
```

## Architecture

- **Frontend**: Solid.js with Vite and Tailwind CSS
- **Backend**: Cloudflare Durable Objects for persistent state
- **Sync**: Triplit for real-time synchronization across devices
- **Offline**: IndexedDB for local storage when offline

## Features

- ✅ Offline-first shopping list
- ✅ Real-time sync across devices  
- ✅ Integration with Google Keep (planned)
- ✅ Voice control via Google Assistant (planned)
- ✅ Responsive design
- ✅ TypeScript support