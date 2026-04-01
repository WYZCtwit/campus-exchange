-- =====================================================
-- Migration: Team Application Improvements
-- File: 20260401000001_team_application_improvements.sql
-- Description:
--   1. Add related_team_id to notifications table
--   2. Update create_notification to accept p_team_id
--   3. Update notify_new_application to pass team_id
--   4. Add trigger for application status change notifications
-- =====================================================

-- =====================================================
-- 1. Add related_team_id column to notifications
-- =====================================================
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS related_team_id BIGINT DEFAULT NULL;

COMMENT ON COLUMN notifications.related_team_id IS '关联的组队ID，用于组队申请通知';

-- =====================================================
-- 2. Update create_notification to accept p_team_id
--    Drop old signatures first (8-param and 9-param),
--    then create the definitive version.
-- =====================================================
DROP FUNCTION IF EXISTS create_notification(UUID, notification_type, VARCHAR, TEXT, listing_type, BIGINT, BIGINT, BIGINT);
DROP FUNCTION IF EXISTS create_notification(UUID, notification_type, VARCHAR, TEXT, listing_type, BIGINT, BIGINT, BIGINT, BIGINT);

CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_type notification_type,
  p_title VARCHAR(100),
  p_content TEXT DEFAULT NULL,
  p_listing_type listing_type DEFAULT NULL,
  p_listing_id BIGINT DEFAULT NULL,
  p_order_id BIGINT DEFAULT NULL,
  p_application_id BIGINT DEFAULT NULL,
  p_team_id BIGINT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, content, related_listing_type, related_listing_id, related_order_id, related_application_id, related_team_id)
  VALUES (p_user_id, p_type, p_title, p_content, p_listing_type, p_listing_id, p_order_id, p_application_id, p_team_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION create_notification(UUID, notification_type, VARCHAR, TEXT, listing_type, BIGINT, BIGINT, BIGINT, BIGINT) IS '创建系统通知的辅助函数（SECURITY DEFINER，绕过RLS）';

-- =====================================================
-- 3. Update notify_new_application to pass team_id
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_application()
RETURNS TRIGGER AS $$
DECLARE
  v_team_title VARCHAR(100);
  v_applicant_nickname VARCHAR(100);
  v_team_owner_id UUID;
BEGIN
  SELECT t.title, t.user_id INTO v_team_title, v_team_owner_id
  FROM teams t WHERE t.id = NEW.team_id;

  SELECT p.nickname INTO v_applicant_nickname
  FROM profiles p WHERE p.id = NEW.user_id;

  PERFORM create_notification(
    v_team_owner_id,
    'new_application',
    '新组队申请：' || COALESCE(v_team_title, '未知组队'),
    COALESCE(v_applicant_nickname, '有人') || ' 申请加入您的团队',
    NULL,
    NULL,
    NULL,
    NEW.id,
    NEW.team_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. Trigger: Notify applicant on status change
-- =====================================================
CREATE OR REPLACE FUNCTION notify_application_status_change()
RETURNS TRIGGER AS $$
DECLARE
  v_team_title VARCHAR(100);
  v_notifier_type notification_type;
  v_content TEXT;
BEGIN
  -- Only act when status changes from 'pending' to 'approved' or 'rejected'
  IF OLD.status = 'pending' AND NEW.status != OLD.status THEN
    SELECT t.title INTO v_team_title
    FROM teams t WHERE t.id = NEW.team_id;

    IF NEW.status = 'approved' THEN
      v_notifier_type := 'application_approved';
      v_content := '您加入「' || COALESCE(v_team_title, '未知组队') || '」的申请已通过';
    ELSIF NEW.status = 'rejected' THEN
      v_notifier_type := 'application_rejected';
      v_content := '您加入「' || COALESCE(v_team_title, '未知组队') || '」的申请未被通过';
    ELSE
      RETURN NEW;
    END IF;

    PERFORM create_notification(
      NEW.user_id,
      v_notifier_type,
      CASE NEW.status WHEN 'approved' THEN '申请已通过' ELSE '申请未通过' END,
      v_content,
      NULL,
      NULL,
      NULL,
      NEW.id,
      NEW.team_id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notify_application_status_change IS '申请状态变更时通知申请人';

DROP TRIGGER IF EXISTS notify_application_status ON applications;
CREATE TRIGGER notify_application_status
  AFTER UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION notify_application_status_change();

-- =====================================================
-- 5. Add applications table to realtime publication
--    (Lesson #1: always add new tables to publication)
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE applications;
