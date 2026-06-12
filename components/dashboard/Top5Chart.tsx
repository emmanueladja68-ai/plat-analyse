import { formatEuro } from '@/lib/utils/formatters'

type Top5Item = { label: string; montant: number; pct: number }

const DEFAULT_ITEMS: Top5Item[] = [
  { label: 'Transport Routier', montant: 45200, pct: 85 },
  { label: 'Serveurs Cloud', montant: 28900, pct: 65 },
  { label: 'Maintenance Locaux', montant: 18400, pct: 45 },
  { label: 'Licences Software', montant: 12100, pct: 30 },
  { label: 'Équipements Bureau', montant: 9800, pct: 25 },
]

const BAR_COLORS = ['#004ac6', '#2563eb', '#b7c8e1', '#c3c6d7', '#e1e2ed']

export default function Top5Chart({ items = DEFAULT_ITEMS }: { items?: Top5Item[] }) {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
      <div className="flex justify-between items-center mb-lg">
        <h4 className="text-headline-sm">Top 5 postes</h4>
        <span className="text-label-sm text-secondary">Basé sur les 30 derniers jours</span>
      </div>

      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-body-sm mb-[6px]">
              <span className="text-on-surface">{item.label}</span>
              <span className="font-semibold font-tabular">{formatEuro(item.montant)}</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.pct}%`, backgroundColor: BAR_COLORS[i] || '#004ac6' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
