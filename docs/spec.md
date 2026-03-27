# Campus Exchange 技术规格说明书
## Technical Specification Document

---

## 1. 项目概述

### 1.1 项目信息
| 项目 | 内容 |
|------|------|
| **项目名称** | Campus Exchange (校园交换) |
| **版本** | v1.0.0 |
| **日期** | 2026-03-26 |
| **状态** | Development Ready |

### 1.2 技术栈选型

| 层级 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| **前端框架** | React | 18.x | 函数组件 + Hooks |
| **开发语言** | TypeScript | 5.x | 严格模式 |
| **构建工具** | Vite | 5.x | 快速 HMR |
| **样式方案** | Tailwind CSS | 3.x | 配合 CSS Variables |
| **状态管理** | Zustand | 4.x | 轻量级状态管理 |
| **路由** | React Router | 6.x | 声明式路由 |
| **后端服务** | Supabase | Latest | PostgreSQL + Auth + Realtime + Storage |
| **实时通信** | Supabase Realtime | - | WebSocket 订阅 |
| **文件存储** | Supabase Storage | - | 图片上传 |

---

## 2. 设计系统规范

### 2.1 颜色 Token (Material Design 3)

```css
:root {
  /* Primary - 主色调 */
  --primary: #0053ca;
  --primary-dim: #0049b2;
  --primary-container: #769dff;
  --primary-fixed: #769dff;
  --primary-fixed-dim: #5f8fff;
  --on-primary: #f1f2ff;
  --on-primary-container: #001f56;
  --on-primary-fixed: #000000;
  --on-primary-fixed-variant: #002869;

  /* Secondary - 成功/交换相关 */
  --secondary: #006a28;
  --secondary-dim: #005d22;
  --secondary-container: #5cfd80;
  --secondary-fixed: #5cfd80;
  --secondary-fixed-dim: #4bee74;
  --on-secondary: #cfffce;
  --on-secondary-container: #005d22;
  --on-secondary-fixed: #004819;
  --on-secondary-fixed-variant: #006827;

  /* Tertiary - 高亮/警告 */
  --tertiary: #6d5a00;
  --tertiary-dim: #5f4e00;
  --tertiary-container: #fdd400;
  --tertiary-fixed: #fdd400;
  --tertiary-fixed-dim: #edc600;
  --on-tertiary: #fff2ce;
  --on-tertiary-container: #594a00;
  --on-tertiary-fixed: #433700;
  --on-tertiary-fixed-variant: #645300;

  /* Error - 错误/删除 */
  --error: #b31b25;
  --error-dim: #9f0519;
  --error-container: #fb5151;
  --on-error: #ffefee;
  --on-error-container: #570008;

  /* Surface - 表面层级 */
  --surface: #f7f5ff;
  --surface-dim: #cdd1ff;
  --surface-bright: #f7f5ff;
  --surface-tint: #0053ca;
  --surface-variant: #d8daff;
  --surface-container: #e6e6ff;
  --surface-container-low: #f0efff;
  --surface-container-lowest: #ffffff;
  --surface-container-high: #dfe0ff;
  --surface-container-highest: #d8daff;

  /* On Surface - 文字颜色 */
  --on-surface: #262c51;
  --on-surface-variant: #545981;
  --on-background: #262c51;
  --inverse-surface: #05092f;
  --inverse-on-surface: #959ac6;
  --inverse-primary: #5a8cff;

  /* Outline */
  --outline: #6f749e;
  --outline-variant: #a5aad7;
}
```

### 2.2 字体规范

```css
/* 字体族 */
--font-headline: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Manrope', sans-serif;
--font-label: 'Manrope', sans-serif;

/* 字体加载 (Google Fonts) */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
```

### 2.3 圆角规范

| Token | 值 | 用途 |
|-------|-----|------|
| `DEFAULT` | 1rem (16px) | 卡片、按钮 |
| `lg` | 2rem (32px) | 大型卡片、模态框 |
| `xl` | 3rem (48px) | 底部导航栏圆角 |
| `full` | 9999px | 圆形按钮、头像 |

