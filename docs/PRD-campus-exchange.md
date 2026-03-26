# 校园技能交易平台 PRD
## Campus Skill Exchange Platform - Product Requirements Document

---

## 1. 文档信息

| 项目 | 内容 |
|------|------|
| **项目名称** | Campus Exchange (校园交换) |
| **版本** | v2.0 |
| **日期** | 2026-03-26 |
| **状态** | Draft |
| **作者** | Product Team |

---

## 2. 执行摘要

### 2.1 项目概述
打造一个校园版"闲鱼"——**技能变现 + 物品交易 + 组队协作**的综合平台。让学生可以：
- 出售自己的技能服务（如编程辅导、设计服务）
- 交易二手物品（如教材、电子产品）
- 寻找队友参加比赛或活动

### 2.2 核心价值
- **技能变现**：让学生用自己的专长赚取收入或换取所需
- **物品流转**：校园内二手物品高效流转
- **协作连接**：帮助找到志同道合的队友

### 2.3 目标用户
- **主要用户**：在校大学生
- **典型场景**：
  - 计算机系学生想用Python辅导换取UI设计帮助
  - 大四学生想出售不再需要的专业教材
  - 学生想找队友参加ACM程序设计竞赛

---

## 3. 功能架构

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     Campus Exchange                          │
├─────────────────┬─────────────────┬─────────────────────────┤
│   技能交易       │    物品交易      │      组队协作            │
│  Skill Exchange │  Item Exchange  │    Team Collaboration   │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • 发布技能      │ • 发布物品      │ • 发布组队              │
│ • 浏览技能      │ • 浏览物品      │ • 浏览组队              │
│ • 下单预约      │ • 下单购买      │ • 申请加入              │
│ • 服务完成      │ • 交易完成      │ • 审核通过              │
└─────────────────┴─────────────────┴─────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │    基础服务        │
                    ├───────────────────┤
                    │ • 用户认证        │
                    │ • 即时通讯        │
                    │ • 通知系统        │
                    │ • 订单管理        │
                    └───────────────────┘
```

### 3.2 导航结构

```
底部导航（4个Tab）：

┌────────────┬────────────┬────────────┬────────────┐
│    首页    │    交换    │    消息    │    我的    │
│   /home    │ /exchange  │   /chat    │  /profile  │
└────────────┴────────────┴────────────┴────────────┘

