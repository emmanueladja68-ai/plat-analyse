-- plat-analyse — schéma Supabase
-- Exécuter dans l'éditeur SQL de Supabase

create table if not exists depenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  poste text not null,
  libelle text,
  montant numeric not null,
  categorie text,
  date date default current_date,
  created_at timestamptz default now()
);

-- Index pour les requêtes fréquentes
create index if not exists depenses_user_id_idx on depenses (user_id);
create index if not exists depenses_date_idx on depenses (date desc);
create index if not exists depenses_categorie_idx on depenses (categorie);

-- Row Level Security
alter table depenses enable row level security;

-- Policy: chaque utilisateur ne voit que ses propres données
create policy "users see own data"
  on depenses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
