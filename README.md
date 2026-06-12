# plat-analyse

Application d'analyse financière — tableau de bord de vos dépenses.

## Prérequis

- Node.js 18+
- Compte Supabase (gratuit sur [supabase.com](https://supabase.com))

## Installation

```bash
npm install
```

## Configuration Supabase

1. Créez un projet sur [supabase.com](https://app.supabase.com)
2. Dans l'éditeur SQL, exécutez le contenu de `supabase/schema.sql`
3. Copiez les clés depuis **Project Settings → API** :

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Format CSV accepté

Colonnes reconnues automatiquement :
- **Poste / Libellé** : `poste`, `libellé`, `libelle`, `description`, `nom`, `name`
- **Montant** : `montant`, `amount`, `total`, `valeur`
- **Catégorie** : `categorie`, `catégorie`, `category`
- **Date** : `date`, `jour`

Séparateurs acceptés : `,` `;` `|` tabulation

### Exemple

```csv
Date,Libellé,Montant,Catégorie
2024-01-15,Loyer bureaux,-1500.00,Infrastructure
2024-01-16,Amazon Web Services,-299.99,Logiciels
2024-01-17,LinkedIn Ads,-450.00,Marketing
```