组队入口（独立但整合）：
- 首页 → 活动 Tab → 组队卡片
- 交换中心 → 组队筛选
- 个人中心 → 我的组队
```

---

## 4. 功能详细设计

### 4.1 首页 (Home)

#### 4.1.1 页面结构
```
┌────────────────────────────────────┐
│  TopAppBar                         │
│  ┌──────────────────────────────┐  │
│  │ 头像    Campus Exchange   🔔 │  │
│  └──────────────────────────────┘  │
├────────────────────────────────────┤
│  Tab导航                           │
│  ┌──────────────────────────────┐  │
│  │ 推荐 | 技能 | 物品 | 活动    │  │
│  └──────────────────────────────┘  │
├────────────────────────────────────┤
│  信息流                            │
│  ┌──────────────────────────────┐  │
│  │  技能卡片（我能提供↔我想要）  │  │
│  ├──────────────────────────────┤  │
│  │  物品卡片（图片+价格+描述）   │  │
│  ├──────────────────────────────┤  │
│  │  组队卡片（寻找队友）         │  │
│  └──────────────────────────────┘  │
├────────────────────────────────────┤
│  FAB: + 发布                       │
└────────────────────────────────────┘
```

#### 4.1.2 功能要点
- **智能推荐**：根据用户专业、兴趣推荐相关内容
- **分类筛选**：支持按类型、价格、时间筛选
- **下拉刷新**：支持下拉刷新加载最新内容
- **无限滚动**：分页加载更多

### 4.2 交换中心 (Exchange)

#### 4.2.1 技能交易

**发布技能表单**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 标题 | text | ✅ | 技能服务名称 |
| 分类 | select | ✅ | Coding/Design/Academic/Life/Art/Other |
| 描述 | textarea | ✅ | 详细描述服务内容 |
| 我能提供 | text | ✅ | 具体能提供什么 |
| 我想要 | text | ✅ | 想要换取什么（金钱/技能交换） |
| 价格 | number | 条件 | 如果是金钱交易 |
| 图片 | image[] | ❌ | 作品展示图片 |
| 联系方式 | text | ✅ | 微信号 |

**技能卡片设计**：
```
┌────────────────────────────────────────┐
│ ┌──────────┐  🏷️ Coding · Design       │
│ │          │  Python编程 换 UI设计指导  │
│ │  封面图   │  ─────────────────────── │
│ │          │  ✨ 我能提供: 爬虫实战     │
│ │          │  🔄 我想要: Figma基础      │
│ └──────────┘  ─────────────────────── │
│               👤 Zhang.Dev · 2小时前   │
└────────────────────────────────────────┘
```

#### 4.2.2 物品交易

**发布物品表单**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 标题 | text | ✅ | 物品名称 |
| 分类 | select | ✅ | Books/Electronics/Daily/Sports/Other |
| 描述 | textarea | ✅ | 详细描述物品状况 |
| 品相 | select | ✅ | 全新/良好/一般/较差 |
| 价格 | number | ✅ | 出售价格 |
| 原价 | number | ❌ | 原价（用于显示折扣） |
| 图片 | image[] | ✅ | 物品图片（至少1张） |
| 交易地点 | text | ✅ | 自提地点 |
| 联系方式 | text | ✅ | 微信号 |

**物品卡片设计**：
```
┌────────────────────────────────────────┐
│ ┌──────────┐  📚 Books                 │
│ │          │  高等数学 同济第七版       │
│ │  封面图   │  ─────────────────────── │
│ │          │  九成新，无笔记划线        │
│ │          │  ─────────────────────── │
│ └──────────┘  ¥45 (原价¥89)           │
│               📍 图书馆 · 1天前        │
└────────────────────────────────────────┘
```

### 4.3 组队协作 (Team)

#### 4.3.1 组队类型
- **比赛组队**：ACM、数学建模、创新创业等
- **活动组队**：社团活动、志愿服务、户外活动等
- **项目组队**：课程项目、创业项目等

#### 4.3.2 发布组队表单
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 标题 | text | ✅ | 组队名称 |
| 类型 | select | ✅ | 比赛/活动/项目 |
| 描述 | textarea | ✅ | 详细描述组队目的 |
| 目标人数 | number | ✅ | 需要多少人 |
| 截止日期 | date | ✅ | 报名截止日期 |
| 寻找角色 | text[] | ✅ | 需要什么类型的队友 |
| 联系方式 | text | ✅ | 微信号 |

**组队卡片设计**：
```
┌────────────────────────────────────────┐
│ ┌──────────┐  📅 报名截止: 2024.11.15  │
│ │          │  ACM 程序设计竞赛         │
│ │  活动图   │  ─────────────────────── │
│ │          │  🔍 寻找队友:             │
│ │          │     C++高手 · 算法策略师  │
│ └──────────┘  ─────────────────────── │
│               👤 Captain Chen · 计算机系 │
│               [立即加入]               │
└────────────────────────────────────────┘
```

### 4.4 消息中心 (Chat)

#### 4.4.1 会话列表
```
┌────────────────────────────────────────┐
│  搜索框: 搜索聊天、技能或教材...       │
├────────────────────────────────────────┤
│  Tab: All Chats | Unread | Skill | Item │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ 👤 Alex Chen (Python Tutor)  🔵  │  │
│  │     Sure! I can help you...  2m  │  │
│  ├──────────────────────────────────┤  │
│  │ 📚 Used Textbook Trade       ③   │  │
│  │     Is the Organic Chem...  1d   │  │
│  ├──────────────────────────────────┤  │
│  │ 👤 Jordan Lee (Project)          │  │
│  │     I've uploaded the draft  Feb │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

#### 4.4.2 聊天详情
- 消息气泡（区分自己/对方）
- 图片消息支持
- 实时消息订阅
- 消息已读状态

### 4.5 个人中心 (Profile)