### 2.4 阴影规范

```css
/* 卡片阴影 */
.editorial-shadow {
  box-shadow: 0 20px 40px rgba(38, 44, 81, 0.06);
}

/* 底部导航阴影 */
.bottom-nav-shadow {
  box-shadow: 0 -10px 30px rgba(38, 44, 81, 0.04);
}
```

### 2.5 图标规范

- **图标库**: Material Symbols Outlined
- **加载方式**: Google Fonts
- **默认样式**: `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;`

---

## 3. 路由架构

### 3.1 路由表

```typescript
// src/router/routes.ts
export const routes = {
  // 主页面 (底部导航)
  home: '/',                    // 首页 (推荐/技能/物品/活动 Tab)
  exchange: '/exchange',        // 交换中心
  messages: '/messages',        // 消息列表
  profile: '/profile',          // 个人中心

  // 发布相关
  'post-skill': '/post/skill',      // 发布技能
  'post-item': '/post/item',        // 发布物品
  'post-team': '/post/team',        // 发布组队

  // 详情页
  'skill-detail': '/skill/:id',     // 技能详情
  'item-detail': '/item/:id',       // 物品详情
  'team-detail': '/team/:id',       // 组队详情

  // 聊天
  'chat': '/chat/:conversationId',  // 聊天详情

  // 个人中心子页面
  'edit-profile': '/profile/edit',           // 编辑资料
  'my-skills': '/profile/skills',            // 我的技能
  'my-items': '/profile/items',              // 我的物品
  'my-orders': '/profile/orders',            // 我的订单
  'my-teams': '/profile/teams',              // 我的组队
  'my-applications': '/profile/applications', // 我的申请

  // 订单相关
  'order-detail': '/order/:id',    // 订单详情

  // 认证
  login: '/login',              // 登录
  register: '/register',        // 注册
} as const;
```

### 3.2 底部导航结构

```tsx
// 4 个 Tab
const navItems = [
  { path: '/', icon: 'home', label: '首页' },
  { path: '/exchange', icon: 'swap_horiz', label: '交换' },
  { path: '/messages', icon: 'forum', label: '消息' },
  { path: '/profile', icon: 'person', label: '我的' },
];
```

---

## 4. 数据库设计

### 4.1 核心表结构

