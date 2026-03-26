# Database Specification

## 1. 概述

本文档定义 Campus Exchange 平台的数据库结构，基于 PostgreSQL (Supabase)。

### 1.1 技术栈
- **数据库**: PostgreSQL 15+ (via Supabase)
- **认证**: Supabase Auth (集成 `auth.users`)
- **实时**: Supabase Realtime
- **存储**: Supabase Storage

### 1.2 命名约定
- 表名: 小写复数形式 (snake_case)
- 主键: `id` (UUID 或 BIGSERIAL)
- 外键: `{table}_id`
- 时间戳: `created_at`, `updated_at` (TIMESTAMPTZ)

---

## 2. 表结构定义

### 2.1 profiles - 用户资料表

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id VARCHAR(20) UNIQUE,              -- 学号
  nickname VARCHAR(50) NOT NULL,              -- 昵称
  avatar_url TEXT,                            -- 头像URL
  department VARCHAR(50),                     -- 院系
  grade VARCHAR(20),                          -- 年级
  wechat_id VARCHAR(50),                      -- 微信号
  bio TEXT,                                   -- 个人简介
  avg_rating DECIMAL(2,1) DEFAULT NULL,       -- 平均评分 (1.0-5.0)
  review_count INT DEFAULT 0,                 -- 评价数量
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_profiles_student_id ON profiles(student_id);
CREATE INDEX idx_profiles_department ON profiles(department);
```

**字段说明**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | UUID | ✅ | 关联 auth.users |
| student_id | VARCHAR(20) | ❌ | 学号，唯一 |
| nickname | VARCHAR(50) | ✅ | 显示名称 |
| avg_rating | DECIMAL(2,1) | ❌ | 至少3条评价后才显示 |

### 2.2 skills - 技能服务表

```sql
CREATE TYPE skill_category AS ENUM (
  'coding', 'design', 'academic', 'life', 'art', 'other'
);
CREATE TYPE listing_status AS ENUM (
  'active', 'inactive', 'sold'
);

CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  category skill_category NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  offer_description TEXT NOT NULL,            -- 我能提供
  want_description TEXT,                      -- 我想要
  price DECIMAL(10,2),                        -- 价格（展示用）
  exchange_preference BOOLEAN DEFAULT FALSE,  -- 接受技能交换
  images TEXT[] DEFAULT '{}',                 -- 图片URL数组
  wechat_contact VARCHAR(50),                 -- 发布者微信
  status listing_status DEFAULT 'active',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_skills_user_id ON skills(user_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_status ON skills(status);
CREATE INDEX idx_skills_created_at ON skills(created_at DESC);
```

### 2.3 items - 物品交易表

```sql
CREATE TYPE item_category AS ENUM (
  'books', 'electronics', 'daily', 'sports', 'other'
);
CREATE TYPE item_condition AS ENUM (
  'new', 'good', 'fair', 'poor'
);

CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  category item_category NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  condition item_condition NOT NULL DEFAULT 'good',
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),               -- 原价（显示折扣）
  exchange_preference BOOLEAN DEFAULT FALSE,  -- 接受物品交换
  images TEXT[] DEFAULT '{}',
  location VARCHAR(200),                      -- 交易地点
  wechat_contact VARCHAR(50),
  status listing_status DEFAULT 'active',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_items_user_id ON items(user_id);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_price ON items(price);
CREATE INDEX idx_items_created_at ON items(created_at DESC);
```

### 2.4 teams - 组队协作表

```sql
CREATE TYPE team_type AS ENUM (
  'competition', 'activity', 'project'
);
CREATE TYPE team_status AS ENUM (
  'recruiting', 'full', 'ended'
);

