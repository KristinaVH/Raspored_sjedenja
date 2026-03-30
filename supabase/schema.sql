-- ==========================================================
-- 1) TABLES (Stolovi)
-- ==========================================================

create table if not exists public.tables (
    id bigint generated always as identity primary key,
    name text not null,
    created_at timestamp with time zone default now()
);

-- ==========================================================
-- 2) GUESTS (Gosti)
-- ==========================================================

create table if not exists public.guests (
    id bigint generated always as identity primary key,
    first_name text not null,
    last_name text not null,
    created_at timestamp with time zone default now()
);

-- ==========================================================
-- 3) SEATING (Raspored sjedenja)
-- ==========================================================

create table if not exists public.seating (
    id bigint generated always as identity primary key,
    table_id bigint references public.tables(id) on delete cascade,
    guest_id bigint references public.guests(id) on delete cascade,
    seat_number integer,
    created_at timestamp with time zone default now()
);

-- ==========================================================
-- 4) UNDO STACK (za vraćanje zadnjeg poteza)
-- ==========================================================

create table if not exists public.undo_stack (
    id bigint generated always as identity primary key,
    guest_id bigint references public.guests(id) on delete cascade,
    previous_table_id bigint,
    previous_seat integer,
    created_at timestamp with time zone default now()
);

-- ==========================================================
-- 5) WEDDING INFO (Podaci o vjenčanju)
-- ==========================================================

create table if not exists public.wedding_info (
    id bigint generated always as identity primary key,
    couple_names text,
    wedding_date text,
    theme_color text,
    logo_url text,
    updated_at timestamp with time zone default now()
);

-- ==========================================================
-- ENABLE RLS
-- ==========================================================

alter table public.tables enable row level security;
alter table public.guests enable row level security;
alter table public.seating enable row level security;
alter table public.undo_stack enable row level security;
alter table public.wedding_info enable row level security;

-- ==========================================================
-- RLS POLICY: authenticated users can SELECT
-- ==========================================================

create policy "Allow authenticated read on tables"
on public.tables for select
to authenticated using (true);

create policy "Allow authenticated read on guests"
on public.guests for select
to authenticated using (true);

create policy "Allow authenticated read on seating"
on public.seating for select
to authenticated using (true);

create policy "Allow authenticated read on undo_stack"
on public.undo_stack for select
to authenticated using (true);

create policy "Allow authenticated read on wedding_info"
on public.wedding_info for select
to authenticated using (true);

-- ==========================================================
-- RLS POLICY: authenticated users can INSERT/UPDATE/DELETE
-- ==========================================================

create policy "Allow authenticated write on tables"
on public.tables for all
to authenticated using (true);

create policy "Allow authenticated write on guests"
on public.guests for all
to authenticated using (true);

create policy "Allow authenticated write on seating"
on public.seating for all
to authenticated using (true);

create policy "Allow authenticated write on undo_stack"
on public.undo_stack for all
to authenticated using (true);

create policy "Allow authenticated write on wedding_info"
on public.wedding_info for all
to authenticated using (true);
