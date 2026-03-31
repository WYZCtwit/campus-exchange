# Remove Chat & Notification Modules — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the entire chat and notification modules from the frontend, keeping only the core features (skill trading, campus marketplace, team collaboration).

**Architecture:** Clean removal — first modify all consumer files to remove references, then delete the module files. This order prevents broken imports at any intermediate step.

**Tech Stack:** React 18 + TypeScript, Zustand v5, Supabase, React Router v6, Vite

**Spec:** `docs/superpowers/specs/2026-03-31-remove-chat-notifications-design.md`

---

### Task 1: Remove chat/notification imports and routes from App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remove lazy imports for MessagesList, ChatRoom, Notifications**

Delete these three lines (lines 17–19):

```typescript
const MessagesList = lazy(() => import('./pages/MessagesList'))
const ChatRoom = lazy(() => import('./pages/ChatRoom'))
const Notifications = lazy(() => import('./pages/Notifications'))
```

- [ ] **Step 2: Remove chat and notification routes**

Delete this line (line 50):

```tsx
          <Route path="chat" element={<MessagesList />} />
```

Delete this line (line 51):

```tsx
          <Route path="notifications" element={<Notifications />} />
```

Delete these two lines (57–58):

```tsx
        {/* Chat room uses separate layout without bottom nav */}
        <Route path="/chat/:conversationId" element={<ChatRoom />} />
```

- [ ] **Step 3: Verify file compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to App.tsx

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: remove chat and notification routes from App.tsx"
```

---

### Task 2: Remove notification polling and chat layout from Layout.tsx

**Files:**
- Modify: `src/components/layout/Layout.tsx`

- [ ] **Step 1: Remove notification import and hook call**

Delete this import (line 6):

```typescript
import { useNotificationPolling } from '../../hooks/useNotifications'
```

Delete this line from the component body (line 27):

```typescript
  useNotificationPolling(user?.id ?? null, 30_000)
```

- [ ] **Step 2: Remove /chat from bottomNavOnlyPages**

Change line 12 from:

```typescript
const bottomNavOnlyPages = ['/chat', '/profile']
```

To:

```typescript
const bottomNavOnlyPages = ['/profile']
```

- [ ] **Step 3: Remove /notifications from topBarOnlyPages**

Change line 15 from:

```typescript
const topBarOnlyPages = ['/notifications']
```

To:

```typescript
const topBarOnlyPages: string[] = []
```

- [ ] **Step 4: Remove the topBarOnly notification bar render**

Delete this line (line 51):

```tsx
      {showTopBarOnly && <TopAppBar showTabs={false} showBack title="Notifications" onBack={() => navigate(-1)} />}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Layout.tsx
git commit -m "refactor: remove notification polling and chat layout from Layout"
```

---

### Task 3: Remove chat nav item from BottomNavBar

**Files:**
- Modify: `src/components/layout/BottomNavBar.tsx`

- [ ] **Step 1: Remove /chat from navItems**

Delete this line (line 7):

```typescript
  { path: '/chat', icon: 'forum', label: '消息', requiresProfile: true },
```

The array should now have 3 items: 首页, 交换, 我的.

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/BottomNavBar.tsx
git commit -m "refactor: remove chat nav item from BottomNavBar"
```

---

### Task 4: Remove notification bell from TopAppBar

**Files:**
- Modify: `src/components/layout/TopAppBar.tsx`

- [ ] **Step 1: Remove notification import**

Delete this import (line 3):

```typescript
import { useUnreadCount } from '../../hooks/useNotifications'
```

- [ ] **Step 2: Remove unreadCount hook call**

Delete this line (line 29):

```typescript
  const unreadCount = useUnreadCount()
```

- [ ] **Step 3: Remove notification bell button**

Delete the entire notification bell block (lines 62–73):

```tsx
        {/* Notification Bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 text-primary active:scale-95 transition-transform"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
```

After this change, the header row should contain: avatar button → title → empty space (right-aligned by justify-between).

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/TopAppBar.tsx
git commit -m "refactor: remove notification bell from TopAppBar"
```

---

### Task 5: Remove conversation logic from orders store

**Files:**
- Modify: `src/stores/orders.store.ts`

- [ ] **Step 1: Update createOrder return type**

Change line 50 from:

```typescript
  createOrder: (data: Omit<OrderInsert, 'buyer_id'>) => Promise<{ orderId: number; conversationId: number | null } | null>
```

To:

```typescript
  createOrder: (data: Omit<OrderInsert, 'buyer_id'>) => Promise<number | null>
```

- [ ] **Step 2: Remove conversation RPC and simplify return**

In the `createOrder` method, replace lines 162–184 (the conversation RPC block and return):

```typescript
      // Create or get conversation with the seller (non-blocking)
      let conversationId: number | null = null
      try {
        const { data: convId, error: rpcErr } = await supabase.rpc(
          'get_or_create_conversation',
          {
            p_user1: user.id,
            p_user2: data.seller_id,
            p_listing_type: data.listing_type,
            p_listing_id: data.listing_id,
          },
        )
        if (rpcErr) {
          console.warn('[createOrder] conversation RPC failed:', rpcErr.message)
        } else {
          conversationId = (convId as number) ?? null
        }
      } catch (convErr) {
        console.warn('[createOrder] conversation creation failed:', convErr)
      }

      set({ isSubmitting: false })
      return { orderId: order.id, conversationId }
