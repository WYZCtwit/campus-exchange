-- =====================================================
-- Migration: Mark listing as sold on order completion
-- File: 20260331000001_mark_listing_sold.sql
-- Description: When an order is completed, automatically
--              set the associated skill/item status to 'sold'
--              so it no longer appears on the homepage.
-- =====================================================

CREATE OR REPLACE FUNCTION mark_listing_sold_on_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Only act when status changes TO 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    IF NEW.listing_type = 'skill' THEN
      UPDATE skills SET status = 'sold' WHERE id = NEW.listing_id;
    ELSIF NEW.listing_type = 'item' THEN
      UPDATE items SET status = 'sold' WHERE id = NEW.listing_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION mark_listing_sold_on_completion IS '订单完成后自动将关联的技能/物品标记为已售出';

CREATE TRIGGER mark_listing_sold
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION mark_listing_sold_on_completion();