CREATE TABLE teams (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  type team_type NOT NULL DEFAULT 'competition',
  description TEXT NOT NULL,
  target_count INT NOT NULL,                  -- 目标人数
  current_count INT DEFAULT 1,                -- 当前人数
  deadline DATE NOT NULL,                     -- 截止日期
  roles_needed TEXT[] DEFAULT '{}',           -- 需要的角色
  wechat_contact VARCHAR(50),
  status team_status DEFAULT 'recruiting',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_teams_user_id ON teams(user_id);
CREATE INDEX idx_teams_type ON teams(type);
CREATE INDEX idx_teams_status ON teams(status);
CREATE INDEX idx_teams_deadline ON teams(deadline);
CREATE INDEX idx_teams_created_at ON teams(created_at DESC);
```

### 2.5 orders - 统一订单表

```sql
CREATE TYPE order_status AS ENUM (
  'pending',      -- 待联系
  'contacted',    -- 已联系
  'completed',    -- 已完成
  'cancelled'     -- 已取消
);
CREATE TYPE listing_type AS ENUM (
  'skill', 'item'
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  listing_type listing_type NOT NULL,
  listing_id BIGINT NOT NULL,                 -- skill_id 或 item_id
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  price DECIMAL(10,2),                        -- 记录交易价格
  note TEXT,                                  -- 买家备注
  status order_status DEFAULT 'pending',
  buyer_wechat VARCHAR(50) NOT NULL,          -- 买家微信
  seller_wechat VARCHAR(50),                  -- 卖家微信（确认后填充）
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 确保同一买家不能重复下单同一商品
  UNIQUE(listing_type, listing_id, buyer_id)
);

-- 索引
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_listing ON orders(listing_type, listing_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

### 2.6 applications - 组队申请表

```sql
CREATE TYPE application_status AS ENUM (
  'pending', 'approved', 'rejected'
);

CREATE TABLE applications (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,                       -- 申请理由
  wechat_contact VARCHAR(50) NOT NULL,        -- 联系方式
  status application_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 每个用户只能申请一次
  UNIQUE(team_id, user_id)
);

-- 索引
CREATE INDEX idx_applications_team_id ON applications(team_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
```

### 2.7 reviews - 评价表

```sql
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 每个订单每个用户只能评价一次
  UNIQUE(order_id, reviewer_id)
);

-- 索引
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

### 2.8 conversations - 会话表

```sql
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  participant1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_type listing_type,
  listing_id BIGINT,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 确保参与者顺序一致，避免重复会话
  CHECK (participant1_id < participant2_id),
  UNIQUE(participant1_id, participant2_id, listing_type, listing_id)
);

-- 索引
CREATE INDEX idx_conversations_p1 ON conversations(participant1_id);
CREATE INDEX idx_conversations_p2 ON conversations(participant2_id);
CREATE INDEX idx_conversations_last_msg ON conversations(last_message_at DESC);
```

### 2.9 messages - 消息表

```sql
CREATE TYPE message_type AS ENUM (
  'text', 'image', 'system'
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- 启用 Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

### 2.10 notifications - 通知表

```sql
CREATE TYPE notification_type AS ENUM (
  'new_order',
  'order_contacted',
  'order_completed',
  'order_cancelled',
  'new_application',
  'application_approved',
  'application_rejected',
  'new_message',
  'review_received'
);

CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  related_listing_type listing_type,
  related_listing_id BIGINT,
  related_order_id BIGINT REFERENCES orders(id),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- 启用 Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

---

## 3. 触发器

### 3.1 自动更新 updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 应用到所有需要的表
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3.2 更新用户评分

```sql
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    avg_rating = (
      SELECT AVG(rating)::DECIMAL(2,1)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rating_after_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_user_rating();
```

---

## 4. RLS 策略

### 4.1 profiles 表

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 所有人可查看公开资料
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 用户只能更新自己的资料
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 4.2 skills 表

```sql
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 所有人可查看 active 状态的技能
CREATE POLICY "Active skills are viewable by everyone"
  ON skills FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

-- 登录用户可创建
CREATE POLICY "Authenticated users can create skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 只有所有者可更新
CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = user_id);

-- 只有所有者可删除
CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.3 items 表

```sql
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active items are viewable by everyone"
  ON items FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create items"
  ON items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own items"
  ON items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own items"
  ON items FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.4 teams 表

```sql
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiting teams are viewable by everyone"
  ON teams FOR SELECT
  USING (status IN ('recruiting', 'full') OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create teams"
  ON teams FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own teams"
  ON teams FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own teams"
  ON teams FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.5 orders 表

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 买家和卖家可查看订单
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- 登录用户可创建订单（作为买家）
CREATE POLICY "Authenticated users can create orders as buyer"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- 买家和卖家可更新订单
CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
```

### 4.6 messages 表

```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 会话参与者可查看消息
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_id
      AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- 会话参与者可发送消息
CREATE POLICY "Conversation participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_id
      AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );
```

### 4.7 notifications 表

```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的通知
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- 用户只能更新自己的通知（标记已读）
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 5. ER 图

```
                    ┌─────────────────┐
                    │   auth.users    │
                    │    (Supabase)   │
                    └────────┬────────┘
                             │ 1:1
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                          profiles                               │
│  id (PK) | student_id | nickname | avg_rating | review_count   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
         ┌──────────────────┼──────────────────┬─────────────────┐
         │                  │                  │                 │
         ▼                  ▼                  ▼                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
│   skills    │    │   items     │    │   teams     │   │conversations│
│ (技能服务)  │    │ (物品交易)  │    │ (组队协作)  │   │   (会话)    │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘   └──────┬──────┘
       │                  │                  │                 │
       └────────┬─────────┘                  │                 │
                │                            │                 │
                ▼                            ▼                 ▼
         ┌─────────────┐             ┌───────────────┐  ┌─────────────┐
         │   orders    │             │ applications  │  │  messages   │
         │  (订单)     │             │  (申请)       │  │  (消息)     │
         └──────┬──────┘             └───────────────┘  └─────────────┘
                │
                ▼
         ┌─────────────┐
         │   reviews   │
         │  (评价)     │
         └─────────────┘

┌─────────────┐
 │notifications│
 │  (通知)     │
 └─────────────┘
```

---

## 6. 种子数据

```sql
-- 测试用户（需要先通过 Supabase Auth 创建）
-- INSERT INTO profiles VALUES ...;

-- 测试技能
INSERT INTO skills (user_id, title, category, description, offer_description, want_description, price) VALUES
  ('{user-uuid}', 'Python编程辅导', 'coding', '5年Python经验，可辅导基础到进阶', '爬虫开发、数据分析指导', 'Figma设计基础指导', 50.00);

-- 测试物品
INSERT INTO items (user_id, title, category, description, condition, price, original_price, location) VALUES
  ('{user-uuid}', '高等数学 同济第七版', 'books', '九成新，无笔记划线', 'good', 45.00, 89.00, '图书馆门口');

-- 测试组队
INSERT INTO teams (user_id, title, type, description, target_count, deadline, roles_needed) VALUES
  ('{user-uuid}', 'ACM程序设计竞赛', 'competition', '参加2024年ACM区域赛', 3, '2024-11-15', ARRAY['C++高手', '算法策略师']);
```

---

*文档版本: 1.0*
*最后更新: 2026-03-26*