```

With:

```typescript
      set({ isSubmitting: false })
      return order.id
```

- [ ] **Step 3: Verify file compiles**

Run: `npx tsc --noEmit`
Expected: Type errors in ItemDetail.tsx and SkillDetail.tsx (result.conversationId) — this is expected, fixed in Task 6.

- [ ] **Step 4: Commit**

```bash
git add src/stores/orders.store.ts
git commit -m "refactor: remove conversation creation from orders store"
```

---

### Task 6: Fix post-order navigation in ItemDetail and SkillDetail

**Files:**
- Modify: `src/pages/ItemDetail.tsx`
- Modify: `src/pages/SkillDetail.tsx`

- [ ] **Step 1: Update ItemDetail.tsx post-order navigation**

In ItemDetail.tsx, replace lines 440–447:

```typescript
          if (result) {
            setShowOrderModal(false)
            // Navigate to the chat with the seller
            if (result.conversationId) {
              navigate(`/chat/${result.conversationId}`)
            } else {
              navigate('/chat')
            }
```

With:

```typescript
          if (result) {
            setShowOrderModal(false)
            navigate(`/order/${result}`)
```

- [ ] **Step 2: Update SkillDetail.tsx post-order navigation**

In SkillDetail.tsx, replace lines 423–430:

```typescript
          if (result) {
            setShowOrderModal(false)
            // Navigate to the chat with the seller
            if (result.conversationId) {
              navigate(`/chat/${result.conversationId}`)
            } else {
              navigate('/chat')
            }
```

With:

```typescript
          if (result) {
            setShowOrderModal(false)
            navigate(`/order/${result}`)
```

- [ ] **Step 3: Verify files compile**

Run: `npx tsc --noEmit`
Expected: No errors related to ItemDetail, SkillDetail, or orders.store

- [ ] **Step 4: Commit**

```bash
git add src/pages/ItemDetail.tsx src/pages/SkillDetail.tsx
git commit -m "refactor: navigate to order detail after purchase instead of chat"
```

---

### Task 7: Clean barrel exports in pages/index.ts

**Files:**
- Modify: `src/pages/index.ts`

- [ ] **Step 1: Remove chat/notification exports**

Delete these three lines:

```typescript
export { default as MessagesList } from './MessagesList'
export { default as ChatRoom } from './ChatRoom'
export { default as Notifications } from './Notifications'
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.ts
git commit -m "refactor: remove chat/notification exports from barrel file"
```

---

### Task 8: Delete all chat and notification module files

**Files:**
- Delete: `src/pages/ChatRoom.tsx`
- Delete: `src/pages/MessagesList.tsx`
- Delete: `src/pages/Notifications.tsx`
- Delete: `src/components/messaging/` (entire directory)
- Delete: `src/stores/chat.store.ts`
- Delete: `src/stores/notificationStore.ts`
- Delete: `src/hooks/useNotifications.ts`
- Delete: `docs/ui_templates/chat.html`
- Delete: `docs/ui_templates/messages.html`

- [ ] **Step 1: Delete chat module files**

```bash
rm src/pages/ChatRoom.tsx
rm src/pages/MessagesList.tsx
rm -rf src/components/messaging
rm src/stores/chat.store.ts
```

- [ ] **Step 2: Delete notification module files**

```bash
rm src/pages/Notifications.tsx
rm src/stores/notificationStore.ts
rm src/hooks/useNotifications.ts
```

- [ ] **Step 3: Delete template files**

```bash
rm docs/ui_templates/chat.html
rm docs/ui_templates/messages.html
```

- [ ] **Step 4: Verify no remaining imports reference deleted files**

Run: `grep -r "chat\.store\|ChatRoom\|MessagesList\|messaging/\|notificationStore\|useNotification" src/ --include="*.ts" --include="*.tsx" || echo "CLEAN: no references found"`

Expected output: `CLEAN: no references found`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: delete chat and notification module files"
```

---

### Task 9: Build verification

- [ ] **Step 1: Run TypeScript type check**

Run: `npx tsc --noEmit`
Expected: Zero errors

- [ ] **Step 2: Run Vite build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Run ESLint**

Run: `npm run lint`
Expected: No new errors (existing warnings are OK)

- [ ] **Step 4: Visual smoke test**

Run: `npm run dev`

Verify in browser:
1. Bottom nav has 3 items: 首页, 交换, 我的 (no 消息)
2. TopAppBar has avatar on left, title in center, no bell icon
3. Navigate to `/chat` — should show 404 or redirect
4. Navigate to `/notifications` — should show 404 or redirect
5. Create a test order — should navigate to `/order/{id}` instead of chat

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address build/lint issues after chat removal"
```
