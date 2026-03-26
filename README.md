# 🥗 Kaloulou — Suivi Calorique

Application web de suivi nutritionnel permettant de logger ses repas, calculer ses apports caloriques et suivre ses objectifs au quotidien.

## Fonctionnalités

- **Authentification** — Inscription / Connexion via Supabase Auth
- **Profil utilisateur** — Renseignement des données physiques (âge, taille, poids, objectif) avec calcul automatique de l'objectif calorique journalier
- **Dashboard** — Vue du jour avec résumé des calories consommées et graphique de répartition par repas
- **Journal alimentaire** — Ajout de repas (petit-déjeuner, déjeuner, dîner, collation) avec recherche d'aliments et saisie de la quantité
- **Historique** — Consultation des entrées passées avec graphique d'évolution
- **Mode sombre** — Thème clair / sombre persistant

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Style | Tailwind CSS v4 |
| Backend / Auth / BDD | Supabase (PostgreSQL + RLS) |
| État global | Zustand |
| Requêtes serveur | TanStack Query v5 |
| Formulaires | React Hook Form + Zod |
| Graphiques | Recharts |
| Tests | Vitest + Testing Library |

## Prérequis

- Node.js ≥ 18
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

## Installation & lancement

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd kaloulou
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple et renseigner vos clés Supabase :

```bash
cp .env.example .env
```

Éditer `.env` :

```env
VITE_SUPABASE_URL=https://<votre-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<votre-anon-key>
```

> Les clés se trouvent dans **Settings → API** de votre projet Supabase.

### 4. Initialiser la base de données

Dans l'éditeur SQL de Supabase (ou via la CLI), exécuter le fichier de migration :

```
supabase/migrations/001_initial_schema.sql
```

Ce script crée les tables `profiles`, `food_items`, `meal_entries` et active les politiques Row Level Security (RLS).

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement avec HMR |
| `npm run build` | Compilation TypeScript + build de production |
| `npm run preview` | Prévisualisation du build de production |
| `npm run lint` | Analyse statique ESLint |
| `npm run test` | Lancer les tests (Vitest) |
| `npm run test:ui` | Interface visuelle des tests |

## Structure du projet

```
src/
├── app/          # Composant racine, providers, routing
├── entities/     # Modèles métier (user, food-item, meal)
├── features/     # Fonctionnalités (auth, food, meal-entry, profile)
├── pages/        # Pages de l'application
├── shared/       # Utilitaires, UI génériques, client Supabase
├── tests/        # Tests unitaires et d'intégration
└── widgets/      # Blocs UI composites (graphiques, formulaires)
```

L'architecture suit les principes de **Feature-Sliced Design (FSD)**.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
