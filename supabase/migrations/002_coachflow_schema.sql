-- CoachFlow schema — new tables only, existing tables untouched

-- Coach profiles (one-to-one with auth.users)
create table if not exists public.coach_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  first_name text not null,
  last_name text not null,
  bio text,
  specialty text[] default '{}',
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Clients managed by coaches
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references public.coach_profiles(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  email text,
  age integer,
  weight float,
  height float,
  goal text check (goal in ('weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general')),
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Exercise library (null coach_id = global/shared)
create table if not exists public.exercises (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references public.coach_profiles(id) on delete cascade,
  name text not null,
  muscle_group text not null check (muscle_group in ('chest','back','shoulders','arms','legs','core','cardio','full_body')),
  equipment text not null check (equipment in ('barbell','dumbbell','machine','bodyweight','cable','other')),
  description text,
  created_at timestamptz default now() not null
);

-- Training programs
create table if not exists public.programs (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references public.coach_profiles(id) on delete cascade not null,
  name text not null,
  description text,
  duration_weeks integer not null default 4,
  difficulty text not null default 'beginner' check (difficulty in ('beginner','intermediate','advanced')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Program days
create table if not exists public.program_days (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade not null,
  day_number integer not null,
  name text not null,
  created_at timestamptz default now() not null
);

-- Exercises per program day
create table if not exists public.program_day_exercises (
  id uuid default gen_random_uuid() primary key,
  program_day_id uuid references public.program_days(id) on delete cascade not null,
  exercise_id uuid references public.exercises(id) on delete cascade not null,
  sets integer not null default 3,
  reps text not null default '8-12',
  rest_seconds integer not null default 90,
  order_index integer not null default 0,
  notes text,
  created_at timestamptz default now() not null
);

-- Client ↔ Program assignments
create table if not exists public.client_programs (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients(id) on delete cascade not null,
  program_id uuid references public.programs(id) on delete cascade not null,
  started_at date not null default current_date,
  active boolean not null default true,
  created_at timestamptz default now() not null,
  unique(client_id, program_id)
);

-- Exercise favorites (coach bookmarks)
create table if not exists public.exercise_favorites (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references public.coach_profiles(id) on delete cascade not null,
  exercise_id uuid references public.exercises(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(coach_id, exercise_id)
);

-- RLS
alter table public.coach_profiles enable row level security;
alter table public.clients enable row level security;
alter table public.exercises enable row level security;
alter table public.programs enable row level security;
alter table public.program_days enable row level security;
alter table public.program_day_exercises enable row level security;
alter table public.client_programs enable row level security;
alter table public.exercise_favorites enable row level security;

-- Coach profiles policies
create policy "coaches: select own" on public.coach_profiles for select using (auth.uid() = id);
create policy "coaches: insert own" on public.coach_profiles for insert with check (auth.uid() = id);
create policy "coaches: update own" on public.coach_profiles for update using (auth.uid() = id);

-- Clients policies
create policy "clients: select own" on public.clients for select using (auth.uid() = coach_id);
create policy "clients: insert own" on public.clients for insert with check (auth.uid() = coach_id);
create policy "clients: update own" on public.clients for update using (auth.uid() = coach_id);
create policy "clients: delete own" on public.clients for delete using (auth.uid() = coach_id);

-- Exercises policies
create policy "exercises: select all" on public.exercises for select using (coach_id is null or auth.uid() = coach_id);
create policy "exercises: insert own" on public.exercises for insert with check (auth.uid() = coach_id);
create policy "exercises: update own" on public.exercises for update using (auth.uid() = coach_id);
create policy "exercises: delete own" on public.exercises for delete using (auth.uid() = coach_id);

-- Programs policies
create policy "programs: select own" on public.programs for select using (auth.uid() = coach_id);
create policy "programs: insert own" on public.programs for insert with check (auth.uid() = coach_id);
create policy "programs: update own" on public.programs for update using (auth.uid() = coach_id);
create policy "programs: delete own" on public.programs for delete using (auth.uid() = coach_id);

-- Program days (via program ownership)
create policy "program_days: select" on public.program_days for select using (
  exists (select 1 from public.programs p where p.id = program_id and p.coach_id = auth.uid())
);
create policy "program_days: insert" on public.program_days for insert with check (
  exists (select 1 from public.programs p where p.id = program_id and p.coach_id = auth.uid())
);
create policy "program_days: delete" on public.program_days for delete using (
  exists (select 1 from public.programs p where p.id = program_id and p.coach_id = auth.uid())
);

-- Program day exercises
create policy "pde: select" on public.program_day_exercises for select using (
  exists (
    select 1 from public.program_days pd
    join public.programs p on p.id = pd.program_id
    where pd.id = program_day_id and p.coach_id = auth.uid()
  )
);
create policy "pde: insert" on public.program_day_exercises for insert with check (
  exists (
    select 1 from public.program_days pd
    join public.programs p on p.id = pd.program_id
    where pd.id = program_day_id and p.coach_id = auth.uid()
  )
);
create policy "pde: delete" on public.program_day_exercises for delete using (
  exists (
    select 1 from public.program_days pd
    join public.programs p on p.id = pd.program_id
    where pd.id = program_day_id and p.coach_id = auth.uid()
  )
);

-- Client programs
create policy "cp: select" on public.client_programs for select using (
  exists (select 1 from public.clients c where c.id = client_id and c.coach_id = auth.uid())
);
create policy "cp: insert" on public.client_programs for insert with check (
  exists (select 1 from public.clients c where c.id = client_id and c.coach_id = auth.uid())
);
create policy "cp: delete" on public.client_programs for delete using (
  exists (select 1 from public.clients c where c.id = client_id and c.coach_id = auth.uid())
);

-- Favorites
create policy "favorites: select own" on public.exercise_favorites for select using (auth.uid() = coach_id);
create policy "favorites: insert own" on public.exercise_favorites for insert with check (auth.uid() = coach_id);
create policy "favorites: delete own" on public.exercise_favorites for delete using (auth.uid() = coach_id);

-- Seed global exercises
insert into public.exercises (name, muscle_group, equipment, description, coach_id) values
  ('Développé couché', 'chest', 'barbell', 'Exercice de poitrine avec barre', null),
  ('Développé incliné haltères', 'chest', 'dumbbell', 'Poitrine haute avec haltères', null),
  ('Pompes', 'chest', 'bodyweight', 'Exercice au poids du corps', null),
  ('Tractions', 'back', 'bodyweight', 'Traction à la barre fixe', null),
  ('Rowing barre', 'back', 'barbell', 'Tirage horizontal avec barre', null),
  ('Lat pulldown', 'back', 'cable', 'Tirage vertical à la poulie', null),
  ('Développé militaire', 'shoulders', 'barbell', 'Press épaules debout', null),
  ('Élévations latérales', 'shoulders', 'dumbbell', 'Isolation épaule médiale', null),
  ('Curl biceps barre', 'arms', 'barbell', 'Flexion biceps avec barre', null),
  ('Dips', 'arms', 'bodyweight', 'Triceps aux barres parallèles', null),
  ('Squat barre', 'legs', 'barbell', 'Exercice roi des jambes', null),
  ('Fentes marchées', 'legs', 'dumbbell', 'Fentes en progression', null),
  ('Leg press', 'legs', 'machine', 'Presse à cuisses', null),
  ('Soulevé de terre', 'full_body', 'barbell', 'Exercice compound full body', null),
  ('Crunchs', 'core', 'bodyweight', 'Abdominaux de base', null),
  ('Planche', 'core', 'bodyweight', 'Gainage statique', null),
  ('Burpees', 'cardio', 'bodyweight', 'Exercice cardio intense', null),
  ('Corde à sauter', 'cardio', 'other', 'Cardio rythmé', null);
