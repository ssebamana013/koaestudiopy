/*
  # Add Indexes for Foreign Key Columns

  ## Overview
  Foreign key columns should have indexes to optimize JOIN operations and 
  foreign key constraint checks. Without indexes, queries that join tables
  or check referential integrity can be slow.

  ## Changes Made

  ### 1. New Indexes Created
  Added indexes for all foreign key columns:
  
  - `idx_download_logs_order_id` - Download logs by order (JOIN optimization)
  - `idx_download_logs_photo_id` - Download logs by photo (JOIN optimization)
  - `idx_email_logs_order_id` - Email logs by order (JOIN optimization)
  - `idx_events_created_by` - Events by creator (JOIN optimization)
  - `idx_orders_event_id` - Orders by event (JOIN optimization)
  - `idx_payment_transactions_order_id` - Payment transactions by order (JOIN optimization)
  - `idx_photos_event_id` - Photos by event (JOIN optimization)

  ## Performance Impact

  ### Query Types Improved
  - Foreign key constraint validation (INSERT/UPDATE/DELETE)
  - JOIN operations between tables
  - Queries filtering by foreign key values
  - Cascading deletes/updates

  ### Before (No Indexes)
  - Foreign key checks require full table scans
  - JOINs use sequential scans on child tables
  - Slow performance as data grows

  ### After (With Indexes)
  - Foreign key checks use index lookups (O(log n))
  - JOINs use index scans (much faster)
  - Query performance scales well with data growth

  ## Important Notes
  - These indexes are CRITICAL for query performance
  - They optimize both application queries and database constraints
  - Index maintenance overhead is minimal compared to performance gains
  - All indexes use default B-tree structure (optimal for equality and range queries)
*/

-- Add index for download_logs.order_id foreign key
CREATE INDEX IF NOT EXISTS idx_download_logs_order_id 
ON download_logs(order_id);

-- Add index for download_logs.photo_id foreign key
CREATE INDEX IF NOT EXISTS idx_download_logs_photo_id 
ON download_logs(photo_id);

-- Add index for email_logs.order_id foreign key
CREATE INDEX IF NOT EXISTS idx_email_logs_order_id 
ON email_logs(order_id);

-- Add index for events.created_by foreign key
CREATE INDEX IF NOT EXISTS idx_events_created_by 
ON events(created_by);

-- Add index for orders.event_id foreign key
CREATE INDEX IF NOT EXISTS idx_orders_event_id 
ON orders(event_id);

-- Add index for payment_transactions.order_id foreign key
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id 
ON payment_transactions(order_id);

-- Add index for photos.event_id foreign key
CREATE INDEX IF NOT EXISTS idx_photos_event_id 
ON photos(event_id);
