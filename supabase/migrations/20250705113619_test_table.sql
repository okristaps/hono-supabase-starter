create table "public"."test" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active'::text,
  count integer default 0,
  is_active boolean default true,
  metadata jsonb default '{}'::jsonb
);

-- Create an index on the name column
create index test_name_idx on public.test (name);

-- Add RLS (Row Level Security) policy
alter table "public"."test" enable row level security;

-- Create a policy that allows all operations for authenticated users
create policy "Allow full access to authenticated users"
  on public.test
  for all
  to authenticated
  using (true)
  with check (true);

---- Functions to automatically update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically update the updated_at column
create trigger handle_updated_at
  before update on public.test
  for each row
  execute procedure public.handle_updated_at();
