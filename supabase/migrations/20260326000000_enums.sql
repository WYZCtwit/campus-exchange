-- =====================================================
-- Migration: Custom ENUM Types
-- File: 20260326000000_enums.sql
-- Description: Define all custom ENUM types for the database
-- =====================================================

-- Skill categories
CREATE TYPE skill_category AS ENUM (
  'coding',     -- 编程开发
  'design',     -- 设计
  'academic',   -- 学业辅导
  'life',       -- 生活服务
  'art',        -- 艺术创作
  'other'       -- 其他
);

-- Item categories
CREATE TYPE item_category AS ENUM (
  'books',       -- 教材书籍
  'electronics', -- 电子产品
  'daily',       -- 日用百货
  'sports',      -- 运动器材
  'other'        -- 其他
);

-- Item condition
CREATE TYPE item_condition AS ENUM (
  'new',   -- 全新
  'good',  -- 良好
  'fair',  -- 一般
  'poor'   -- 较差
);

-- Team types
CREATE TYPE team_type AS ENUM (
  'competition', -- 比赛组队
  'activity',    -- 活动组队
  'project'      -- 项目组队
);

-- Listing status (for skills and items)
CREATE TYPE listing_status AS ENUM (
  'active',    -- 在售/可用
  'inactive',  -- 下架
  'sold'       -- 已售出
);

-- Team status
CREATE TYPE team_status AS ENUM (
  'recruiting', -- 招募中
  'full',       -- 已满员
  'ended'       -- 已结束
);

-- Order status
CREATE TYPE order_status AS ENUM (
  'pending',    -- 待联系
  'contacted',  -- 已联系
  'completed',  -- 已完成
  'cancelled'   -- 已取消
);

-- Application status
CREATE TYPE application_status AS ENUM (
  'pending',   -- 待审核
  'approved',  -- 已通过
  'rejected'   -- 已拒绝
);

-- Listing type (for orders and conversations)
CREATE TYPE listing_type AS ENUM (
  'skill',
  'item'
);

-- Message type
CREATE TYPE message_type AS ENUM (
  'text',    -- 文本消息
  'image',   -- 图片消息
  'system'   -- 系统消息
);

-- Notification type
CREATE TYPE notification_type AS ENUM (
  'new_order',            -- 新订单（卖家收到）
  'order_contacted',      -- 订单已联系（买家收到）
  'order_completed',      -- 订单已完成（双方收到）
  'order_cancelled',      -- 订单已取消（对方收到）
  'new_application',      -- 新组队申请（发起人收到）
  'application_approved', -- 申请通过（申请人收到）
  'application_rejected', -- 申请被拒（申请人收到）
  'new_message',          -- 新消息
  'review_received'       -- 收到评价
);

-- =====================================================
-- Comments for documentation
-- =====================================================
COMMENT ON TYPE skill_category IS '技能服务分类';
COMMENT ON TYPE item_category IS '物品交易分类';
COMMENT ON TYPE item_condition IS '物品品相等级';
COMMENT ON TYPE team_type IS '组队类型';
COMMENT ON TYPE listing_status IS '发布状态（技能/物品）';
COMMENT ON TYPE team_status IS '组队状态';
COMMENT ON TYPE order_status IS '订单状态';
COMMENT ON TYPE application_status IS '组队申请状态';
COMMENT ON TYPE listing_type IS '发布类型（用于订单和会话）';
COMMENT ON TYPE message_type IS '消息类型';
COMMENT ON TYPE notification_type IS '通知类型';
