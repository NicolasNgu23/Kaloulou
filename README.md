# CoachFlow — SaaS de gestion pour coachs fitness

Plateforme web permettant aux coachs fitness de gérer leurs clients, créer des programmes d'entraînement personnalisés et accéder à une bibliothèque d'exercices.

## Fonctionnalités

- **Authentification** — Inscription / Connexion via Supabase Auth
- **Profil coach** — Configuration du profil à la première connexion (prénom, nom, bio)
- **Dashboard** — Vue d'ensemble avec stats (clients, programmes, plan) et accès rapide
- **Clients** — Liste avec recherche et filtre par objectif, fiche détaillée, assignation de programmes
- **Programmes** — Création de programmes avec niveaux de difficulté, builder de séances (jours + exercices)
- **Exercices** — Bibliothèque avec filtres (groupe musculaire, équipement), favoris, création d'exercices custom
- **Profil** — Modification des informations coach, affichage du plan (Free / Pro)

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 19 + TypeScript strict |
| Build | Vite |
| Style | Tailwind CSS v4 |
| Architecture | Feature-Sliced Design (FSD) |
| Backend / Auth / BDD | Supabase (PostgreSQL + RLS) |
| État global | Zustand (sélecteurs stricts + derived state) |
| Requêtes serveur | TanStack Query v5 (custom hooks) |
| Formulaires | React Hook Form + Zod |
| Tests | Vitest + Testing Library |

## Prérequis

- Node.js ≥ 18
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

## Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/NicolasNgu23/Kaloulou.git
cd Kaloulou
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer `.env` avec vos clés Supabase :

```env
VITE_SUPABASE_URL=https://<votre-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<votre-anon-key>
```

> Les clés se trouvent dans **Settings → API** de votre projet Supabase.

### 4. Initialiser la base de données

Dans l'éditeur SQL de Supabase (**SQL Editor → New query**), exécuter les deux migrations dans l'ordre :

```
supabase/migrations/001_initial_schema.sql   ← tables nutrition (legacy)
supabase/migrations/002_coachflow_schema.sql ← tables CoachFlow (coach_profiles, clients, programs, exercises...)
```

> Ces scripts créent toutes les tables et activent les politiques Row Level Security (RLS).

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173).

À la première connexion, un modal vous invite à configurer votre profil coach.

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement avec HMR |
| `npm run build` | Vérification TypeScript + build de production |
| `npm run preview` | Prévisualisation du build de production |
| `npm run lint` | Analyse statique ESLint |
| `npm run test` | Lancer les tests (Vitest) |

## Structure du projet

```
src/
├── app/          # Routing, providers, ProfileSetupModal
├── entities/     # Modèles métier + API Supabase (coach, client, exercise, program)
├── features/     # Hooks React Query par domaine (auth, coach, client, program, exercise)
├── pages/        # Pages (dashboard, clients, programs, exercises, profile, auth, landing)
├── shared/       # UI génériques, stores Zustand, queryKeys, client Supabase
├── tests/        # Tests unitaires (Vitest + RTL)
└── widgets/      # Blocs UI composites
```

L'architecture suit les principes de **Feature-Sliced Design (FSD)** : les imports vont toujours des couches hautes vers les couches basses (`pages → features → entities → shared`).
