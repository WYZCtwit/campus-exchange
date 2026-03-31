# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Campus Exchange (校园技能交易平台) — a campus marketplace for skill trading, item exchange, and team collaboration. Built with React + Supabase (PostgreSQL, Auth, Realtime, Storage).

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check (tsc -b) then Vite build
npm run lint      # ESLint
npm run preview   # Preview production build

# Database
supabase start          # Start local Supabase (requires Docker)
supabase db reset       # Reset DB and apply all migrations
supabase gen types typescript --local > src/types/database.ts  # Regenerate DB types
```

No test runner is configured yet.

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript (strict), Vite, Tailwind CSS v3
- **Backend**: Supabase (BaaS) — PostgreSQL, anonymous auth, Realtime subscriptions, Storage
- **State**: Zustand v5 with domain-separated stores
- **Routing**: React Router v6 with nested routes under a Layout wrapper

### Path Alias
`@` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

### Layout System
`src/components/layout/Layout.tsx` conditionally renders UI shell based on route:
- **Full shell** (top bar + bottom nav + FAB): `/`, `/home`, `/exchange`, `/teams`
- **Bottom nav only**: `/chat`, `/profile`
- **Top bar only**: `/notifications`
- **No nav**: detail/create pages (`/post`, `/skill/:id`, `/item/:id`, `/order/:id`)
- **Chat room** (`/chat/:conversationId`) bypasses Layout entirely — defined as a sibling route in App.tsx

### State Management (Zustand Stores)
Each store is a separate file in `src/stores/`:
- `authStore` — anonymous auth, profile completion flow, user session
- `listingsStore` — team listings with filtering/sorting
- `chat.store` — real-time messaging, conversation subscriptions
- `notificationStore` — notifications with 30s polling interval
- `orders.store` — order management

### Database Layer
- Supabase client at `src/lib/supabase.ts` with graceful degradation when env vars are missing
- Full TypeScript types in `src/types/database.ts` (auto-generated from Supabase schema)
- 10 core tables: profiles, skills, items, teams, orders, applications, reviews, conversations, messages, notifications
- All tables use RLS (Row Level Security) — see `supabase/migrations/000006_rls.sql`
- Triggers handle: rating updates, conversation last-message, team member counts, order notifications

### Order Status Flow
`pending → contacted → completed` (with `cancelled` as alternate from pending)

### Design System
Material Design 3 color tokens defined in `tailwind.config.js`:
- Color scales: primary (blue), secondary (green), tertiary (yellow), error (red), surface, outline
- Fonts: `headline` (Plus Jakarta Sans), `body`/`label` (Manrope)
- Elevation shadows: `shadow-elevation-1/2/3`, `shadow-card`, `shadow-nav`, `shadow-header`
- Animations: `animate-scale-in`, `animate-fade-in`

### Environment Variables
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Configure in `.env.local`.

### Deployment
Configured for Vercel SPA deployment (`vercel.json` rewrites all routes to index.html).
