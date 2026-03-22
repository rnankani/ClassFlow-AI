-- Automation workflow schema changes

-- Add AI enrichment columns to assignments
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS is_enriched boolean DEFAULT false;
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS ai_enrichment jsonb;
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS enrichment_error text;

-- Add calendar sync columns to assignments
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS calendar_event_id text;
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS calendar_synced_at timestamptz;

-- Add user preferences for automations
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS email_reminders_enabled boolean DEFAULT false;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS calendar_sync_enabled boolean DEFAULT false;

-- Automation logs (service_role only, no RLS policies)
CREATE TABLE IF NOT EXISTS public.automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name text NOT NULL,
  status text NOT NULL,
  details jsonb,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Email logs (service_role only)
CREATE TABLE IF NOT EXISTS public.email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type text NOT NULL,
  status text NOT NULL,
  error_message text,
  sent_at timestamptz DEFAULT now()
);
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
