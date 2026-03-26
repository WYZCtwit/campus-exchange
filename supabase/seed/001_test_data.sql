-- =====================================================
-- Seed Data: Test Data for Development
-- File: 001_test_data.sql
-- Description: Sample data for testing the platform
-- =====================================================

-- NOTE: Run this AFTER all migrations
-- User profiles need to be created via Supabase Auth first
-- The profile will be auto-created via trigger

-- =====================================================
-- Sample Skills (需要替换 user_id 为真实 UUID)
-- =====================================================

-- 编程技能
INSERT INTO skills (user_id, title, category, description, offer_description, want_description, price, exchange_preference, status) VALUES
  ('PLACEHOLDER_USER_ID', 'Python编程辅导', 'coding',
   '5年Python开发经验，可辅导从入门到进阶',
   '爬虫开发、数据分析、Web开发指导',
   'Figma设计基础指导', 50.00, true, 'active'),

  ('PLACEHOLDER_USER_ID', '前端开发指导', 'coding',
   'React/Vue全栈开发者，可辅导前端技术栈',
   'HTML/CSS/JavaScript基础到框架应用',
   NULL, 80.00, false, 'active'),

  ('PLACEHOLDER_USER_ID', 'Java后端辅导', 'coding',
   '3年Java后端开发经验，熟悉Spring生态',
   'Spring Boot、MyBatis、数据库设计',
   '算法辅导', 60.00, true, 'active');

-- 设计技能
INSERT INTO skills (user_id, title, category, description, offer_description, want_description, price, exchange_preference, status) VALUES
  ('PLACEHOLDER_USER_ID', 'UI/UX设计指导', 'design',
   '资深UI设计师，熟悉Figma和Sketch',
   '界面设计、交互设计、设计规范建立',
   'Python编程辅导', 50.00, true, 'active'),

  ('PLACEHOLDER_USER_ID', 'Logo设计', 'design',
   '独立设计师，专注品牌视觉设计',
   'Logo设计、VI设计、品牌形象',
   NULL, 100.00, false, 'active');

-- 学业辅导
INSERT INTO skills (user_id, title, category, description, offer_description, want_description, price, exchange_preference, status) VALUES
  ('PLACEHOLDER_USER_ID', '高等数学辅导', 'academic',
   '数学系研究生，高数满分通过',
   '高数上下册、线性代数、概率论',
   NULL, 40.00, false, 'active'),

  ('PLACEHOLDER_USER_ID', '英语四六级辅导', 'academic',
   '六级600+，雅思7.0',
   '四六级备考、口语练习、写作批改',
   '编程入门指导', 35.00, true, 'active');

-- =====================================================
-- Sample Items (需要替换 user_id 为真实 UUID)
-- =====================================================

-- 教材书籍
INSERT INTO items (user_id, title, category, description, condition, price, original_price, location, status) VALUES
  ('PLACEHOLDER_USER_ID', '高等数学 同济第七版（上下册）', 'books',
   '九成新，无笔记划线，附带课后习题答案',
   'good', 45.00, 89.00, '图书馆门口', 'active'),

  ('PLACEHOLDER_USER_ID', '线性代数 第五版', 'books',
   '全新未拆封，多买了一本',
   'new', 30.00, 35.00, '宿舍楼下', 'active'),

  ('PLACEHOLDER_USER_ID', '计算机组成原理', 'books',
   '有少量笔记，重点已标注',
   'fair', 25.00, 55.00, '食堂门口', 'active');

-- 电子产品
INSERT INTO items (user_id, title, category, description, condition, price, original_price, location, status) VALUES
  ('PLACEHOLDER_USER_ID', 'iPad Air 3 64GB', 'electronics',
   '使用2年，屏幕无划痕，电池健康度85%',
   'good', 1800.00, 3500.00, '校内面交', 'active'),

  ('PLACEHOLDER_USER_ID', '机械键盘 青轴', 'electronics',
   '使用半年，手感良好，RGB灯效',
   'good', 150.00, 299.00, '宿舍区', 'active');

-- 日用品
INSERT INTO items (user_id, title, category, description, condition, price, original_price, location, status) VALUES
  ('PLACEHOLDER_USER_ID', '小米台灯', 'daily',
   '使用一年，功能正常，无损坏',
   'good', 35.00, 79.00, '宿舍楼下', 'active');

-- =====================================================
-- Sample Teams (需要替换 user_id 为真实 UUID)
-- =====================================================

INSERT INTO teams (user_id, title, type, description, target_count, current_count, deadline, roles_needed, status) VALUES
  ('PLACEHOLDER_USER_ID', 'ACM程序设计竞赛组队', 'competition',
   '参加2024年ACM区域赛，目标银牌以上',
   3, 1, '2024-11-15', ARRAY['C++高手', '算法策略师'], 'recruiting'),

  ('PLACEHOLDER_USER_ID', '数学建模美赛', 'competition',
   '参加MCM/ICM，目标M奖或以上',
   3, 1, '2024-12-01', ARRAY['数学建模', '论文写作'], 'recruiting'),

  ('PLACEHOLDER_USER_ID', '创新创业大赛', 'competition',
   '参加互联网+创新创业大赛',
   5, 2, '2024-10-30', ARRAY['产品经理', 'UI设计', '后端开发'], 'recruiting'),

  ('PLACEHOLDER_USER_ID', '毕业旅行组队', 'activity',
   '毕业前一起去云南旅行，预算3000/人',
   4, 1, '2024-06-15', ARRAY['摄影达人', '攻略能手'], 'recruiting'),

  ('PLACEHOLDER_USER_ID', '校园二手交易平台', 'project',
   '开发一个校园二手交易平台，技术栈React+Node.js',
   4, 1, '2024-09-01', ARRAY['前端开发', '后端开发', 'UI设计'], 'recruiting');

-- =====================================================
-- Helper: View to check data
-- =====================================================
CREATE OR REPLACE VIEW v_listings_summary AS
SELECT
  'skill' as type,
  s.id,
  s.title,
  s.category::text as category,
  s.price,
  s.status::text as status,
  p.nickname as author,
  s.created_at
FROM skills s
JOIN profiles p ON s.user_id = p.id
UNION ALL
SELECT
  'item' as type,
  i.id,
  i.title,
  i.category::text as category,
  i.price,
  i.status::text as status,
  p.nickname as author,
  i.created_at
FROM items i
JOIN profiles p ON i.user_id = p.id
ORDER BY created_at DESC;

COMMENT ON VIEW v_listings_summary IS '发布内容汇总视图';
