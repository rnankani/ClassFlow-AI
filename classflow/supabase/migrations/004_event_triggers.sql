-- Event-driven triggers: fire edge functions when assignments change
-- Also: auto-sync classroom every 10 minutes

-- pg_cron and pg_net already enabled

-- Trigger function: fires on assignment INSERT or UPDATE
-- Calls AI enrichment, calendar sync, and email notification
CREATE OR REPLACE FUNCTION public.on_assignment_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  base_url text := 'https://wmnhvntpjoivwlefojyt.supabase.co/functions/v1';
  service_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtbmh2bnRwam9pdndsZWZvanl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE0MTIxMSwiZXhwIjoyMDg5NzE3MjExfQ.rbgwG02-Kn_wxNLjJTwECc-ClBFVZUpvOSTz_y276aQ';
  headers jsonb := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || service_key
  );
  payload jsonb := jsonb_build_object(
    'record', jsonb_build_object('id', NEW.id, 'user_id', NEW.user_id, 'title', NEW.title)
  );
BEGIN
  -- AI Enrichment: only if not yet enriched and has a description
  IF NEW.is_enriched = false AND NEW.description IS NOT NULL AND length(NEW.description) > 30 THEN
    PERFORM net.http_post(
      url := base_url || '/ai-enrichment',
      headers := headers,
      body := payload
    );
  END IF;

  -- Calendar Sync: on new assignment or when due_date/title changes
  IF TG_OP = 'INSERT'
     OR (TG_OP = 'UPDATE' AND (OLD.due_date IS DISTINCT FROM NEW.due_date OR OLD.title IS DISTINCT FROM NEW.title))
  THEN
    PERFORM net.http_post(
      url := base_url || '/calendar-sync',
      headers := headers,
      body := payload
    );
  END IF;

  -- Email Notification: only on new assignments
  IF TG_OP = 'INSERT' THEN
    PERFORM net.http_post(
      url := base_url || '/daily-email-reminders',
      headers := headers,
      body := payload
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Attach trigger to assignments table
DROP TRIGGER IF EXISTS on_assignment_change ON public.assignments;
CREATE TRIGGER on_assignment_change
  AFTER INSERT OR UPDATE ON public.assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.on_assignment_change();

-- Auto-sync classroom every 10 minutes for all users
SELECT cron.schedule(
  'auto-sync-classroom',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://wmnhvntpjoivwlefojyt.supabase.co/functions/v1/batch-sync-classroom',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtbmh2bnRwam9pdndsZWZvanl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE0MTIxMSwiZXhwIjoyMDg5NzE3MjExfQ.rbgwG02-Kn_wxNLjJTwECc-ClBFVZUpvOSTz_y276aQ"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Clean up any old cron jobs
DO $$
BEGIN
  PERFORM cron.unschedule('ai-enrichment-every-30min');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('daily-email-reminders');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('calendar-sync-hourly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('batch-sync-nightly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
