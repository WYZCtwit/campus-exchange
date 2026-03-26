-- =====================================================
-- Migration: Messaging System
-- File: 20260326000004_messaging.sql
-- Description: Conversations, Messages, Notifications tables
-- =====================================================

-- =====================================================
-- Conversations Table (会话)
-- =====================================================
CREATE TABLE IF NOT EXISTS conversations (
  id BIGSERIAL PRIMARY KEY,
  participant1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_type listing_type,                  -- 关联的发布类型（可选）
  listing_id BIGINT,                          -- 关联的发布ID（可选）
  last_message TEXT,                          -- 最后一条消息内容
  last_message_at TIMESTAMPTZ,                -- 最后消息时间
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 确保参与者ID有序排列，避免 (A,B) 和 (B,A) 重复
  CONSTRAINT ordered_participants CHECK (participant1_id < participant2_id),

  -- 唯一约束：同一对用户关于同一发布的会话只有一个
  UNIQUE(participant1_id, participant2_id, listing_type, listing_id)
);

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON conversations(participant1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON conversations(participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_msg ON conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_listing ON conversations(listing_type, listing_id) WHERE listing_type IS NOT NULL;

-- Conversations comments
COMMENT ON TABLE conversations IS '会话表，两个用户之间的聊天';
COMMENT ON COLUMN conversations.participant1_id IS '参与者1（UUID较小的一方）';
COMMENT ON COLUMN conversations.participant2_id IS '参与者2（UUID较大的一方）';
COMMENT ON COLUMN conversations.listing_type IS '关联的发布类型，用于上下文';
COMMENT ON COLUMN conversations.listing_id IS '关联的发布ID';

-- =====================================================
-- Messages Table (消息)
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(conversation_id, created_at) WHERE is_read = FALSE;

-- Messages comments
COMMENT ON TABLE messages IS '消息表';
COMMENT ON COLUMN messages.message_type IS '消息类型：text/image/system';
COMMENT ON COLUMN messages.is_read IS '是否已读';

-- Enable Realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- =====================================================
-- Notifications Table (通知)
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  related_listing_type listing_type,
  related_listing_id BIGINT,
  related_order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
  related_application_id BIGINT REFERENCES applications(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, created_at) WHERE is_read = FALSE;

-- Notifications comments
COMMENT ON TABLE notifications IS '系统通知表';
COMMENT ON COLUMN notifications.type IS '通知类型，对应不同业务场景';
COMMENT ON COLUMN notifications.related_listing_type IS '关联的发布类型';
COMMENT ON COLUMN notifications.related_listing_id IS '关联的发布ID';
COMMENT ON COLUMN notifications.related_order_id IS '关联的订单ID';
COMMENT ON COLUMN notifications.related_application_id IS '关联的申请ID';

-- Enable Realtime for notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- =====================================================
-- Function: Create or get conversation
-- =====================================================
CREATE OR REPLACE FUNCTION get_or_create_conversation(
  p_user1 UUID,
  p_user2 UUID,
  p_listing_type listing_type DEFAULT NULL,
  p_listing_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
  v_conversation_id BIGINT;
  v_p1 UUID;
  v_p2 UUID;
BEGIN
  -- Ensure consistent ordering
  IF p_user1 < p_user2 THEN
    v_p1 := p_user1;
    v_p2 := p_user2;
  ELSE
    v_p1 := p_user2;
    v_p2 := p_user1;
  END IF;

  -- Try to get existing conversation
  SELECT id INTO v_conversation_id
  FROM conversations
  WHERE participant1_id = v_p1
    AND participant2_id = v_p2
    AND (listing_type = p_listing_type OR (listing_type IS NULL AND p_listing_type IS NULL))
    AND (listing_id = p_listing_id OR (listing_id IS NULL AND p_listing_id IS NULL));

  -- Create if not exists
  IF v_conversation_id IS NULL THEN
    INSERT INTO conversations (participant1_id, participant2_id, listing_type, listing_id)
    VALUES (v_p1, v_p2, p_listing_type, p_listing_id)
    RETURNING id INTO v_conversation_id;
  END IF;

  RETURN v_conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_or_create_conversation IS '获取或创建两个用户之间的会话';
