# Remove Chat & Notification Modules

**Date:** 2026-03-31
**Status:** Approved

## Context

The chat module has unresolved bugs, and the project's core value is skill trading, campus marketplace, and team collaboration. Real-time chat is not essential for the MVP. The notification module is tightly coupled to chat (message notifications), so both are removed together.

## Scope

Remove the entire chat module and notification module from the frontend. Database tables and migrations are left untouched for production safety.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Contact replacement | None | Buyers/sellers use offline channels (WeChat) |
| Notification module | Remove entirely | Coupled to chat; not essential for MVP |
| Database cleanup | Frontend only | Avoid production data risk |
| Post-order navigation | `/order/${orderId}` | User wants to confirm order details immediately |
| TopAppBar | Remove notification bell, keep avatar only | Simplify UI |

## Files to Delete (17)

### Chat Module
- `src/pages/ChatRoom.tsx`
- `src/pages/MessagesList.tsx`
- `src/components/messaging/ConversationItem.tsx`
- `src/components/messaging/MessageBubble.tsx`
- `src/components/messaging/DateDivider.tsx`
- `src/components/messaging/ResourceCard.tsx`
- `src/components/messaging/TypingIndicator.tsx`
- `src/components/messaging/index.ts`
- `src/stores/chat.store.ts`

### Notification Module
- `src/pages/Notifications.tsx`
- `src/stores/notificationStore.ts`
- `src/hooks/useNotifications.ts`

### Templates
- `docs/ui_templates/chat.html`
- `docs/ui_templates/messages.html`

## Files to Modify (7)

### 1. `src/App.tsx`
- Remove lazy imports: `MessagesList`, `ChatRoom`, `Notifications`
- Remove routes: `/chat`, `/chat/:conversationId`, `/notifications`

### 2. `src/components/layout/Layout.tsx`
- Remove `useNotificationPolling` import and call
- Remove `/chat` from `bottomNavOnlyPages`
- Remove `/notifications` from `topBarOnlyPages`

### 3. `src/components/layout/BottomNavBar.tsx`
- Remove `/chat` entry from `navItems` array

### 4. `src/components/layout/TopAppBar.tsx`
- Remove `useUnreadCount` import
- Remove notification bell button UI entirely

### 5. `src/pages/ItemDetail.tsx`
- After order creation: navigate to `/order/${result.orderId}` instead of chat

### 6. `src/pages/SkillDetail.tsx`
- Same as ItemDetail: navigate to `/order/${result.orderId}`

### 7. `src/pages/index.ts`
- Remove barrel exports: `MessagesList`, `ChatRoom`, `Notifications`

### 8. `src/stores/orders.store.ts`
- Change `createOrder` return type to `Promise<number | null>` (orderId only)
- Remove `get_or_create_conversation` RPC call
- Remove `conversationId` from return value

## Out of Scope

- Database table drops or migration changes
- `src/types/database.ts` modifications (auto-generated)
- E2E test updates (separate task if needed)
