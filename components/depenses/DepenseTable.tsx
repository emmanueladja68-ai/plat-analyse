'use client'

import { useState } from 'react'
import { Pencil, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatEuro, formatDate } from '@/lib/utils/formatters'
import type { Depense } from '@/types'

const CATEGORY_COLORS: Record<string, string> = {
  Logiciels: 'bg-secondary-container text-on-secondary-container',
  Infrastructure: 'bg-[#ede9fe] text-[#5b21b6]',
  Marketing: 'bg-[#dcfce7] text-[#166534]',
  Logistique: 'bg-[#fef3c7] text-[#92400e]',
  Personnel: 'bg-[#fce7f3] text-[#9d174d]',
  Alimentation: 'bg-[#fff7ed] text-[#c2410c]',
  Transport: 'bg-[#f0fdf4] text-[#15803d]',
  Services: 'bg-[#f0f9ff] text-[#0369a1]',
}

const PAGE_SIZE = 10

export default function DepenseTable({ depenses }: { depenses: Depense[] }) {
  const [page, setPage] = useState(1)
  const total = depenses.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const slice = depenses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4 text-label-sm text-secondary uppercase">Poste</th>
              <th className="px-6 py-4 text-label-sm text-secondary uppercase">Catégorie</th>
              <th className="px-6 py-4 text-label-sm text-secondary uppercase text-right">Montant</th>
              <th className="px-6 py-4 text-label-sm text-secondary uppercase">Date</th>
              <th className="px-6 py-4 text-label-sm text-secondary uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {slice.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-body-sm text-secondary text-center">
                  Aucune dépense trouvée.{' '}
                  <a href="/importer" className="text-primary hover:underline">
                    Importez vos données
                  </a>
                </td>
              </tr>
            ) : (
              slice.map((d) => {
                const catClass = CATEGORY_COLORS[d.categorie || ''] || 'bg-surface-container text-secondary'
                return (
                  <tr
                    key={d.id}
                    className="group hover:bg-surface-container-low transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-body-md font-medium text-on-surface">{d.poste}</span>
                        {d.libelle && (
                          <span className="text-[12px] text-secondary">{d.libelle}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {d.categorie && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-label-sm ${catClass}`}
                        >
                          {d.categorie}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[13px] font-semibold text-on-surface font-tabular">
                        {formatEuro(d.montant)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-sm text-secondary">
                      {d.date ? formatDate(d.date) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center">
                        <button className="p-1 text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                          <Pencil size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-body-sm text-secondary">
          Affichage de {total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} à{' '}
          {Math.min(page * PAGE_SIZE, total)} sur {total} dépense{total > 1 ? 's' : ''}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-label-md transition-colors ${
                  page === n
                    ? 'bg-primary text-on-primary'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                {n}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <span className="text-secondary px-1">...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-8 h-8 rounded-lg text-label-md hover:bg-surface-container text-on-surface transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
