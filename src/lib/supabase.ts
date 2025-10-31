import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjvikgrcvtkvcnojrtjf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdmlrZ3JjdnRrdmNub2pydGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MDc0NDMsImV4cCI6MjA3NzQ4MzQ0M30.tlm5v2_IEYK0m8i1oyY3lHPHszuN0xKcPd3btry2FvU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  title: string;
  slug: string;
  access_code: string;
  description: string | null;
  event_date: string | null;
  cover_photo_url: string | null;
  is_active: boolean;
  price_per_photo: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  total_photos: number;
  total_revenue: number;
};

export type Photo = {
  id: string;
  event_id: string;
  filename: string;
  thumbnail_url: string;
  full_url: string;
  position: number;
  width: number | null;
  height: number | null;
  created_at: string;
};

export type Order = {
  id: string;
  event_id: string;
  client_email: string;
  client_name: string | null;
  photo_ids: string[];
  total_amount: number;
  payment_method: 'online' | 'offline';
  payment_status: 'pending' | 'completed' | 'failed';
  download_password: string | null;
  download_expires_at: string | null;
  created_at: string;
  completed_at: string | null;
};
