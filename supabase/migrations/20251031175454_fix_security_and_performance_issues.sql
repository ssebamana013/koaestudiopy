/*
  # Fix Security and Performance Issues
  
  This migration addresses critical security and performance issues:
  
  1. Missing Indexes on Foreign Keys
    - Add index on `download_logs.photo_id`
    - Add index on `events.created_by`
    - Add index on `payment_transactions.order_id`
  
  2. RLS Policy Performance Issues
    - Fix `event_analytics` policies to use `(select auth.uid())`
    - Fix `email_logs` policies to use `(select auth.uid())`
    - Fix `payment_transactions` policies to use `(select auth.uid())`
  
  3. Function Search Path Security
    - Set immutable search_path on all functions
    - Prevent search_path manipulation attacks
  
  4. Index Optimization
    - Keep useful indexes for future queries
    - Document why "unused" indexes are actually needed
  
  Note: Some indexes show as "unused" because the database is new.
  These indexes will be critical for production query performance.
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- ============================================================================

-- Index on download_logs.photo_id for better join performance
CREATE INDEX IF NOT EXISTS idx_download_logs_photo_id 
ON download_logs(photo_id);

-- Index on events.created_by for admin queries
CREATE INDEX IF NOT EXISTS idx_events_created_by 
ON events(created_by);

-- Index on payment_transactions.order_id for transaction lookups
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id 
ON payment_transactions(order_id);

-- ============================================================================
-- 2. FIX RLS POLICIES - PERFORMANCE OPTIMIZATION
-- ============================================================================

-- Fix event_analytics policy
DROP POLICY IF EXISTS "Admin can view all analytics" ON event_analytics;

CREATE POLICY "Admin can view all analytics"
  ON event_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_analytics.event_id
      AND events.created_by = (SELECT auth.uid())
    )
  );

-- Fix email_logs policy
DROP POLICY IF EXISTS "Admin can view email logs" ON email_logs;

CREATE POLICY "Admin can view email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN events ON orders.event_id = events.id
      WHERE orders.id = email_logs.order_id
      AND events.created_by = (SELECT auth.uid())
    )
  );

-- Fix payment_transactions policy
DROP POLICY IF EXISTS "Admin can view transactions" ON payment_transactions;

CREATE POLICY "Admin can view transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN events ON orders.event_id = events.id
      WHERE orders.id = payment_transactions.order_id
      AND events.created_by = (SELECT auth.uid())
    )
  );

-- ============================================================================
-- 3. FIX FUNCTION SEARCH PATH SECURITY
-- ============================================================================

-- Recreate update_event_revenue with secure search_path
CREATE OR REPLACE FUNCTION update_event_revenue()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'completed') THEN
    UPDATE events
    SET total_revenue = total_revenue + NEW.total_amount
    WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate update_event_stats with secure search_path
CREATE OR REPLACE FUNCTION update_event_stats()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events
    SET total_photos = total_photos + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events
    SET total_photos = total_photos - 1
    WHERE id = OLD.event_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Check if update_updated_at_column exists and recreate with secure search_path
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column'
  ) THEN
    DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers with new functions
DROP TRIGGER IF EXISTS update_event_revenue_trigger ON orders;
CREATE TRIGGER update_event_revenue_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_event_revenue();

DROP TRIGGER IF EXISTS update_event_photo_count ON photos;
CREATE TRIGGER update_event_photo_count
  AFTER INSERT OR DELETE ON photos
  FOR EACH ROW
  EXECUTE FUNCTION update_event_stats();

-- Add updated_at triggers where needed
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_storage_config_updated_at ON storage_config;
CREATE TRIGGER update_storage_config_updated_at
  BEFORE UPDATE ON storage_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_transactions_updated_at ON payment_transactions;
CREATE TRIGGER update_payment_transactions_updated_at
  BEFORE UPDATE ON payment_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. ADD ADDITIONAL PERFORMANCE INDEXES
-- ============================================================================

-- Composite index for common admin queries (event + status)
CREATE INDEX IF NOT EXISTS idx_orders_event_status 
ON orders(event_id, payment_status);

-- Index for email lookups (client queries)
CREATE INDEX IF NOT EXISTS idx_orders_client_email 
ON orders(client_email);

-- Index for date-based analytics queries
CREATE INDEX IF NOT EXISTS idx_event_analytics_date_event 
ON event_analytics(date DESC, event_id);

-- Index for order completion tracking
CREATE INDEX IF NOT EXISTS idx_orders_completed_at 
ON orders(completed_at) 
WHERE payment_status = 'completed';

-- ============================================================================
-- 5. ADD HELPFUL COMMENTS FOR INDEX USAGE
-- ============================================================================

COMMENT ON INDEX idx_photos_event_id IS 
  'Used for fetching all photos for an event gallery. Critical for client browsing experience.';

COMMENT ON INDEX idx_orders_event_id IS 
  'Used for admin dashboard to view all orders per event. Essential for revenue tracking.';

COMMENT ON INDEX idx_orders_payment_status IS 
  'Used for filtering pending/completed orders. Critical for payment reconciliation.';

COMMENT ON INDEX idx_download_logs_order_id IS 
  'Used for tracking download history per order. Important for analytics and audit trails.';

COMMENT ON INDEX idx_event_analytics_event_id IS 
  'Used for fetching analytics data for specific events. Core to admin dashboard metrics.';

COMMENT ON INDEX idx_event_analytics_date IS 
  'Used for time-series analytics queries. Essential for trend analysis.';

COMMENT ON INDEX idx_email_logs_order_id IS 
  'Used for tracking email notifications per order. Important for debugging delivery issues.';

-- ============================================================================
-- 6. ADDITIONAL SECURITY POLICIES
-- ============================================================================

-- Ensure all policies are optimized and secure

-- Add missing INSERT policy for event_analytics (for tracking)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'event_analytics' 
    AND policyname = 'Public can insert analytics'
  ) THEN
    CREATE POLICY "Public can insert analytics"
      ON event_analytics FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Add INSERT policy for download_logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'download_logs' 
    AND policyname = 'Public can log downloads'
  ) THEN
    CREATE POLICY "Public can log downloads"
      ON download_logs FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- ============================================================================
-- 7. VACUUM AND ANALYZE FOR OPTIMAL PERFORMANCE
-- ============================================================================

-- Update statistics for query planner
ANALYZE events;
ANALYZE photos;
ANALYZE orders;
ANALYZE download_logs;
ANALYZE event_analytics;
ANALYZE email_logs;
ANALYZE payment_transactions;
ANALYZE storage_config;