#### 4.5.1 个人资料页
```
┌────────────────────────────────────────┐
│  ┌────────────────────────────────┐    │
│  │  头像                          │    │
│  │  Captain Chen                  │    │
│  │  一名热爱全栈开发的程序员       │    │
│  └────────────────────────────────┘    │
├────────────────────────────────────────┤
│  ┌────────┐ ┌────────┐                 │
│  │ 12     │ │ 28      │                │
│  │ 项目   │ │ 交易    │                │
│  └────────┘ └────────┘                 │
├────────────────────────────────────────┤
│  📋 我的技能服务                        │
│  📦 我的物品                            │
│  📝 我的订单                            │
│  👥 我的组队                            │
│  ⚙️ 设置                               │
└────────────────────────────────────────┘
```

### 4.6 交易流程

#### 4.6.1 订单状态流转
```
┌──────────────────────────────────────────────────────────────────┐
│                        订单生命周期                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [买家发起]                                                      │
│       │                                                          │
│       ▼                                                          │
│   ┌─────────┐      卖家确认联系      ┌──────────┐                 │
│   │ pending │ ──────────────────────▶│ contacted │                │
│   │ (待联系) │                        │ (已联系)  │                │
│   └─────────┘                        └──────────┘                 │
│       │                                   │                      │
│       │ 取消                              │ 交易完成               │
│       ▼                                   ▼                      │
│   ┌───────────┐                    ┌───────────┐                 │
│   │ cancelled │                    │ completed │                 │
│   │ (已取消)  │                    │ (已完成)  │                 │
│   └───────────┘                    └───────────┘                 │
│                                          │                      │
│                                          ▼                      │
│                                    [双方互评]                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### 4.6.2 联系方式暴露规则
| 状态 | 买家可见 | 卖家可见 |
|------|---------|---------|
| pending | 无 | 买家微信 |
| contacted | 卖家微信 | 买家微信 |
| completed/cancelled | 卖家微信 | 买家微信 |

#### 4.6.3 线下交易说明
- **平台定位**：信息展示平台，不参与资金流转
- **交易方式**：双方通过微信沟通，自行约定交易方式
- **纠纷处理**：平台不介入线下交易纠纷，建议保留聊天记录

### 4.7 评价系统

#### 4.7.1 评价规则
- **评价时机**：订单状态变为 `completed` 后，双方可互相评价
- **评价内容**：1-5 星评分 + 可选文字评价
- **评价期限**：交易完成后 7 天内可评价
- **评价限制**：每个订单双方各只能评价一次

#### 4.7.2 评分计算
```
用户平均分 = Σ(所有收到的评分) / 评价数量
```
- 新用户默认无评分显示
- 至少收到 3 个评价后才显示平均分

#### 4.7.3 评价展示
```
┌────────────────────────────────────────┐
│  ⭐⭐⭐⭐⭐ 4.8 (28条评价)              │
│  ────────────────────────────────     │
│  "很耐心的Python辅导，推荐！"           │
│                                 - 匿名 │
└────────────────────────────────────────┘
```

---

## 5. 数据模型

### 5.1 核心表结构

```sql
-- 用户资料表（现有）
profiles (
  id UUID PRIMARY KEY,
  student_id VARCHAR(20) UNIQUE,
  nickname VARCHAR(50),
  avatar_url TEXT,
  department VARCHAR(50),
  grade VARCHAR(20),
  wechat_id VARCHAR(50),
  avg_rating DECIMAL(2,1),        -- 平均评分 (1.0-5.0)
  review_count INT DEFAULT 0,     -- 评价数量
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 技能服务表
skills (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title VARCHAR(100),
  category VARCHAR(50),        -- coding/design/academic/life/art/other
  description TEXT,
  offer_description TEXT,      -- 我能提供
  want_description TEXT,       -- 我想要
  price DECIMAL(10,2),         -- 价格（仅展示用，线下交易）
  exchange_preference BOOLEAN DEFAULT FALSE, -- 是否接受技能交换
  images TEXT[],
  wechat_contact VARCHAR(50),  -- 发布者微信（订单确认后对买家可见）
  status VARCHAR(20),          -- active/inactive
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 物品表（新增）
items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title VARCHAR(100),
  category VARCHAR(50),        -- books/electronics/daily/sports/other
  description TEXT,
  condition VARCHAR(20),       -- new/good/fair/poor
  price DECIMAL(10,2),         -- 价格（仅展示用，线下交易）
  original_price DECIMAL(10,2),
  exchange_preference BOOLEAN DEFAULT FALSE, -- 是否接受物品交换
  images TEXT[],
  location VARCHAR(200),
  wechat_contact VARCHAR(50),  -- 发布者微信（订单确认后对买家可见）
  status VARCHAR(20),          -- active/sold/inactive
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 组队表（现有，保留）
teams (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title VARCHAR(100),
  type VARCHAR(20),            -- competition/activity/project
  description TEXT,
  target_count INT,
  current_count INT,
  deadline DATE,
  roles_needed TEXT[],
  wechat_contact VARCHAR(50),
  status VARCHAR(20),          -- recruiting/full/ended
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 订单表（统一，线下交易模式）
orders (
  id BIGSERIAL PRIMARY KEY,
  listing_type VARCHAR(20),    -- skill/item
  listing_id BIGINT,           -- skill_id 或 item_id
  buyer_id UUID REFERENCES profiles(id),
  seller_id UUID REFERENCES profiles(id),
  price DECIMAL(10,2),         -- 记录交易价格
  note TEXT,
  status VARCHAR(20),          -- pending(待联系)/contacted(已联系)/completed(已完成)/cancelled(已取消)
  buyer_wechat VARCHAR(50),    -- 买家微信（订单创建时填入）
  seller_wechat VARCHAR(50),   -- 卖家微信（卖家确认后可见）
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 申请表（组队）
applications (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT REFERENCES teams(id),
  user_id UUID REFERENCES profiles(id),
  reason TEXT,
  wechat_contact VARCHAR(50),
  status VARCHAR(20),          -- pending/approved/rejected
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- 会话表
conversations (
  id BIGSERIAL PRIMARY KEY,
  participant1_id UUID REFERENCES profiles(id),
  participant2_id UUID REFERENCES profiles(id),
  listing_type VARCHAR(20),
  listing_id BIGINT,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)

-- 消息表
messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT REFERENCES conversations(id),
  sender_id UUID REFERENCES profiles(id),
  content TEXT,
  message_type VARCHAR(20),    -- text/image
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ
)

-- 通知表
notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  type VARCHAR(50),            -- new_order/order_contacted/order_completed/new_application/application_approved/application_rejected/new_message/review_received
  title VARCHAR(100),
  content TEXT,
  related_listing_type VARCHAR(20),
  related_listing_id BIGINT,
  related_order_id BIGINT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ
)

-- 评价表
reviews (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id),
  reviewer_id UUID REFERENCES profiles(id),
  reviewee_id UUID REFERENCES profiles(id),
  rating INT CHECK (rating >= 1 AND rating <= 5), -- 1-5 星评分
  comment TEXT,
  created_at TIMESTAMPTZ
)
```

### 5.2 关系图

```
profiles ─┬─< skills ────< orders ────< reviews
          ├─< items ────< orders ────< reviews
          ├─< teams ────< applications
          ├─< conversations ───< messages
          ├─< notifications
          └─< reviews (as reviewer/reviewee)
```

---

## 6. 非功能需求

### 6.1 性能要求
- 页面首次加载 < 3秒
- 列表滚动流畅（60fps）
- 图片懒加载
- 分页加载（每页10条）

### 6.2 安全要求
- 所有用户输入验证
- RLS策略确保数据隔离
- 微信号仅在订单/申请通过后可见
- 防止SQL注入和XSS攻击

### 6.3 兼容性
- 移动端优先（375px - 414px）
- 支持 iOS Safari, Android Chrome
- 支持深色模式（后续版本）

### 6.4 UI设计约束 ⚠️ 强制要求

**必须严格按照 Figma 模板进行前端开发，不允许自由发挥或"优化"设计。**

| 约束项 | 要求 |
|--------|------|
| **设计来源** | Figma 文件：https://www.figma.com/design/5yAvOa9qmqC0YFyK3Yn8yh/Untitled |
| **颜色系统** | 严格使用模板中定义的颜色变量，禁止自定义 |
| **字体** | Plus Jakarta Sans (标题) + Manrope (正文)，禁止替换 |
| **间距** | 按模板的 spacing 系统，禁止随意调整 |
| **圆角** | 按模板定义：1rem/2rem/3rem/full |
| **组件样式** | 每个组件需与 Figma 1:1 对应 |
| **布局** | 页面结构、卡片样式、导航位置必须与模板一致 |

**开发流程要求**：
1. 开发前必须先查看 `prd2.md` 中对应的 HTML 模板代码
2. 每个页面/组件开发完成后，需与 Figma 设计进行视觉对比验收
3. 如发现设计与模板不符，必须修改代码而非"记录为已知差异"

**验收标准**：
- [ ] 颜色值与 Figma 完全一致（允许 ±1% 色差）
- [ ] 字体大小、行高与 Figma 一致
- [ ] 间距使用模板定义的 token
- [ ] 组件交互效果与 Figma 原型一致

---

## 7. 技术栈

| 层级 | 技术选型 |
|------|----------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite |
| 样式方案 | Tailwind CSS + CSS Variables |
| 状态管理 | Zustand |
| 路由 | React Router v6 |
| 后端服务 | Supabase (PostgreSQL + Auth + Realtime + Storage) |
| 实时通信 | Supabase Realtime |
| 文件存储 | Supabase Storage |

---

## 8. 里程碑计划

| 阶段 | 时间 | 目标 |
|------|------|------|
| Phase 1 | Week 1 | 设计系统 + 基础布局 + 导航 |
| Phase 2 | Week 2 | 首页 + 发布功能（技能+物品） |
| Phase 3 | Week 3 | 详情页 + 订单流程 |
| Phase 4 | Week 4 | 组队功能整合 |
| Phase 5 | Week 5 | 聊天功能 + 实时通信 |
| Phase 6 | Week 6 | 收尾优化 + 测试部署 |

---

## 9. 成功指标

| 指标 | 目标值 |
|------|--------|
| DAU（日活用户） | 500+ |
| 发布转化率 | 10%+ |
| 订单完成率 | 80%+ |
| 用户满意度 | 4.5/5 |

---

## 10. 风险与缓解

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 用户发布意愿低 | 中 | 高 | 提供发布模板，降低门槛 |
| 交易信任问题 | 中 | 高 | 校园身份认证，微信沟通 |
| 功能过于复杂 | 高 | 中 | MVP优先，迭代开发 |

---

## 11. 附录

### 11.1 设计参考 ⚠️

**Figma 设计文件（唯一权威来源）**：
- 链接：https://www.figma.com/design/5yAvOa9qmqC0YFyK3Yn8yh/Untitled
- 本地备份：`prd2.md`（包含 HTML 模板代码）

**设计令牌**：
| Token | 值 | 用途 |
|-------|-----|------|
| primary | #0053ca | 主操作按钮、选中状态 |
| secondary | #006a28 | 成功、交换相关 |
| tertiary | #6d5a00 | 高亮、警告 |
| error | #b31b25 | 错误、删除 |
| surface | #f7f5ff | 页面背景 |
| on-surface | #262c51 | 主文字颜色 |

**字体**：
- 标题：Plus Jakarta Sans (Google Fonts)
- 正文：Manrope (Google Fonts)
- 图标：Material Symbols Outlined

**风格**：Material Design 3

### 11.2 竞品参考
- 闲鱼（物品交易）
- 技能互换平台（技能交易）
- 豆瓣小组（社区协作）

### 11.3 图片存储方案

**Supabase Storage 配置**：
| 配置项 | 值 |
|--------|-----|
| Bucket 名称 | `listings-images` |
| 文件路径 | `{user_id}/{listing_type}/{uuid}.{ext}` |
| 单文件限制 | ≤ 5MB |
| 每条发布限制 | 最多 5 张图片 |
| 支持格式 | jpg, jpeg, png, webp |
| 访问权限 | Public (公开读取) |

**图片处理流程**：
1. 前端压缩图片（宽高 ≤ 1920px）
2. 上传至 Supabase Storage
3. 获取公开 URL 存入数据库

### 11.4 通知类型枚举

```typescript
type NotificationType =
  | 'new_order'            // 新订单通知（卖家收到）
  | 'order_contacted'      // 订单已联系（买家收到）
  | 'order_completed'      // 订单已完成（双方收到）
  | 'order_cancelled'      // 订单已取消（对方收到）
  | 'new_application'      // 新组队申请（发起人收到）
  | 'application_approved' // 申请通过（申请人收到）
  | 'application_rejected' // 申请被拒（申请人收到）
  | 'new_message'          // 新消息
  | 'review_received'      // 收到评价
```

---

*文档结束*