#### 4.1.1 用户资料表 (profiles)

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id VARCHAR(20) UNIQUE,          -- 学号
  nickname VARCHAR(50) NOT NULL,          -- 昵称
  avatar_url TEXT,                        -- 头像 URL
  department VARCHAR(50),                 -- 院系
  grade VARCHAR(20),                      -- 年级
  bio TEXT,                               -- 个人简介
  wechat_id VARCHAR(50),                  -- 微信号
  avg_rating DECIMAL(2,1) DEFAULT NULL,   -- 平均评分 (1.0-5.0)
  review_count INT DEFAULT 0,             -- 评价数量
  tags TEXT[],                            -- 校园标签
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_profiles_department ON profiles(department);
CREATE INDEX idx_profiles_nickname ON profiles(nickname);
```

#### 4.1.2 技能服务表 (skills)

```sql
CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,            -- 标题
  category VARCHAR(50) NOT NULL,          -- 分类: coding/design/academic/life/art/other
  description TEXT NOT NULL,              -- 详细描述
  offer_description TEXT NOT NULL,        -- 我能提供
  want_description TEXT NOT NULL,         -- 我想要
  price DECIMAL(10,2),                    -- 价格 (仅展示)
  exchange_preference BOOLEAN DEFAULT TRUE, -- 是否接受技能交换
  images TEXT[] DEFAULT '{}',             -- 作品展示图片
  wechat_contact VARCHAR(50) NOT NULL,    -- 微信号
  status VARCHAR(20) DEFAULT 'active',    -- active/inactive
  view_count INT DEFAULT 0,               -- 浏览量
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_skills_user ON skills(user_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_status ON skills(status);
CREATE INDEX idx_skills_created ON skills(created_at DESC);
```

#### 4.1.3 物品表 (items)

```sql
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,          -- books/electronics/daily/sports/other
  description TEXT NOT NULL,
  condition VARCHAR(20) NOT NULL,         -- new/good/fair/poor
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  exchange_preference BOOLEAN DEFAULT FALSE,
  images TEXT[] NOT NULL DEFAULT '{}',
  location VARCHAR(200) NOT NULL,         -- 交易地点
  wechat_contact VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',    -- active/sold/inactive
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_items_user ON items(user_id);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_created ON items(created_at DESC);
```

#### 4.1.4 组队表 (teams)

```sql
CREATE TABLE teams (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL,              -- competition/activity/project
  description TEXT NOT NULL,
  target_count INT NOT NULL,              -- 目标人数
  current_count INT DEFAULT 1,            -- 当前人数
  deadline DATE NOT NULL,                 -- 截止日期
  roles_needed TEXT[] NOT NULL,           -- 需要的角色
  wechat_contact VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'recruiting', -- recruiting/full/ended
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_teams_user ON teams(user_id);
CREATE INDEX idx_teams_type ON teams(type);
CREATE INDEX idx_teams_status ON teams(status);
CREATE INDEX idx_teams_deadline ON teams(deadline);
```

#### 4.1.5 订单表 (orders)

```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  listing_type VARCHAR(20) NOT NULL,      -- skill/item
  listing_id BIGINT NOT NULL,             -- skill_id 或 item_id
  buyer_id UUID NOT NULL REFERENCES profiles(id),
  seller_id UUID NOT NULL REFERENCES profiles(id),
  price DECIMAL(10,2),                    -- 记录交易价格
  note TEXT,                              -- 买家备注
  status VARCHAR(20) DEFAULT 'pending',   -- pending/contacted/completed/cancelled
  buyer_wechat VARCHAR(50) NOT NULL,      -- 买家微信
  seller_wechat VARCHAR(50),              -- 卖家微信 (确认后可见)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束: 确保买家和卖家不是同一人
  CONSTRAINT chk_different_users CHECK (buyer_id != seller_id)
);

-- 索引
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_listing ON orders(listing_type, listing_id);
```

#### 4.1.6 申请表 (applications)

```sql
CREATE TABLE applications (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  wechat_contact VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',   -- pending/approved/rejected
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 唯一约束: 每个用户对每个组队只能申请一次
  CONSTRAINT uq_team_application UNIQUE (team_id, user_id)
);

-- 索引
CREATE INDEX idx_applications_team ON applications(team_id);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
```

#### 4.1.7 会话表 (conversations)

```sql
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  participant1_id UUID NOT NULL REFERENCES profiles(id),
  participant2_id UUID NOT NULL REFERENCES profiles(id),
  listing_type VARCHAR(20),               -- skill/item/team
  listing_id BIGINT,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 唯一约束: 两个用户之间关于同一发布的会话只能有一个
  CONSTRAINT uq_conversation_participants UNIQUE (
    participant1_id,
    participant2_id,
    listing_type,
    listing_id
  ),

  -- 约束: participant1_id < participant2_id (避免重复)
  CONSTRAINT chk_participant_order CHECK (participant1_id < participant2_id)
);

-- 索引
CREATE INDEX idx_conversations_p1 ON conversations(participant1_id);
CREATE INDEX idx_conversations_p2 ON conversations(participant2_id);
```

#### 4.1.8 消息表 (messages)

```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- text/image
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

#### 4.1.9 通知表 (notifications)

