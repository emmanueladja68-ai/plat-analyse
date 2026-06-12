export type Depense = {
  id: string
  user_id: string
  poste: string
  libelle?: string
  montant: number
  categorie?: string
  date: string
  created_at: string
}

export type ParsedRow = {
  poste: string
  libelle?: string
  montant: number
  categorie?: string
  date?: string
}

export type ParseResult = {
  rows: ParsedRow[]
  errors: Array<{ line: number; message: string }>
}

export type Conclusion = {
  icon: string
  title: string
  text: string
  color: 'blue' | 'orange' | 'gray'
}

export type KpiData = {
  totalDepenses: number
  nombrePostes: number
  posteDominant: string
  posteDominantPct: number
  evolution: number
}
