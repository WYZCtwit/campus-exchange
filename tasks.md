# Database Infrastructure Tasks

## Phase 1: Database Setup

### T-001 ✅ 初始化工作树
- 创建独立 worktree 进行数据库开发

### T-002 ✅ 分析 PRD 数据模型
- 分析 PRD-campus-exchange.md 中的 SQL 结构
- 确认表关系和字段定义

### T-003 ✅ 创建数据库规格文档 (spec.md)
- [x] 定义完整的 SQL Schema
- [x] 添加字段注释和约束说明
- [x] 定义索引策略
- [x] 定义 RLS 策略框架

**产出**: `spec.md`

### T-004 ✅ 创建核心表迁移文件
- [x] profiles 表（用户资料）
- [x] skills 表（技能服务）
- [x] items 表（物品交易）
- [x] teams 表（组队协作）

**产出**: `supabase/migrations/20260326000001_profiles.sql`, `20260326000002_listings.sql`

### T-005 ✅ 创建订单系统迁移文件
- [x] orders 表（统一订单）
- [x] applications 表（组队申请）
- [x] reviews 表（评价系统）

**产出**: `supabase/migrations/20260326000003_orders.sql`

### T-006 ✅ 创建通讯系统迁移文件
- [x] conversations 表（会话）
- [x] messages 表（消息）
- [x] notifications 表（通知）

**产出**: `supabase/migrations/20260326000004_messaging.sql`

### T-007 ✅ 创建辅助功能
- [x] 索引优化（各迁移文件中）
- [x] 触发器（updated_at 自动更新）
- [x] 种子数据（测试数据）
- [x] RLS 策略实现
- [x] TypeScript 类型定义

**产出**:
- `supabase/migrations/20260326000005_triggers.sql`
- `supabase/migrations/20260326000006_rls.sql`
- `supabase/seed/001_test_data.sql`
- `src/types/database.ts`

---

## 文件结构

```
phase1-db/
├── spec.md                          # 数据库规格文档
├── tasks.md                         # 任务列表（本文件）
├── supabase/
│   ├── config.toml                  # Supabase 配置
│   ├── migrations/
│   │   ├── 20260326000000_enums.sql     # ENUM 类型定义
│   │   ├── 20260326000001_profiles.sql  # 用户资料表
│   │   ├── 20260326000002_listings.sql  # 技能/物品/组队表
│   │   ├── 20260326000003_orders.sql    # 订单/申请/评价表
│   │   ├── 20260326000004_messaging.sql # 通讯系统表
│   │   ├── 20260326000005_triggers.sql  # 触发器
│   │   └── 20260326000006_rls.sql       # RLS 策略
│   └── seed/
│       └── 001_test_data.sql        # 测试数据
└── src/
    └── types/
        └── database.ts              # TypeScript 类型定义
```

---

## 使用方法

### 本地开发

```bash
# 1. 安装 Supabase CLI
npm install -g supabase

# 2. 启动本地 Supabase
supabase start

# 3. 应用迁移
supabase db reset

# 4. 查看本地 Studio
# 浏览器打开 http://127.0.0.1:54323
```

### 部署到远程

```bash
# 1. 关联远程项目
supabase link --project-ref <your-project-ref>

# 2. 推送迁移
supabase db push

# 3. 推送种子数据（可选）
supabase db seed
```

---

## 状态说明
- ⏳ 待开始
- 🔄 进行中
- ✅ 已完成
- ❌ 已阻塞

---

*最后更新: 2026-03-26*
