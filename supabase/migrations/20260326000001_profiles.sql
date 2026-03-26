-- =====================================================
-- Migration: Profiles Table
-- File: 20260326000001_profiles.sql
-- Description: User profiles table linked to Supabase Auth
-- =====================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id VARCHAR(20) UNIQUE,              -- 学号（可选，需认证后填充）
  nickname VARCHAR(50) NOT NULL,              -- 昵称
  avatar_url TEXT,                            -- 头像URL
  department VARCHAR(50),                     -- 院系
  grade VARCHAR(20),                          -- 年级
  wechat_id VARCHAR(50),                      -- 微信号
  bio TEXT,                                   -- 个人简介
  avg_rating DECIMAL(2,1) DEFAULT NULL,       -- 平均评分 (1.0-5.0)
  review_count INT DEFAULT 0,                 -- 收到的评价数量
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束：评分范围
  CONSTRAINT valid_rating CHECK (
    avg_rating IS NULL OR (avg_rating >= 1.0 AND avg_rating <= 5.0)
  )
);

-- =====================================================
-- Indexes
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_student_id ON profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON profiles(grade);
CREATE INDEX IF NOT EXISTS idx_profiles_avg_rating ON profiles(avg_rating DESC) WHERE avg_rating IS NOT NULL;

-- =====================================================
-- Comments
-- =====================================================
COMMENT ON TABLE profiles IS '用户资料表，与 auth.users 1:1 关联';
COMMENT ON COLUMN profiles.id IS '关联 auth.users 的 UUID';
COMMENT ON COLUMN profiles.student_id IS '学号，唯一，可空（需认证）';
COMMENT ON COLUMN profiles.nickname IS '用户显示名称';
COMMENT ON COLUMN profiles.avg_rating IS '平均评分，至少3条评价后才有值';
COMMENT ON COLUMN profiles.review_count IS '收到的评价总数';

-- =====================================================
-- Function: Auto-create profile on user signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
