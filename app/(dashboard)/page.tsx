import { createClient } from '@/lib/supabase/server'
import Topbar from '@/components/layout/Topbar'
import KpiCards from '@/components/dashboard/KpiCards'
import DonutChart from '@/components/dashboard/DonutChart'
import Top5Chart from '@/components/dashboard/Top5Chart'
import LineChart from '@/components/dashboard/LineChart'
import ConclusionCards from '@/components/dashboard/ConclusionCards'
import { computeConclusions } from '@/lib/utils/conclusions'
import type { Depense } from '@/types'
import PeriodFilter from '@/components/dashboard/PeriodFilter'

async function getDepenses(userId: string): Promise<Depense[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('depenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  return (data as Depense[]) || []
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const depenses = user ? await getDepenses(user.id) : []
  const conclusions = computeConclusions(depenses)

  const total = depenses.reduce((acc, d) => acc + Math.abs(d.montant), 0)
  const postes = new Set(depenses.map((d) => d.poste)).size

  // Dominant category
  const byCategorie: Record<string, number> = {}
  depenses.forEach((d) => {
    const cat = d.categorie || 'Non classé'
    byCategorie[cat] = (byCategorie[cat] || 0) + Math.abs(d.montant)
  })
  const sorted = Object.entries(byCategorie).sort(([, a], [, b]) => b - a)
  const dominant = sorted[0]
  const dominantPct = total > 0 && dominant ? Math.round((dominant[1] / total) * 100) : 0

  // Donut slices
  const COLORS = ['#004ac6', '#2563eb', '#d3e4fe', '#e1e2ed', '#ededf9']
  const donutSlices =
    sorted.length > 0
      ? sorted.slice(0, 4).map((e, i) => ({
          label: e[0],
          pct: total > 0 ? Math.round((e[1] / total) * 100) : 0,
          color: COLORS[i],
        }))
      : undefined

  // Top 5 postes
  const byPoste: Record<string, number> = {}
  depenses.forEach((d) => {
    byPoste[d.poste] = (byPoste[d.poste] || 0) + Math.abs(d.montant)
  })
  const sortedPostes = Object.entries(byPoste).sort(([, a], [, b]) => b - a)
  const maxPoste = sortedPostes[0]?.[1] || 1
  const top5Items =
    sortedPostes.length > 0
      ? sortedPostes.slice(0, 5).map(([label, montant]) => ({
          label,
          montant,
          pct: Math.round((montant / maxPoste) * 100),
        }))
      : undefined

  // Monthly evolution
  const monthly: Record<string, number> = {}
  depenses.forEach((d) => {
    const m = d.date?.slice(0, 7) || ''
    if (m) monthly[m] = (monthly[m] || 0) + Math.abs(d.montant)
  })
  const MONTH_LABELS = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
  const lineData =
    Object.keys(monthly).length > 0
      ? Object.entries(monthly)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => {
            const m = parseInt(k.split('-')[1]) - 1
            return { month: MONTH_LABELS[m] || k, value: v }
          })
      : undefined

  const kpiData = {
    totalDepenses: total,
    nombrePostes: postes,
    posteDominant: dominant?.[0] || 'N/A',
    posteDominantPct: dominantPct,
    evolution: -12.5,
  }

  return (
    <>
      <Topbar title="Tableau de bord" />
      <main className="pt-24 pb-lg px-lg max-w-max_container mx-auto">
        <PeriodFilter />
        <KpiCards data={kpiData} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg mb-lg">
          <DonutChart slices={donutSlices} />
          <Top5Chart items={top5Items} />
        </section>

        <LineChart data={lineData} />
        <ConclusionCards conclusions={conclusions} />
      </main>
    </>
  )
}
