-- =====================================================
-- Migration: Orders, Applications, Reviews
-- File: 20260326000003_orders.sql
-- Description: Transaction system tables
-- =====================================================

-- =====================================================
-- Orders Table (统一订单)
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  listing_type listing_type NOT NULL,
  listing_id BIGINT NOT NULL,                 -- skill_id 或 item_id
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  price DECIMAL(10,2),                        -- 记录下单时的价格
  note TEXT,                                  -- 买家备注
  status order_status DEFAULT 'pending',
  buyer_wechat VARCHAR(50) NOT NULL,          -- 买家微信（下单时填入）
  seller_wechat VARCHAR(50),                  -- 卖家微信（确认后填充）
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 同一买家不能重复下单同一商品（除非已取消）
  CONSTRAINT unique_active_order EXCLUDE (
    listing_type WITH =,
    listing_id WITH =,
    buyer_id WITH =
  ) WHERE (status != 'cancelled'),

  -- 价格约束
  CONSTRAINT valid_order_price CHECK (price IS NULL OR price >= 0)
);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_listing ON orders(listing_type, listing_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_active ON orders(buyer_id) WHERE status IN ('pending', 'contacted');
CREATE INDEX IF NOT EXISTS idx_orders_seller_active ON orders(seller_id) WHERE status IN ('pending', 'contacted');

-- Orders comments
COMMENT ON TABLE orders IS '统一订单表，支持技能和物品交易';
COMMENT ON COLUMN orders.listing_type IS '发布类型：skill 或 item';
COMMENT ON COLUMN orders.listing_id IS '关联的 skill.id 或 item.id';
COMMENT ON COLUMN orders.status IS '订单状态：pending→contacted→completed/cancelled';
COMMENT ON COLUMN orders.buyer_wechat IS '买家微信，创建订单时填入';
COMMENT ON COLUMN orders.seller_wechat IS '卖家微信，卖家确认联系后填入';

-- =====================================================
-- Applications Table (组队申请)
-- =====================================================
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,                       -- 申请理由
  wechat_contact VARCHAR(50) NOT NULL,        -- 联系方式
  status application_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 每个用户对每个组队只能申请一次
  UNIQUE(team_id, user_id)
);

-- Applications indexes
CREATE INDEX IF NOT EXISTS idx_applications_team_id ON applications(team_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_pending ON applications(team_id) WHERE status = 'pending';

-- Applications comments
COMMENT ON TABLE applications IS '组队申请表';
COMMENT ON COLUMN applications.reason IS '申请理由，为什么想加入这个团队';
COMMENT ON COLUMN applications.wechat_contact IS '申请人微信，审核通过后对发起人可见';
COMMENT ON COLUMN applications.status IS '申请状态：pending→approved/rejected';

-- =====================================================
-- Reviews Table (评价)
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 每个订单每个用户只能评价一次
  UNIQUE(order_id, reviewer_id),

  -- 不能自己评价自己
  CONSTRAINT no_self_review CHECK (reviewer_id != reviewee_id),

  -- 只能评价已完成的订单
  CONSTRAINT review_only_completed CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND orders.status = 'completed'
    )
  )
);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON reviews(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Reviews comments
COMMENT ON TABLE reviews IS '订单评价表';
COMMENT ON COLUMN reviews.rating IS '评分，1-5星';
COMMENT ON COLUMN reviews.comment IS '评价内容，可空';
COMMENT ON COLUMN reviews.reviewer_id IS '评价者';
COMMENT ON COLUMN reviews.reviewee_id IS '被评价者';
