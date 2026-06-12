import { Depense, Conclusion } from '@/types'

export function computeConclusions(depenses: Depense[]): Conclusion[] {
  if (depenses.length === 0) {
    return [
      {
        icon: 'Lightbulb',
        title: 'AUCUNE DONNÉE',
        text: 'Importez vos dépenses pour obtenir des analyses automatiques.',
        color: 'gray',
      },
      {
        icon: 'AlertTriangle',
        title: 'EN ATTENTE',
        text: 'Les alertes budget apparaîtront une fois vos données chargées.',
        color: 'orange',
      },
      {
        icon: 'TrendingUp',
        title: 'TENDANCE',
        text: 'Les tendances annuelles seront calculées dès que vous aurez importé des données.',
        color: 'gray',
      },
    ]
  }

  // Aggregate by category
  const byCategorie: Record<string, number> = {}
  depenses.forEach((d) => {
    const cat = d.categorie || 'Non classé'
    byCategorie[cat] = (byCategorie[cat] || 0) + Math.abs(d.montant)
  })

  const total = Object.values(byCategorie).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(byCategorie).sort(([, a], [, b]) => b - a)
  const dominant = sorted[0]
  const dominantPct = total > 0 ? Math.round((dominant[1] / total) * 100) : 0

  // Average per poste
  const byPoste: Record<string, number> = {}
  depenses.forEach((d) => {
    byPoste[d.poste] = (byPoste[d.poste] || 0) + Math.abs(d.montant)
  })
  const avg = Object.values(byPoste).reduce((a, b) => a + b, 0) / Object.values(byPoste).length
  const aboveAvg = Object.entries(byPoste).filter(([, v]) => v > avg * 1.2)

  // Top 3 cumulated
  const top3 = sorted.slice(0, 3).reduce((acc, [, v]) => acc + v, 0)
  const top3Pct = total > 0 ? Math.round((top3 / total) * 100) : 0

  return [
    {
      icon: 'Lightbulb',
      title: 'OPTIMISATION ACTIVE',
      text: `Le poste dominant est "${dominant[0]}" représentant ${dominantPct}% du budget. Les 3 premières catégories concentrent ${top3Pct}% des dépenses totales.`,
      color: 'blue',
    },
    {
      icon: 'AlertTriangle',
      title: 'ALERTE POSTES',
      text:
        aboveAvg.length > 0
          ? `${aboveAvg.length} poste(s) dépassent la moyenne de 20% ou plus : ${aboveAvg
              .slice(0, 2)
              .map(([k]) => k)
              .join(', ')}.`
          : 'Tous les postes de dépenses sont dans la moyenne. Bonne maîtrise budgétaire.',
      color: 'orange',
    },
    {
      icon: 'TrendingUp',
      title: 'TENDANCE ANNUELLE',
      text: `${depenses.length} transactions analysées. Total cumulé: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}.`,
      color: 'gray',
    },
  ]
}
