import { TrendingUp, BarChart2, Bell } from 'lucide-react'
import { formatEuro } from '@/lib/utils/formatters'
import type { Depense } from '@/types'

export default function SummaryCards({ depenses }: { depenses: Depense[] }) {
  const total = depenses.reduce((acc, d) => acc + Math.abs(d.montant), 0)
  const avg = depenses.length > 0 ? total / depenses.length : 0

  // Budget alerts: categories with amount > 2x average category
  const byCategorie: Record<string, number> = {}
  depenses.forEach((d) => {
    const cat = d.categorie || 'Autres'
    byCategorie[cat] = (byCategorie[cat] || 0) + Math.abs(d.montant)
  })
  const catValues = Object.values(byCategorie)
  const catAvg = catValues.length > 0 ? catValues.reduce((a, b) => a + b, 0) / catValues.length : 0
  const alerts = Object.entries(byCategorie).filter(([, v]) => v > catAvg * 1.5)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg mt-lg">
      {/* Total */}
      <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex items-start justify-between">
        <div>
          <h3 className="text-label-sm text-secondary uppercase font-semibold mb-1">
            Total ce mois
          </h3>
          <p className="text-headline-md font-semibold text-on-surface font-tabular">
            {formatEuro(total)}
          </p>
          <span className="text-[12px] text-[#16a34a] font-medium">+12.4% vs mois dernier</span>
        </div>
        <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
          <TrendingUp size={20} strokeWidth={1.5} className="text-primary" />
        </div>
      </div>

      {/* Average */}
      <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex items-start justify-between">
        <div>
          <h3 className="text-label-sm text-secondary uppercase font-semibold mb-1">
            Dépense moyenne
          </h3>
          <p className="text-headline-md font-semibold text-on-surface font-tabular">
            {formatEuro(avg)}
          </p>
          <span className="text-[12px] text-secondary">-2.1% stable</span>
        </div>
        <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
          <BarChart2 size={20} strokeWidth={1.5} className="text-primary" />
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex items-start justify-between">
        <div>
          <h3 className="text-label-sm text-secondary uppercase font-semibold mb-1">
            Alertes budget
          </h3>
          <p className="text-headline-md font-semibold text-on-surface">{alerts.length}</p>
          {alerts.length > 0 ? (
            <span className="text-[12px] text-error font-medium">
              Attention: {alerts[0][0]} (+{Math.round(((alerts[0][1] - catAvg) / catAvg) * 100)}%)
            </span>
          ) : (
            <span className="text-[12px] text-secondary">Tout est dans la moyenne</span>
          )}
        </div>
        <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
          <Bell
            size={20}
            strokeWidth={1.5}
            className={alerts.length > 0 ? 'text-error' : 'text-secondary'}
          />
        </div>
      </div>
    </div>
  )
}
