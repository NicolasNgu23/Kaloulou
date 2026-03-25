-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  first_name text not null,
  last_name text not null,
  gender text not null check (gender in ('male', 'female')),
  age integer not null,
  height float not null,
  weight float not null,
  goal text not null check (goal in ('lose', 'maintain', 'gain')),
  daily_calorie_target integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Food items table
create table public.food_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  calories_per_100g float not null,
  proteins float not null default 0,
  carbs float not null default 0,
  fats float not null default 0,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Meal entries table
create table public.meal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  food_item_id uuid references public.food_items(id) on delete cascade not null,
  quantity float not null,
  calories float not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.food_items enable row level security;
alter table public.meal_entries enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own and common food items" on public.food_items for select using (user_id is null or auth.uid() = user_id);
create policy "Users can insert own food items" on public.food_items for insert with check (auth.uid() = user_id);
create policy "Users can delete own food items" on public.food_items for delete using (auth.uid() = user_id);

create policy "Users can view own meals" on public.meal_entries for select using (auth.uid() = user_id);
create policy "Users can insert own meals" on public.meal_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own meals" on public.meal_entries for update using (auth.uid() = user_id);
create policy "Users can delete own meals" on public.meal_entries for delete using (auth.uid() = user_id);

-- Seed common food items
insert into public.food_items (name, calories_per_100g, proteins, carbs, fats, user_id) values
  ('Blanc de poulet', 165, 31, 0, 3.6, null),
  ('Riz blanc cuit', 130, 2.7, 28, 0.3, null),
  ('Oeuf entier', 155, 13, 1.1, 11, null),
  ('Pomme', 52, 0.3, 14, 0.2, null),
  ('Banane', 89, 1.1, 23, 0.3, null),
  ('Pain complet', 247, 9, 41, 4.2, null),
  ('Lait entier', 61, 3.2, 4.8, 3.2, null),
  ('Yaourt nature', 59, 3.5, 4.7, 3.3, null),
  ('Saumon', 208, 20, 0, 13, null),
  ('Thon en conserve', 116, 26, 0, 1, null),
  ('Pasta cuite', 158, 5.8, 31, 0.9, null),
  ('Avoine', 389, 17, 66, 7, null),
  ('Amandes', 579, 21, 22, 50, null),
  ('Brocoli', 34, 2.8, 7, 0.4, null),
  ('Carotte', 41, 0.9, 10, 0.2, null);
