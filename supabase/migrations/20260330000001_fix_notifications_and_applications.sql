-- =====================================================
-- Migration: Fix notifications & add application triggers
-- File: 20260330000001_fix_notifications_and_applications.sql
-- Description:
--   1. Make create_notification SECURITY DEFINER (bypasses RLS for RPC calls)
--   2. Add trigger for new_application notifications
--   3. Add trigger for new_review notifications
-- =====================================================

-- =====================================================
-- 1. Recreate create_notification as SECURITY DEFINER
--    This allows client-side RPC calls to insert notifications
--    without needing an INSERT RLS policy on notifications table.
-- =====================================================
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_type notification_type,
  p_title VARCHAR(100),
  p_content TEXT DEFAULT NULL,
  p_listing_type listing_type DEFAULT NULL,
  p_listing_id BIGINT DEFAULT NULL,
  p_order_id BIGINT DEFAULT NULL,
  p_application_id BIGINT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO notifications (
    user_id, type, title, content,
    related_listing_type, related_listing_id,
    related_order_id, related_application_id
  ) VALUES (
    p_user_id, p_type, p_title, p_content,
    p_listing_type, p_listing_id,
    p_order_id, p_application_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION create_notification IS '创建系统通知的辅助函数（SECURITY DEFINER，绕过RLS）';

-- =====================================================
-- 2. Trigger: Notify team owner on new application
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_application()
RETURNS TRIGGER AS $$
DECLARE
  v_team_title VARCHAR(100);
  v_applicant_nickname VARCHAR(100);
  v_team_owner_id UUID;
BEGIN
  -- Get team info and applicant nickname
  SELECT t.title, t.user_id INTO v_team_title, v_team_owner_id
  FROM teams t
  WHERE t.id = NEW.team_id;

  SELECT p.nickname INTO v_applicant_nickname
  FROM profiles p
  WHERE p.id = NEW.user_id;

  -- Notify the team owner
  PERFORM create_notification(
    v_team_owner_id,
    'new_application',
    '新组队申请：' || COALESCE(v_team_title, '未知组队'),
    COALESCE(v_applicant_nickname, '有人') || ' 申请加入您的团队',
    NULL,
    NULL,
    NULL,
    NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notify_new_application IS '新组队申请时通知团队发起人';

CREATE TRIGGER notify_on_new_application
  AFTER INSERT ON applications
  FOR EACH ROW EXECUTE FUNCTION notify_new_application();

-- =====================================================
-- 3. Trigger: Notify reviewee on new review
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_review()
RETURNS TRIGGER AS $$
DECLARE
  v_reviewer_nickname VARCHAR(100);
BEGIN
  SELECT p.nickname INTO v_reviewer_nickname
  FROM profiles p
  WHERE p.id = NEW.reviewer_id;

  PERFORM create_notification(
    NEW.reviewee_id,
    'review_received',
    '收到新评价',
    COALESCE(v_reviewer_nickname, '有人') || ' 给您留下了 ' || NEW.rating || ' 星评价',
    NULL,
    NULL,
    NEW.order_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notify_new_review IS '收到新评价时通知被评价者';

CREATE TRIGGER notify_on_new_review
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION notify_new_review();
