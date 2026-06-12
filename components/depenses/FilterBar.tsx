'use client'

import { ChevronDown } from 'lucide-react'

export type Filters = {
  poste: string
  categorie: string
  date: string
}

const CATEGORIES = [
  'Toutes les catégories',
  'Logistique',
  'Infrastructure',
  'Marketing',
  'Logiciels',
  'Personnel',
  'Alimentation',
  'Transport',
  'Services',
]

export default function FilterBar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (f: Filters) => void
  onReset: () => void
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-lg grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      {/* Poste */}
      <div className="space-y-[6px]">
        <label className="block text-label-sm text-secondary uppercase tracking-wider">
          Poste de dépense
        </label>
        <input
          type="text"
          value={filters.poste}
          onChange={(e) => onChange({ ...filters, poste: e.target.value })}
          placeholder="Ex: Loyer, Marketing..."
          className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest"
        />
      </div>

      {/* Catégorie */}
      <div className="space-y-[6px]">
        <label className="block text-label-sm text-secondary uppercase tracking-wider">
          Catégorie
        </label>
        <div className="relative">
          <select
            value={filters.categorie}
            onChange={(e) => onChange({ ...filters, categorie: e.target.value })}
            className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest appearance-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          />
        </div>
      </div>

      {/* Date */}
      <div className="space-y-[6px]">
        <label className="block text-label-sm text-secondary uppercase tracking-wider">
          Période
        </label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => onChange({ ...filters, date: e.target.value })}
          className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 bg-surface-container-high text-on-surface border border-outline-variant px-4 py-2 rounded-lg text-label-md hover:bg-surface-container-highest transition-colors"
        >
          Réinitialiser
        </button>
        <button className="flex-1 bg-primary-container text-white px-4 py-2 rounded-lg text-label-md hover:bg-primary transition-colors">
          Filtrer
        </button>
      </div>
    </div>
  )
}
