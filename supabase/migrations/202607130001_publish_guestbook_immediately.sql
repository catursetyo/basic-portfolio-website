alter table public.guestbook_entries
  alter column approved set default true;

update public.guestbook_entries
set approved = true
where not approved;

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

  if p_action <> 'delete' then
    raise exception 'Unsupported owner action.' using errcode = '22023';
  end if;

  delete from public.guestbook_entries entry
  where entry.id = p_entry_id;
end;
$$;
