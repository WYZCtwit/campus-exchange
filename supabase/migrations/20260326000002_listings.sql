-- =====================================================
-- Migration: Listings (Skills, Items, Teams)
-- File: 20260326000002_listings.sql
-- Description: Core listing tables for skills, items, and teams
-- =====================================================

-- =====================================================
-- Skills Table (技能服务)
-- =====================================================
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  category skill_category NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  offer_description TEXT NOT NULL,            -- 我能提供什么
  want_description TEXT,                      -- 我想要什么（金钱或技能交换）
  price DECIMAL(10,2),                        -- 价格（仅展示，线下交易）
  exchange_preference BOOLEAN DEFAULT FALSE,  -- 是否接受技能交换
  images TEXT[] DEFAULT '{}',                 -- 图片URL数组
  wechat_contact VARCHAR(50),                 -- 发布者微信
  status listing_status DEFAULT 'active',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 价格约束
  CONSTRAINT valid_skill_price CHECK (price IS NULL OR price >= 0)
);

-- Skills indexes
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_created_at ON skills(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_price ON skills(price) WHERE price IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_skills_active ON skills(id) WHERE status = 'active';

-- Skills comments
COMMENT ON TABLE skills IS '技能服务表';
COMMENT ON COLUMN skills.offer_description IS '我能提供的服务内容';
COMMENT ON COLUMN skills.want_description IS '我想要换取的内容（金钱/技能）';
COMMENT ON COLUMN skills.exchange_preference IS '是否接受技能交换而非金钱';
COMMENT ON COLUMN skills.wechat_contact IS '发布者微信，订单确认后对买家可见';

-- =====================================================
-- Items Table (物品交易)
-- =====================================================
CREATE TABLE IF NOT EXISTS items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  category item_category NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  condition item_condition NOT NULL DEFAULT 'good',
  price DECIMAL(10,2) NOT NULL,               -- 出售价格
  original_price DECIMAL(10,2),               -- 原价（显示折扣）
  exchange_preference BOOLEAN DEFAULT FALSE,  -- 是否接受物品交换
  images TEXT[] DEFAULT '{}',
  location VARCHAR(200),                      -- 交易地点
  wechat_contact VARCHAR(50),                 -- 发布者微信
  status listing_status DEFAULT 'active',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 价格约束
  CONSTRAINT valid_item_price CHECK (price >= 0),
  CONSTRAINT valid_original_price CHECK (original_price IS NULL OR original_price >= 0)
);

-- Items indexes
CREATE INDEX IF NOT EXISTS idx_items_user_id ON items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_condition ON items(condition);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_items_price ON items(price);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_items_active ON items(id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_items_location ON items(location);

-- Items comments
COMMENT ON TABLE items IS '物品交易表';
COMMENT ON COLUMN items.condition IS '物品品相：new/good/fair/poor';
COMMENT ON COLUMN items.location IS '交易/自提地点';
COMMENT ON COLUMN items.original_price IS '原价，用于显示折扣比例';

-- =====================================================
-- Teams Table (组队协作)
-- =====================================================
CREATE TABLE IF NOT EXISTS teams (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  type team_type NOT NULL DEFAULT 'competition',
  description TEXT NOT NULL,
  target_count INT NOT NULL,                  -- 目标人数
  current_count INT DEFAULT 1,                -- 当前人数（包括发起人）
  deadline DATE NOT NULL,                     -- 报名截止日期
  roles_needed TEXT[] DEFAULT '{}',           -- 需要的队友角色
  wechat_contact VARCHAR(50),                 -- 发起人微信
  status team_status DEFAULT 'recruiting',
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束
  CONSTRAINT valid_target_count CHECK (target_count >= 2),
  CONSTRAINT valid_current_count CHECK (current_count >= 1 AND current_count <= target_count),
  CONSTRAINT valid_deadline CHECK (deadline > CURRENT_DATE)
);

-- Teams indexes
CREATE INDEX IF NOT EXISTS idx_teams_user_id ON teams(user_id);
CREATE INDEX IF NOT EXISTS idx_teams_type ON teams(type);
CREATE INDEX IF NOT EXISTS idx_teams_status ON teams(status);
CREATE INDEX IF NOT EXISTS idx_teams_deadline ON teams(deadline);
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON teams(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teams_recruiting ON teams(id) WHERE status = 'recruiting';

-- Teams comments
COMMENT ON TABLE teams IS '组队协作表';
COMMENT ON COLUMN teams.type IS '组队类型：competition/activity/project';
COMMENT ON COLUMN teams.target_count IS '目标总人数';
COMMENT ON COLUMN teams.current_count IS '当前已有人数';
COMMENT ON COLUMN teams.roles_needed IS '需要的队友角色描述数组';
COMMENT ON COLUMN teams.deadline IS '报名截止日期，过期自动变为 ended';
