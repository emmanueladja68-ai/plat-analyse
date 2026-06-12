'use client'

import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import FilterBar, { Filters } from '@/components/depenses/FilterBar'
import DepenseTable from '@/components/depenses/DepenseTable'
import SummaryCards from '@/components/depenses/SummaryCards'
import { createClient } from '@/lib/supabase/client'
import type { Depense } from '@/types'

const DEFAULT_FILTERS: Filters = { poste: '', categorie: 'Toutes les catégories', date: '' }

export default function DepensesPage() {
  const [depenses, setDepenses] = useState<Depense[]>([])
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('depenses')
        .select('*')
        .order('date', { ascending: false })
      setDepenses((data as Depense[]) || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = depenses.filter((d) => {
    if (filters.poste && !d.poste.toLowerCase().includes(filters.poste.toLowerCase())) return false
    if (
      filters.categorie !== 'Toutes les catégories' &&
      d.categorie !== filters.categorie
    )
      return false
    if (filters.date && d.date < filters.date) return false
    return true
  })

  function exportCSV() {
    const header = 'Poste,Catégorie,Montant,Date'
    const rows = filtered.map(
      (d) =>
        `"${d.poste}","${d.categorie || ''}",${d.montant},"${d.date || ''}"`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'depenses.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Topbar title="Mes dépenses" />
      <main className="pt-24 pb-20 md:pb-lg px-lg max-w-max_container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg gap-4">
          <p className="text-body-sm text-secondary">
            Gérez et suivez l&apos;ensemble de vos transactions financières.
          </p>
          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-label-md hover:bg-surface-tint transition-all active:scale-95 shadow-sm"
          >
            <Download size={16} strokeWidth={1.5} />
            Exporter CSV
          </button>
        </div>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        {loading ? (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 text-center">
            <p className="text-body-sm text-secondary">Chargement...</p>
          </div>
        ) : (
          <DepenseTable depenses={filtered} />
        )}

        <SummaryCards depenses={filtered} />
      </main>
    </>
  )
}
