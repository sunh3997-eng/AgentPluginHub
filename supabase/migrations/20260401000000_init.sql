-- Users
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text not null,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'developer', 'admin')),
  created_at timestamptz not null default now()
);

-- Prompt Templates
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  agent_type text not null check (agent_type in ('cursor', 'claude-code', 'codex', 'copilot', 'all')),
  category text not null,
  tags text[] default '{}',
  downloads integer not null default 0,
  stars integer not null default 0,
  author_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Plugins
create table if not exists public.plugins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  agent_compatibility text[] not null default '{}',
  version text not null default '0.1.0',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  author_id uuid references public.users(id) on delete set null,
  downloads integer not null default 0,
  stars integer not null default 0,
  price numeric(10, 2) not null default 0,
  category text not null,
  tags text[] default '{}',
  config_url text,
  created_at timestamptz not null default now()
);

-- Workflow Hooks
create table if not exists public.hooks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('pre-commit', 'post-deploy', 'pre-push', 'post-merge')),
  description text not null,
  webhook_url text not null,
  enabled boolean not null default true,
  template_id uuid references public.templates(id) on delete set null,
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Hook Templates
create table if not exists public.hook_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('pre-commit', 'post-deploy', 'pre-push', 'post-merge')),
  description text not null,
  script text not null
);

-- Indexes
create index idx_templates_agent on public.templates(agent_type);
create index idx_templates_category on public.templates(category);
create index idx_plugins_status on public.plugins(status);
create index idx_plugins_category on public.plugins(category);
create index idx_hooks_user on public.hooks(user_id);
