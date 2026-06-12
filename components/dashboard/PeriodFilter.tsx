'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const PERIODS = ['Ce mois', '3 mois', '6 mois', 'Année']
const CATEGORIES = ['Toutes les catégories', 'Logistique', 'Infrastructure', 'Maintenance', 'Personnel', 'Marketing']

export default function PeriodFilter() {
  const [active, setActive] = useState('Ce mois')

  return (
    <section className="mb-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Period buttons */}
      <div className="flex items-center bg-surface-container p-1 rounded-xl border border-outline-variant">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-4 py-[6px] text-label-md rounded-lg transition-colors ${
              active === p
                ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Category selector */}
      <div className="relative w-full sm:w-auto">
        <select className="w-full sm:w-64 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-body-sm appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none">
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
        />
      </div>
    </section>
  )
}