```sql
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  related_listing_type VARCHAR(20),
  related_listing_id BIGINT,
  related_order_id BIGINT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

#### 4.1.10 评价表 (reviews)

```sql
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  reviewee_id UUID NOT NULL REFERENCES profiles(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 唯一约束: 每个订单每人只能评价一次
  CONSTRAINT uq_order_reviewer UNIQUE (order_id, reviewer_id),

  -- 约束: 评价者不能评价自己
  CONSTRAINT chk_not_self_review CHECK (reviewer_id != reviewee_id)
);

-- 索引
CREATE INDEX idx_reviews_order ON reviews(order_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
```

### 4.2 RLS (Row Level Security) 策略

```sql
-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- profiles: 所有人可读，仅自己可写
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- skills: 所有人可读，仅发布者可写
CREATE POLICY "skills_select" ON skills FOR SELECT USING (true);
CREATE POLICY "skills_insert" ON skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "skills_update" ON skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "skills_delete" ON skills FOR DELETE USING (auth.uid() = user_id);

-- items: 同 skills
CREATE POLICY "items_select" ON items FOR SELECT USING (true);
CREATE POLICY "items_insert" ON items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "items_update" ON items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "items_delete" ON items FOR DELETE USING (auth.uid() = user_id);

-- orders: 仅买卖双方可见
CREATE POLICY "orders_select" ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "orders_insert" ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "orders_update" ON orders FOR UPDATE
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- messages: 仅会话参与者可见
CREATE POLICY "messages_select" ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (participant1_id = auth.uid() OR participant2_id = auth.uid())
    )
  );
CREATE POLICY "messages_insert" ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (participant1_id = auth.uid() OR participant2_id = auth.uid())
    )
  );
```

---

## 5. API 设计

### 5.1 Supabase Client 配置

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 5.2 数据访问层 (Repository Pattern)

```typescript
// src/repositories/base.repository.ts
export abstract class BaseRepository<T> {
  constructor(protected tableName: string) {}

  async findById(id: string | number): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    return error ? null : data;
  }

  async findAll(options?: { limit?: number; offset?: number }): Promise<T[]> {
    let query = supabase.from(this.tableName).select('*');
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.range(options.offset, options.offset + options.limit - 1);
    const { data } = await query;
    return data || [];
  }
}

// src/repositories/skills.repository.ts
export class SkillsRepository extends BaseRepository<Skill> {
  constructor() {
    super('skills');
  }

  async findByCategory(category: string): Promise<Skill[]> {
    const { data } = await supabase
      .from('skills')
      .select('*, profiles(nickname, avatar_url)')
      .eq('category', category)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    return data || [];
  }
}
```

### 5.3 实时订阅

```typescript
// src/lib/realtime.ts
// 消息实时订阅
export function subscribeToMessages(
  conversationId: number,
  onMessage: (message: Message) => void
) {
  return supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => onMessage(payload.new as Message)
    )
    .subscribe();
}

// 通知实时订阅
export function subscribeToNotifications(
  userId: string,
  onNotification: (notification: Notification) => void
) {
  return supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => onNotification(payload.new as Notification)
    )
    .subscribe();
}
```

---

## 6. 状态管理设计

### 6.1 Zustand Store 结构

```typescript
// src/stores/auth.store.ts
interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

// src/stores/listings.store.ts
interface ListingsState {
  skills: Skill[];
  items: Item[];
  teams: Team[];
  activeTab: 'recommend' | 'skill' | 'item' | 'activity';
  filters: ListingFilters;
  fetchSkills: (category?: string) => Promise<void>;
  fetchItems: (category?: string) => Promise<void>;
  fetchTeams: (type?: string) => Promise<void>;
  setActiveTab: (tab: string) => void;
  setFilters: (filters: Partial<ListingFilters>) => void;
}

// src/stores/chat.store.ts
interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  unreadCount: number;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: number) => Promise<void>;
  sendMessage: (conversationId: number, content: string) => Promise<void>;
  markAsRead: (conversationId: number) => Promise<void>;
}

