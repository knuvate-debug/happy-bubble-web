-- Happy Bubble Web MVP · Supabase Schema

create table if not exists learning_events (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text not null,
  session_id text not null,
  event_name text not null,
  activity_type text,
  round_id text,
  value text,
  is_correct boolean,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists learning_events_anonymous_session_idx
on learning_events (anonymous_id, session_id, created_at);

create table if not exists session_progress (
  anonymous_id text not null,
  session_id text not null,
  theater_viewed boolean not null default false,
  singing_played boolean not null default false,
  mission_opened boolean not null default false,
  game_completed boolean not null default false,
  total_correct integer not null default 0,
  total_mistakes integer not null default 0,
  total_play_time_ms integer not null default 0,
  last_played_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (anonymous_id, session_id)
);

create index if not exists session_progress_anonymous_idx
on session_progress (anonymous_id);

alter table learning_events enable row level security;
alter table session_progress enable row level security;

-- MVP policy:
-- Client writes go through Next.js API routes using the service role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to the browser.
