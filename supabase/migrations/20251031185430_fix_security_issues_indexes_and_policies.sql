/*
  # Fix Security Issues: Remove Unused Indexes and Duplicate Policies

  ## Changes Made

  ### 1. Dropped Unused Indexes
  Removed 14 unused indexes that provide no performance benefit and consume storage:
  - `idx_orders_event_status` - Orders by event and status
  - `idx_event_analytics_date_event` - Event analytics by date and event
  - `idx_orders_completed_at` - Orders by completion timestamp
  - `idx_photos_event_id` - Photos by event
  - `idx_orders_event_id` - Orders by event
  - `idx_orders_client_email` - Orders by client email
  - `idx_download_logs_order_id` - Download logs by order
  - `idx_orders_payment_status` - Orders by payment status
  - `idx_event_analytics_event_id` - Event analytics by event
  - `idx_event_analytics_date` - Event analytics by date
  - `idx_email_logs_order_id` - Email logs by order
  - `idx_download_logs_photo_id` - Download logs by photo
  - `idx_events_created_by` - Events by creator
  - `idx_payment_transactions_order_id` - Payment transactions by order

  ### 2. Fixed Duplicate RLS Policies
  Removed duplicate permissive INSERT policies on `download_logs` table:
  - Dropped "Public can create download logs" (anon role)
  - Kept "Public can log downloads" (public role, which includes anon)

  ### 3. Security Improvements
  - Reduced attack surface by removing unused indexes
  - Eliminated policy conflicts on download_logs table
  - Improved database maintenance and clarity

  ## Important Notes
  - Unused indexes waste storage and slow down INSERT/UPDATE operations
  - Multiple permissive policies for the same action can cause confusion
  - The remaining policies provide the same access with better organization
  - Leaked password protection must be enabled manually in Supabase Dashboard
*/

-- Drop unused indexes to improve performance and reduce storage
DROP INDEX IF EXISTS idx_orders_event_status;
DROP INDEX IF EXISTS idx_event_analytics_date_event;
DROP INDEX IF EXISTS idx_orders_completed_at;
DROP INDEX IF EXISTS idx_photos_event_id;
DROP INDEX IF EXISTS idx_orders_event_id;
DROP INDEX IF EXISTS idx_orders_client_email;
DROP INDEX IF EXISTS idx_download_logs_order_id;
DROP INDEX IF EXISTS idx_orders_payment_status;
DROP INDEX IF EXISTS idx_event_analytics_event_id;
DROP INDEX IF EXISTS idx_event_analytics_date;
DROP INDEX IF EXISTS idx_email_logs_order_id;
DROP INDEX IF EXISTS idx_download_logs_photo_id;
DROP INDEX IF EXISTS idx_events_created_by;
DROP INDEX IF EXISTS idx_payment_transactions_order_id;

-- Fix duplicate permissive policies on download_logs table
-- Drop the duplicate INSERT policy for anon role
DROP POLICY IF EXISTS "Public can create download logs" ON download_logs;

-- The remaining policy "Public can log downloads" covers both anon and authenticated users
-- since it applies to the 'public' role which includes all users
