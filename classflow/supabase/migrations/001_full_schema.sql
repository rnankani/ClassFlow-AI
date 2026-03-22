-- ClassFlow AI Database Schema
-- Run this in the Supabase SQL Editor

-- 1. User Profiles (auto-populated on signup)
create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Google OAuth Tokens (service_role access only)
create table public.google_tokens (
  user_id uuid primary key references auth.users(id) on delete cascade,
  access_token text not null,
  refresh_token text,
  token_expires_at timestamptz,
  scopes text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.google_tokens enable row level security;
-- No public policies — only service_role can access

-- 3. Courses (synced from Google Classroom)
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  google_course_id text not null,
  name text not null,
  section text,
  description text,
  course_state text,
  teacher_name text,
  alternate_link text,
  synced_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, google_course_id)
);

alter table public.courses enable row level security;

create policy "Users can view own courses"
  on public.courses for select
  using (auth.uid() = user_id);

-- 4. Assignments (coursework synced from Google Classroom)
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  google_coursework_id text not null,
  title text not null,
  description text,
  due_date timestamptz,
  max_points real,
  state text,
  submission_state text,
  alternate_link text,
  work_type text,
  urgency_level text generated always as (
    case
      when due_date is null then 'no_date'
      when due_date < now() then 'overdue'
      when due_date < now() + interval '1 day' then 'urgent'
      when due_date < now() + interval '3 days' then 'due_soon'
      else 'on_track'
    end
  ) stored,
  synced_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, google_coursework_id)
);

alter table public.assignments enable row level security;

create policy "Users can view own assignments"
  on public.assignments for select
  using (auth.uid() = user_id);

-- 5. AI Summaries
create table public.ai_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_id uuid references public.assignments(id) on delete cascade,
  summary_type text not null,
  content jsonb not null,
  generated_at timestamptz default now(),
  expires_at timestamptz default now() + interval '24 hours'
);

alter table public.ai_summaries enable row level security;

create policy "Users can view own summaries"
  on public.ai_summaries for select
  using (auth.uid() = user_id);
