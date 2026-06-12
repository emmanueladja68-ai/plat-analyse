'use client'

import { MoreVertical } from 'lucide-react'

type DonutSlice = { label: string; pct: number; color: string }

const DEFAULT_SLICES: DonutSlice[] = [
  { label: 'Logistique', pct: 32, color: '#004ac6' },
  { label: 'Infrastructure', pct: 25, color: '#2563eb' },
  { label: 'Maintenance', pct: 20, color: '#d3e4fe' },
  { label: 'Autres', pct: 23, color: '#e1e2ed' },
]

export default function DonutChart({ slices = DEFAULT_SLICES }: { slices?: DonutSlice[] }) {
  const top = slices[0]

  // Build SVG donut from slices
  const r = 16
  const circ = 2 * Math.PI * r
  let offset = 0
  const paths = slices.map((s) => {
    const dash = (s.pct / 100) * circ
    const path = { dash, offset, color: s.color }
    offset += dash
    return path
  })

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
      <div className="flex justify-between items-center mb-lg">
        <h4 className="text-headline-sm">Répartition par catégorie</h4>
        <button className="text-secondary p-1 hover:bg-surface-container rounded-full transition-colors">
          <MoreVertical size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-xl min-h-[200px]">
        {/* Donut SVG */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r={r} fill="none" stroke="#f3f4f6" strokeWidth="4" />
            {paths.map((p, i) => (
              <circle
                key={i}
                cx="18"
                cy="18"
                r={r}
                fill="none"
                stroke={p.color}
                strokeWidth="4"
                strokeDasharray={`${p.dash} ${circ}`}
                strokeDashoffset={-p.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-semibold text-on-surface leading-none">
              {top.pct}%
            </span>
            <span className="text-[10px] text-secondary uppercase font-bold mt-1">
              {top.label}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {slices.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-[2px] flex-shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-body-sm">{s.label}</span>
              </div>
              <span className="text-body-sm font-semibold">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