// src/stores/orders.store.ts
interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  fetchOrders: (role: 'buyer' | 'seller') => Promise<void>;
  createOrder: (data: CreateOrderDTO) => Promise<Order>;
  updateOrderStatus: (orderId: number, status: OrderStatus) => Promise<void>;
}
```

---

## 7. 组件架构

### 7.1 组件目录结构

```
src/
├── components/
│   ├── common/                    # 通用组件
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Chip/
│   │   ├── Modal/
│   │   ├── Skeleton/
│   │   └── EmptyState/
│   │
│   ├── layout/                    # 布局组件
│   │   ├── TopAppBar/
│   │   ├── BottomNavBar/
│   │   ├── PageLayout/
│   │   └── FAB/
│   │
│   ├── cards/                     # 卡片组件
│   │   ├── SkillCard/
│   │   ├── ItemCard/
│   │   └── TeamCard/
│   │
│   ├── forms/                     # 表单组件
│   │   ├── SkillForm/
│   │   ├── ItemForm/
│   │   └── TeamForm/
│   │
│   ├── chat/                      # 聊天组件
│   │   ├── ConversationList/
│   │   ├── MessageBubble/
│   │   ├── ChatInput/
│   │   └── TypingIndicator/
│   │
│   └── profile/                   # 个人中心组件
│       ├── ProfileHeader/
│       ├── StatsCard/
│       └── ReviewCard/
│
├── pages/                         # 页面组件
│   ├── Home/
│   ├── Exchange/
│   ├── Messages/
│   ├── Profile/
│   ├── SkillDetail/
│   ├── ItemDetail/
│   ├── TeamDetail/
│   ├── PostSkill/
│   ├── PostItem/
│   ├── PostTeam/
│   ├── Chat/
│   └── Auth/
│
├── hooks/                         # 自定义 Hooks
│   ├── useAuth.ts
│   ├── useListings.ts
│   ├── useChat.ts
│   ├── useOrders.ts
│   └── useRealtime.ts
│
├── stores/                        # Zustand Stores
│   ├── auth.store.ts
│   ├── listings.store.ts
│   ├── chat.store.ts
│   └── orders.store.ts
│
├── repositories/                  # 数据访问层
│   ├── base.repository.ts
│   ├── skills.repository.ts
│   ├── items.repository.ts
│   └── ...
│
├── types/                         # TypeScript 类型
│   ├── database.types.ts          # Supabase 自动生成
│   ├── models.ts
│   └── api.ts
│
├── lib/                           # 工具库
│   ├── supabase.ts
│   ├── realtime.ts
│   ├── storage.ts
│   └── utils.ts
│
└── styles/                        # 全局样式
    ├── variables.css
    └── globals.css
