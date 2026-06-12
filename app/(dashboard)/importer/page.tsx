'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '@/components/layout/Topbar'
import DropZone from '@/components/importer/DropZone'
import CsvPreview from '@/components/importer/CsvPreview'
import { parseCSV } from '@/lib/utils/parseCSV'
import { createClient } from '@/lib/supabase/client'
import type { ParsedRow } from '@/types'

const EXAMPLE_CSV = `Date,Libellé,Montant,Catégorie
2023-10-01,Restaurant Le Bistro,-45.20,Alimentation
2023-10-02,Abonnement Cloud,-12.99,Services
2023-10-03,Loyer Bureaux,-1500.00,Infrastructure
2023-10-04,Fournitures Bureau,-89.50,Matériel
2023-10-05,Taxi Client,-23.00,Logistique`

export default function ImporterPage() {
  const router = useRouter()
  const [csvText, setCsvText] = useState('')
  const [parsed, setParsed] = useState<ParsedRow[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  function handleCsvChange(text: string) {
    setCsvText(text)
    if (text.trim()) {
      const result = parseCSV(text)
      setParsed(result.rows)
      setErrors(result.errors.map((e) => `Ligne ${e.line}: ${e.message}`))
    } else {
      setParsed([])
      setErrors([])
    }
  }

  function loadExample() {
    handleCsvChange(EXAMPLE_CSV)
  }

  async function handleImport() {
    if (parsed.length === 0) return
    setLoading(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const rows = parsed.map((r) => ({
      user_id: user.id,
      poste: r.poste,
      libelle: r.libelle,
      montant: r.montant,
      categorie: r.categorie,
      date: r.date || new Date().toISOString().split('T')[0],
    }))

    const { error } = await supabase.from('depenses').insert(rows)
    setLoading(false)
    if (!error) {
      router.push('/')
      router.refresh()
    }
  }

  function handleCancel() {
    setCsvText('')
    setParsed([])
    setErrors([])
  }

  return (
    <>
      <Topbar title="Importer" />
      <main className="pt-24 pb-20 md:pb-lg min-h-screen">
        <div className="max-w-[1000px] mx-auto px-lg py-xl space-y-lg">
          {/* Header */}
          <section className="space-y-2">
            <h3 className="text-display-lg text-on-surface">Importation de données</h3>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              Importez vos relevés bancaires ou fichiers de dépenses au format CSV pour mettre à
              jour vos graphiques d&apos;analyse financière.
            </p>
          </section>

          {/* Drop zone */}
          <DropZone onFile={handleCsvChange} />

          {/* Paste zone */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg space-y-md">
            <div className="flex items-center justify-between">
              <label htmlFor="csv-paste" className="text-label-md text-on-surface">
                Ou collez vos données CSV
              </label>
              <button
                onClick={loadExample}
                className="text-primary text-label-md hover:underline decoration-2 underline-offset-4"
              >
                Charger un exemple
              </button>
            </div>
            <textarea
              id="csv-paste"
              rows={6}
              value={csvText}
              onChange={(e) => handleCsvChange(e.target.value)}
              placeholder={`Date,Libellé,Montant,Catégorie\n2023-10-01,Restaurant,45.20,Alimentation\n2023-10-02,Abonnement Cloud,12.99,Services`}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md font-mono text-[13px] focus:ring-2 focus:ring-primary focus:ring-opacity-30 outline-none transition-shadow resize-y"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-error-container border border-[#fca5a5] rounded-xl p-md space-y-1">
              {errors.map((e, i) => (
                <p key={i} className="text-label-sm text-error">
                  {e}
                </p>
              ))}
            </div>
          )}

          {/* Preview */}
          {parsed.length > 0 && <CsvPreview rows={parsed} />}

          {/* Actions */}
          <div className="flex items-center justify-end gap-md pt-lg">
            <button
              onClick={handleCancel}
              className="px-lg py-[10px] rounded-lg text-label-md text-secondary hover:bg-surface-container-high transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleImport}
              disabled={parsed.length === 0 || loading}
              className="px-xl py-[10px] rounded-lg bg-primary text-on-primary text-label-md shadow-sm hover:bg-surface-tint active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Import en cours...
                </>
              ) : (
                `Importer ${parsed.length} ligne${parsed.length > 1 ? 's' : ''}`
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
