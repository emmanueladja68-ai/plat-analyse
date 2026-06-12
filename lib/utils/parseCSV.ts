import { ParsedRow, ParseResult } from '@/types'

const POSTE_KEYS = ['poste', 'libellé', 'libelle', 'description', 'nom', 'name', 'label']
const MONTANT_KEYS = ['montant', 'amount', 'total', 'valeur', 'value', 'prix', 'price']
const CATEGORIE_KEYS = ['categorie', 'catégorie', 'category', 'cat', 'type']
const DATE_KEYS = ['date', 'jour', 'day', 'when']

function detectSeparator(line: string): string {
  const counts: Record<string, number> = {
    ',': (line.match(/,/g) || []).length,
    ';': (line.match(/;/g) || []).length,
    '|': (line.match(/\|/g) || []).length,
    '\t': (line.match(/\t/g) || []).length,
  }
  return Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0]
}

function parseLine(line: string, sep: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === sep && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

function findColIndex(headers: string[], candidates: string[]): number {
  const normalized = headers.map((h) => h.toLowerCase().trim().replace(/[^a-z]/g, ''))
  for (const candidate of candidates) {
    const idx = normalized.findIndex((h) => h === candidate.replace(/[^a-z]/g, ''))
    if (idx !== -1) return idx
  }
  return -1
}

export function parseCSV(raw: string): ParseResult {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) {
    return { rows: [], errors: [{ line: 0, message: 'Fichier vide ou sans données' }] }
  }

  const sep = detectSeparator(lines[0])
  const headers = parseLine(lines[0], sep)

  const posteIdx = findColIndex(headers, POSTE_KEYS)
  const montantIdx = findColIndex(headers, MONTANT_KEYS)
  const categorieIdx = findColIndex(headers, CATEGORIE_KEYS)
  const dateIdx = findColIndex(headers, DATE_KEYS)

  if (montantIdx === -1) {
    return { rows: [], errors: [{ line: 0, message: 'Colonne montant introuvable' }] }
  }

  const rows: ParsedRow[] = []
  const errors: Array<{ line: number; message: string }> = []

  for (let i = 1; i < lines.length; i++) {
    const cells = parseLine(lines[i], sep)
    const rawMontant = cells[montantIdx]?.replace(/\s/g, '').replace(',', '.').replace('€', '') || ''
    const montant = parseFloat(rawMontant)

    if (isNaN(montant)) {
      errors.push({ line: i + 1, message: `Montant invalide: "${cells[montantIdx]}"` })
      continue
    }

    const poste =
      posteIdx !== -1
        ? cells[posteIdx] || `Ligne ${i}`
        : categorieIdx !== -1
          ? cells[categorieIdx] || `Ligne ${i}`
          : `Ligne ${i}`

    rows.push({
      poste,
      libelle: posteIdx !== -1 ? cells[posteIdx] : undefined,
      montant,
      categorie: categorieIdx !== -1 ? cells[categorieIdx] : undefined,
      date: dateIdx !== -1 ? cells[dateIdx] : undefined,
    })
  }

  return { rows, errors }
}
