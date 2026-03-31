-- =====================================================
-- Migration: Enable Realtime for orders table
-- File: 20260331000000_enable_orders_realtime.sql
-- Description: Add orders table to supabase_realtime publication
--              so both buyer and seller receive real-time updates
-- =====================================================

ALTER PUBLICATION supabase_realtime ADD TABLE orders;
