# Campus Exchange - Database Infrastructure

校园技能交易平台的数据库基础设施。

## 快速开始

### 前置要求

- Node.js 18+
- Supabase CLI (`npm install -g supabase`)
- Docker (Supabase 本地开发需要)

### 本地开发

```bash
# 1. 启动本地 Supabase（首次会下载 Docker 镜像）
supabase start

# 2. 重置数据库并应用所有迁移
supabase db reset

# 3. 访问本地服务
# Studio:     http://127.0.0.1:54323
# API:        http://127.0.0.1:54321
# Database:   postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### 部署到 Supabase Cloud

```bash
# 1. 登录 Supabase
supabase login

# 2. 关联项目
supabase link --project-ref <your-project-ref>

# 3. 推送迁移
supabase db push

# 4.（可选）推送种子数据
supabase db seed
```

## 数据库架构

### 核心表

| 表名 | 描述 | 主要字段 |
|------|------|----------|
| `profiles` | 用户资料 | nickname, avg_rating, review_count |
| `skills` | 技能服务 | title, category, offer/want_description |
| `items` | 物品交易 | title, category, condition, price |
| `teams` | 组队协作 | title, type, target_count, deadline |
| `orders` | 统一订单 | listing_type, buyer_id, seller_id, status |
| `applications` | 组队申请 | team_id, user_id, reason, status |
| `reviews` | 订单评价 | rating (1-5), comment |
| `conversations` | 会话 | participant1_id, participant2_id |
| `messages` | 消息 | content, message_type, is_read |
| `notifications` | 系统通知 | type, title, content, is_read |

### 关系图

```
profiles ─┬─< skills ────< orders ────< reviews
          ├─< items ────< orders ────< reviews
          ├─< teams ────< applications
          ├─< conversations ───< messages
          ├─< notifications
          └─< reviews (as reviewer/reviewee)
```

### 订单状态流转

```
pending (待联系) → contacted (已联系) → completed (已完成)
       ↘
        cancelled (已取消)
```

## RLS 安全策略

所有表都启用了行级安全 (RLS)：

- **profiles**: 所有人可查看，只能更新自己
- **skills/items/teams**: active 状态公开可见，只能管理自己的
- **orders**: 买家和卖家可查看和更新自己的订单
- **messages**: 会话参与者可访问
- **notifications**: 只能查看自己的通知

## 触发器

| 触发器 | 功能 |
|--------|------|
| `update_updated_at_column` | 自动更新 `updated_at` 字段 |
| `update_user_rating` | 收到评价后更新用户平均分 |
| `update_conversation_last_message` | 发送消息后更新会话最后消息 |
| `update_team_count_on_approval` | 申请通过后更新组队人数 |
| `notify_new_order` | 新订单时通知卖家 |
| `notify_order_status_change` | 订单状态变更时通知相关用户 |

## TypeScript 类型

使用 `src/types/database.ts` 获取完整的类型定义：

```typescript
import { Database, Skill, Order, Profile } from './types/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(url, key)

// 类型安全的查询
const { data } = await supabase
  .from('skills')
  .select('*, profiles(nickname)')
  .eq('status', 'active')
```

## 迁移文件说明

| 文件 | 描述 |
|------|------|
| `000000_enums.sql` | 自定义 ENUM 类型 |
| `000001_profiles.sql` | 用户资料表 + 自动创建触发器 |
| `000002_listings.sql` | 技能、物品、组队表 |
| `000003_orders.sql` | 订单、申请、评价表 |
| `000004_messaging.sql` | 通讯系统表 |
| `000005_triggers.sql` | 业务逻辑触发器 |
| `000006_rls.sql` | RLS 安全策略 |

## 常用命令

```bash
# 生成迁移文件
supabase migration new <migration_name>

# 查看迁移状态
supabase db diff

# 生成 TypeScript 类型（远程）
supabase gen types typescript --project-id <project-id> > src/types/database.ts

# 本地生成类型
supabase gen types typescript --local > src/types/database.ts
```

## 许可证

MIT
