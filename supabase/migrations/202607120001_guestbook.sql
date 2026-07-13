create extension if not exists pgcrypto with schema extensions;

create table public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.guestbook_entries(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  body text not null,
  author_role text not null default 'visitor' check (author_role in ('visitor', 'owner')),
  approved boolean not null default false,
  owner_liked boolean not null default false,
  created_at timestamptz not null default now(),
  check (char_length(btrim(author_name)) between 2 and 40),
  check (char_length(btrim(body)) between 1 and 280),
  check (
    (parent_id is null and author_role = 'visitor') or
    (parent_id is not null and author_role = 'owner')
  )
);

create table public.guestbook_likes (
  entry_id uuid not null references public.guestbook_entries(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (entry_id, user_id)
);

create index guestbook_entries_parent_idx on public.guestbook_entries(parent_id);
create index guestbook_entries_author_created_idx on public.guestbook_entries(author_id, created_at desc);

alter table public.guestbook_entries enable row level security;
alter table public.guestbook_likes enable row level security;

revoke all on public.guestbook_entries from anon, authenticated;
revoke all on public.guestbook_likes from anon, authenticated;

create or replace function public.is_guestbook_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select auth.jwt() ->> 'email') = 'catursetyo26@gmail.com', false);
$$;

create or replace function public.get_guestbook_entries()
returns table (
  id uuid,
  parent_id uuid,
  author_name text,
  body text,
  author_role text,
  approved boolean,
  owner_liked boolean,
  created_at timestamptz,
  like_count integer,
  liked_by_me boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    entry.id,
    entry.parent_id,
    entry.author_name,
    entry.body,
    entry.author_role,
    entry.approved,
    entry.owner_liked,
    entry.created_at,
    (select count(*)::integer from public.guestbook_likes likes where likes.entry_id = entry.id and likes.active),
    exists (
      select 1
      from public.guestbook_likes likes
      where likes.entry_id = entry.id and likes.user_id = (select auth.uid()) and likes.active
    )
  from public.guestbook_entries entry
  where
    entry.approved or
    entry.author_id = (select auth.uid()) or
    public.is_guestbook_owner()
  order by entry.created_at desc;
$$;

create or replace function public.submit_guestbook_message(p_author_name text, p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
  viewer_id uuid := auth.uid();
begin
  if viewer_id is null then
    raise exception 'Authentication is required.' using errcode = '42501';
  end if;

  if char_length(btrim(p_author_name)) not between 2 and 40 then
    raise exception 'Name must contain 2 to 40 characters.' using errcode = '22023';
  end if;

  if char_length(btrim(p_body)) not between 1 and 280 then
    raise exception 'Message must contain 1 to 280 characters.' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('guestbook-message:' || viewer_id::text, 0));

  if exists (
    select 1
    from public.guestbook_entries entry
    where entry.author_id = viewer_id
      and entry.parent_id is null
      and entry.created_at > now() - interval '60 seconds'
  ) then
    raise exception 'Please wait before sending another message.' using errcode = 'P0001';
  end if;

  insert into public.guestbook_entries (author_id, author_name, body)
  values (viewer_id, btrim(p_author_name), btrim(p_body))
  returning id into new_id;

  return new_id;
end;
$$;

create or replace function public.reply_to_guestbook(p_parent_id uuid, p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
begin
  if not public.is_guestbook_owner() then
    raise exception 'Owner access is required.' using errcode = '42501';
  end if;

  if char_length(btrim(p_body)) not between 1 and 220 then
    raise exception 'Reply must contain 1 to 220 characters.' using errcode = '22023';
  end if;

  if not exists (
    select 1 from public.guestbook_entries entry
    where entry.id = p_parent_id and entry.parent_id is null
  ) then
    raise exception 'Parent message does not exist.' using errcode = '23503';
  end if;

  insert into public.guestbook_entries (
    parent_id,
    author_id,
    author_name,
    body,
    author_role,
    approved
  )
  values (p_parent_id, auth.uid(), 'caur', btrim(p_body), 'owner', true)
  returning id into new_id;

  return new_id;
end;
$$;

create or replace function public.toggle_guestbook_like(p_entry_id uuid)
returns table (liked boolean, like_count integer, owner_liked boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  viewer_id uuid := auth.uid();
  now_liked boolean;
  previous_liked boolean;
  previous_update timestamptz;
begin
  if viewer_id is null then
    raise exception 'Authentication is required.' using errcode = '42501';
  end if;

  if not exists (
    select 1
    from public.guestbook_entries entry
    where entry.id = p_entry_id
      and (entry.approved or public.is_guestbook_owner())
  ) then
    raise exception 'Message is not available.' using errcode = 'P0002';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('guestbook-like:' || viewer_id::text || ':' || p_entry_id::text, 0));

  select likes.active, likes.updated_at
  into previous_liked, previous_update
  from public.guestbook_likes likes
  where likes.entry_id = p_entry_id and likes.user_id = viewer_id
  for update;

  if found then
    if previous_update > now() - interval '750 milliseconds' then
      raise exception 'Please wait before updating this like.' using errcode = 'P0001';
    end if;

    now_liked := not previous_liked;
    update public.guestbook_likes likes
    set active = now_liked, updated_at = now()
    where likes.entry_id = p_entry_id and likes.user_id = viewer_id;
  else
    insert into public.guestbook_likes (entry_id, user_id)
    values (p_entry_id, viewer_id)
    returning active into now_liked;
  end if;

  if public.is_guestbook_owner() then
    update public.guestbook_entries entry
    set owner_liked = now_liked
    where entry.id = p_entry_id;
  end if;

  return query
  select
    now_liked,
    (select count(*)::integer from public.guestbook_likes likes where likes.entry_id = p_entry_id and likes.active),
    entry.owner_liked
  from public.guestbook_entries entry
  where entry.id = p_entry_id;
end;
$$;

create or replace function public.moderate_guestbook_entry(p_entry_id uuid, p_action text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_guestbook_owner() then
    raise exception 'Owner access is required.' using errcode = '42501';
  end if;

  if p_action = 'approve' then
    update public.guestbook_entries entry
    set approved = true
    where entry.id = p_entry_id;
  elsif p_action = 'delete' then
    delete from public.guestbook_entries entry
    where entry.id = p_entry_id;
  else
    raise exception 'Unsupported moderation action.' using errcode = '22023';
  end if;
end;
$$;

revoke all on function public.is_guestbook_owner() from public;
revoke all on function public.get_guestbook_entries() from public;
revoke all on function public.submit_guestbook_message(text, text) from public;
revoke all on function public.reply_to_guestbook(uuid, text) from public;
revoke all on function public.toggle_guestbook_like(uuid) from public;
revoke all on function public.moderate_guestbook_entry(uuid, text) from public;

grant execute on function public.is_guestbook_owner() to authenticated;
grant execute on function public.get_guestbook_entries() to authenticated;
grant execute on function public.submit_guestbook_message(text, text) to authenticated;
grant execute on function public.reply_to_guestbook(uuid, text) to authenticated;
grant execute on function public.toggle_guestbook_like(uuid) to authenticated;
grant execute on function public.moderate_guestbook_entry(uuid, text) to authenticated;
