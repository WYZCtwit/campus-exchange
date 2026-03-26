-- =====================================================
-- Migration: Triggers and Functions
-- File: 20260326000005_triggers.sql
-- Description: Database triggers for auto-updates and business logic
-- =====================================================

-- =====================================================
-- Function: Auto-update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column IS '自动更新 updated_at 字段';

-- =====================================================
-- Apply updated_at trigger to all tables
-- =====================================================
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Function: Update user rating after review
-- =====================================================
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    avg_rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_user_rating IS '收到评价后自动更新用户平均分';

-- Trigger: Update rating after insert or update
CREATE TRIGGER update_rating_after_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_user_rating();

-- =====================================================
-- Function: Update conversation last message
-- =====================================================
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET
    last_message = NEW.content,
    last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_conversation_last_message IS '发送消息后更新会话最后消息';

-- Trigger: Update conversation after new message
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- =====================================================
-- Function: Update team current count on application approval
-- =====================================================
CREATE OR REPLACE FUNCTION update_team_count_on_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    UPDATE teams
    SET current_count = current_count + 1
    WHERE id = NEW.team_id;

    -- Check if team is full
    UPDATE teams
    SET status = 'full'
    WHERE id = NEW.team_id
      AND current_count >= target_count;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_team_count_on_approval IS '申请通过后更新组队当前人数';

-- Trigger: Update team count on application approval
CREATE TRIGGER update_team_on_application
  AFTER UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_team_count_on_approval();

-- =====================================================
-- Function: Auto-expire teams past deadline
-- =====================================================
CREATE OR REPLACE FUNCTION expire_past_deadline_teams()
RETURNS void AS $$
BEGIN
  UPDATE teams
  SET status = 'ended'
  WHERE deadline < CURRENT_DATE
    AND status IN ('recruiting', 'full');
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION expire_past_deadline_teams IS '将过期的组队标记为已结束';

-- =====================================================
-- Function: Create notification
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
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION create_notification IS '创建系统通知的辅助函数';

-- =====================================================
-- Trigger: Notify seller on new order
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_order()
RETURNS TRIGGER AS $$
DECLARE
  v_title VARCHAR(100);
  v_listing_title VARCHAR(100);
BEGIN
  -- Get listing title
  IF NEW.listing_type = 'skill' THEN
    SELECT title INTO v_listing_title FROM skills WHERE id = NEW.listing_id;
  ELSE
    SELECT title INTO v_listing_title FROM items WHERE id = NEW.listing_id;
  END IF;

  v_title := '新订单：' || COALESCE(v_listing_title, '未知商品');

  -- Notify seller
  PERFORM create_notification(
    NEW.seller_id,
    'new_order',
    v_title,
    '有买家对您的商品感兴趣，请及时联系',
    NEW.listing_type,
    NEW.listing_id,
    NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_on_new_order
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION notify_new_order();

-- =====================================================
-- Trigger: Notify on order status change
-- =====================================================
CREATE OR REPLACE FUNCTION notify_order_status_change()
RETURNS TRIGGER AS $$
DECLARE
  v_title VARCHAR(100);
  v_notify_user UUID;
BEGIN
  IF NEW.status != OLD.status THEN
    CASE NEW.status
      WHEN 'contacted' THEN
        -- Notify buyer that seller has contacted
        v_title := '订单已联系';
        v_notify_user := NEW.buyer_id;
        PERFORM create_notification(
          v_notify_user, 'order_contacted', v_title,
          '卖家已确认联系您，请查看微信',
          NEW.listing_type, NEW.listing_id, NEW.id
        );

      WHEN 'completed' THEN
        -- Notify both parties
        v_title := '订单已完成';
        PERFORM create_notification(
          NEW.buyer_id, 'order_completed', v_title,
          '交易完成，别忘了给对方评价哦',
          NEW.listing_type, NEW.listing_id, NEW.id
        );
        PERFORM create_notification(
          NEW.seller_id, 'order_completed', v_title,
          '交易完成，别忘了给对方评价哦',
          NEW.listing_type, NEW.listing_id, NEW.id
        );

      WHEN 'cancelled' THEN
        -- Notify the other party
        v_title := '订单已取消';
        IF auth.uid() = NEW.buyer_id THEN
          v_notify_user := NEW.seller_id;
        ELSE
          v_notify_user := NEW.buyer_id;
        END IF;
        PERFORM create_notification(
          v_notify_user, 'order_cancelled', v_title,
          '对方已取消订单',
          NEW.listing_type, NEW.listing_id, NEW.id
        );
    END CASE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_on_order_status
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION notify_order_status_change();
