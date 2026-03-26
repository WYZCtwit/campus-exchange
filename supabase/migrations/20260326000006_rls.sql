-- =====================================================
-- Migration: Row Level Security Policies
-- File: 20260326000006_rls.sql
-- Description: RLS policies for all tables
-- =====================================================

-- =====================================================
-- Profiles Table
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Everyone can view profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Profile creation is handled by trigger (auth.users insert)

-- =====================================================
-- Skills Table
-- =====================================================
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Active skills are viewable by everyone, inactive only by owner
CREATE POLICY "Active skills are viewable by everyone"
  ON skills FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

-- Authenticated users can create skills
CREATE POLICY "Authenticated users can create skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only owner can update skills
CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = user_id);

-- Only owner can delete skills
CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- Items Table
-- =====================================================
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Active items are viewable by everyone
CREATE POLICY "Active items are viewable by everyone"
  ON items FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

-- Authenticated users can create items
CREATE POLICY "Authenticated users can create items"
  ON items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only owner can update items
CREATE POLICY "Users can update own items"
  ON items FOR UPDATE
  USING (auth.uid() = user_id);

-- Only owner can delete items
CREATE POLICY "Users can delete own items"
  ON items FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- Teams Table
-- =====================================================
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Recruiting/full teams are viewable by everyone
CREATE POLICY "Recruiting teams are viewable by everyone"
  ON teams FOR SELECT
  USING (status IN ('recruiting', 'full') OR auth.uid() = user_id);

-- Authenticated users can create teams
CREATE POLICY "Authenticated users can create teams"
  ON teams FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only owner can update teams
CREATE POLICY "Users can update own teams"
  ON teams FOR UPDATE
  USING (auth.uid() = user_id);

-- Only owner can delete teams
CREATE POLICY "Users can delete own teams"
  ON teams FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- Orders Table
-- =====================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Buyers and sellers can view their orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Authenticated users can create orders as buyer
CREATE POLICY "Authenticated users can create orders as buyer"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- Buyers and sellers can update orders
CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- =====================================================
-- Applications Table
-- =====================================================
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Team owner and applicant can view application
CREATE POLICY "Team owner and applicant can view application"
  ON applications FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM teams WHERE id = applications.team_id AND user_id = auth.uid()
    )
  );

-- Authenticated users can create applications
CREATE POLICY "Authenticated users can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only team owner can update application status
CREATE POLICY "Team owner can update application status"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM teams WHERE id = applications.team_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- Reviews Table
-- =====================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Everyone can view reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Order participants can create reviews
CREATE POLICY "Order participants can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id
    AND EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = reviews.order_id
        AND orders.status = 'completed'
        AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

-- Reviews cannot be updated after submission
-- (No UPDATE policy = no updates allowed)

-- =====================================================
-- Conversations Table
-- =====================================================
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Participants can view their conversations
CREATE POLICY "Participants can view their conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant1_id OR auth.uid() = participant2_id);

-- Conversations are created through function, not direct insert
-- (No INSERT policy = no direct inserts)

-- =====================================================
-- Messages Table
-- =====================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Conversation participants can view messages
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- Conversation participants can send messages
CREATE POLICY "Conversation participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- Sender can mark their sent messages as read? No, receiver marks as read
-- Update is for marking is_read, done by receiver
CREATE POLICY "Message receiver can mark as read"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
        AND sender_id != auth.uid()
    )
  );

-- =====================================================
-- Notifications Table
-- =====================================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update (mark as read) their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Notifications are created by system triggers, not direct insert
-- (No INSERT policy)
