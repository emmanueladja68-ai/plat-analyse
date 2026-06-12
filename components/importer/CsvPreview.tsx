import { ParsedRow } from '@/types'
import { formatEuro } from '@/lib/utils/formatters'

export default function CsvPreview({ rows }: { rows: ParsedRow[] }) {
  const preview = rows.slice(0, 5)

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
      <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
        <span className="text-label-md text-secondary">
          Aperçu des données (5 premières lignes)
        </span>
        <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-lg text-label-sm">
          CSV Détecté
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container">
              <th className="px-lg py-3 text-label-sm text-secondary border-b border-outline-variant">
                Date
              </th>
              <th className="px-lg py-3 text-label-sm text-secondary border-b border-outline-variant">
                Libellé / Poste
              </th>
              <th className="px-lg py-3 text-label-sm text-secondary border-b border-outline-variant">
                Catégorie
              </th>
              <th className="px-lg py-3 text-label-sm text-secondary border-b border-outline-variant text-right">
                Montant
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {preview.map((row, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors">
                <td className="px-lg py-3 text-body-sm">
                  {row.date || '—'}
                </td>
                <td className="px-lg py-3 text-body-sm">{row.poste}</td>
                <td className="px-lg py-3 text-body-sm">{row.categorie || '—'}</td>
                <td
                  className={`px-lg py-3 text-body-sm text-right font-medium font-tabular ${
                    row.montant < 0 ? 'text-error' : 'text-primary'
                  }`}
                >
                  {row.montant < 0 ? '-' : '+'} {formatEuro(Math.abs(row.montant))}
                </td>
              </tr>
            ))}
            {preview.length === 0 && (
              <tr>
                <td colSpan={4} className="px-lg py-6 text-body-sm text-secondary text-center">
                  Aucune donnée à prévisualiser
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