```

### 7.2 核心组件规范

#### 7.2.1 BottomNavBar

**UI 参考**: 所有 UI 模板的底部导航

```tsx
// 功能要点:
// - 固定底部，backdrop-blur-xl 效果
// - 4 个 Tab: 首页/交换/消息/我的
// - 当前激活 Tab: bg-primary text-white rounded-full scale-110
// - 未激活 Tab: text-on-surface-variant
```

#### 7.2.2 SkillCard

**UI 参考**: `ui_templates/home-exchange.html`

```tsx
// 结构:
// - 左侧: 32x32 封面图 (w-32 h-32 rounded-md)
// - 右侧: 标题 + 分类标签 + 我能提供/我想要 + 用户信息
// - 交互: hover 效果 + 点击跳转详情
```

#### 7.2.3 ItemCard

**UI 参考**: `ui_templates/home-marketplace.html`

```tsx
// 结构:
// - 横向布局 (flex-col md:flex-row)
// - 左侧图片区 + 右侧信息区
// - 价格展示 + 品相标签 + 位置信息
```

---

## 8. 安全规范

### 8.1 联系方式暴露规则

| 订单状态 | 买家可见 | 卖家可见 |
|----------|----------|----------|
| pending | 无 | 买家微信 |
| contacted | 卖家微信 | 买家微信 |
| completed | 卖家微信 | 买家微信 |
| cancelled | 无 | 买家微信 |

### 8.2 输入验证

```typescript
// src/lib/validation.ts
export const schemas = {
  skill: z.object({
    title: z.string().min(5).max(100),
    category: z.enum(['coding', 'design', 'academic', 'life', 'art', 'other']),
    description: z.string().min(20).max(2000),
    offer_description: z.string().min(10).max(500),
    want_description: z.string().min(10).max(500),
    price: z.number().positive().optional(),
    wechat_contact: z.string().regex(/^[\w-]{3,20}$/),
  }),

  item: z.object({
    title: z.string().min(5).max(100),
    category: z.enum(['books', 'electronics', 'daily', 'sports', 'other']),
    description: z.string().min(20).max(2000),
    condition: z.enum(['new', 'good', 'fair', 'poor']),
    price: z.number().positive(),
    wechat_contact: z.string().regex(/^[\w-]{3,20}$/),
  }),
};
```

### 8.3 XSS 防护

- 所有用户输入使用 DOMPurify 净化
- React 默认转义 HTML
- 禁止使用 dangerouslySetInnerHTML

---

## 9. 性能规范

### 9.1 目标指标

| 指标 | 目标值 |
|------|--------|
| 首屏加载 (FCP) | < 1.8s |
| 可交互时间 (TTI) | < 3s |
| 列表滚动帧率 | 60fps |
| 图片加载 | 懒加载 + WebP |

### 9.2 优化策略

1. **代码分割**: 路由级懒加载
2. **图片优化**:
   - 上传前压缩 (宽高 ≤ 1920px)
   - 使用 Supabase Transform API
   - 懒加载 (Intersection Observer)
3. **列表优化**:
   - 虚拟滚动 (react-window)
   - 分页加载 (每页 10 条)
   - 骨架屏加载状态
4. **缓存策略**:
   - React Query / Zustand 缓存
   - Service Worker (PWA)

---

## 10. 文件存储

### 10.1 Supabase Storage 配置

| 配置项 | 值 |
|--------|-----|
| Bucket 名称 | `listings-images` |
| 文件路径 | `{user_id}/{listing_type}/{uuid}.{ext}` |
| 单文件限制 | ≤ 5MB |
| 每条发布限制 | 最多 5 张图片 |
| 支持格式 | jpg, jpeg, png, webp |
| 访问权限 | Public (公开读取) |

### 10.2 上传流程

```typescript
// src/lib/storage.ts
export async function uploadImage(
  file: File,
  userId: string,
  listingType: 'skill' | 'item' | 'team'
): Promise<string> {
  // 1. 压缩图片
  const compressed = await compressImage(file, { maxWidth: 1920, quality: 0.8 });

  // 2. 生成文件名
  const ext = file.name.split('.').pop();
  const path = `${userId}/${listingType}/${crypto.randomUUID()}.${ext}`;

  // 3. 上传
  const { data, error } = await supabase.storage
    .from('listings-images')
    .upload(path, compressed);

  if (error) throw error;

  // 4. 获取公开 URL
  return supabase.storage.from('listings-images').getPublicUrl(path).data.publicUrl;
}
```

---

## 11. 部署配置

### 11.1 环境变量

```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 11.2 构建配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
});
```

---

## 12. 开发里程碑

| 阶段 | 时间 | 目标 |
|------|------|------|
| **Phase 1** | Week 1 | 项目初始化 + 设计系统 + 基础布局 |
| **Phase 2** | Week 2 | 首页 + 发布功能 (技能+物品) |
| **Phase 3** | Week 3 | 详情页 + 订单流程 |
| **Phase 4** | Week 4 | 组队功能整合 |
| **Phase 5** | Week 5 | 聊天功能 + 实时通信 |
| **Phase 6** | Week 6 | 收尾优化 + 测试部署 |

---

*文档版本: 1.0.0 | 最后更新: 2026-03-26*
