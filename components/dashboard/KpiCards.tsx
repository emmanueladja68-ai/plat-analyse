import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatEuro, formatPct } from '@/lib/utils/formatters'
import { KpiData } from '@/types'

export default function KpiCards({ data }: { data: KpiData }) {
  const evolutionPositive = data.evolution >= 0

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-lg">
      {/* Card 1 — Total dépenses */}
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between">
        <div>
          <p className="text-label-sm text-secondary uppercase tracking-wider mb-2">
            Total dépenses
          </p>
          <h3 className="text-headline-md text-on-surface font-tabular">
            {formatEuro(data.totalDepenses)}
          </h3>
        </div>
        <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#16a34a]">
          <TrendingUp size={14} strokeWidth={2} />
          <span>+5.2% vs mois dernier</span>
        </div>
      </div>

      {/* Card 2 — Nombre de postes */}
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between">
        <div>
          <p className="text-label-sm text-secondary uppercase tracking-wider mb-2">
            Nombre de postes
          </p>
          <h3 className="text-headline-md text-on-surface">{data.nombrePostes}</h3>
        </div>
        <div className="mt-4 text-[13px] font-medium text-on-secondary-container">
          Stabilité opérationnelle
        </div>
      </div>

      {/* Card 3 — Poste dominant */}
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between">
        <div>
          <p className="text-label-sm text-secondary uppercase tracking-wider mb-2">
            Poste dominant
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-md text-on-surface">{data.posteDominant}</h3>
            <span className="px-2 py-0.5 bg-secondary-container text-primary text-[10px] font-bold rounded uppercase tracking-tighter">
              Majoritaire
            </span>
          </div>
        </div>
        <div className="mt-4 text-[13px] font-medium text-secondary">
          {data.posteDominantPct}% du budget total
        </div>
      </div>

      {/* Card 4 — Évolution */}
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between">
        <div>
          <p className="text-label-sm text-secondary uppercase tracking-wider mb-2">Évolution</p>
          <h3
            className="text-headline-md"
            style={{ color: evolutionPositive ? '#16a34a' : '#ba1a1a' }}
          >
            {formatPct(data.evolution)}
          </h3>
        </div>
        <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-primary">
          {evolutionPositive ? (
            <TrendingUp size={14} strokeWidth={2} />
          ) : (
            <TrendingDown size={14} strokeWidth={2} />
          )}
          <span>Réduction des coûts fixes</span>
        </div>
      </div>
    </section>
  )
}
