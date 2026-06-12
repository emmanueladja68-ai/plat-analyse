'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-md"
      style={{ background: 'linear-gradient(135deg, #faf8ff 60%, #dbe1ff 100%)' }}
    >
      {/* Brand */}
      <div className="mb-xl text-center">
        <h1 className="text-headline-md font-extrabold tracking-tight text-primary">
          plat-analyse
        </h1>
        <p className="text-body-sm text-secondary mt-xs">
          Optimisez votre gestion financière avec précision.
        </p>
      </div>

      {/* Card */}
      <main className="w-full max-w-[400px] bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="mb-lg">
          <h2 className="text-headline-sm text-on-surface">Créer un compte</h2>
          <p className="text-body-sm text-on-surface-variant">
            Remplissez les informations ci-dessous pour commencer.
          </p>
        </div>

        {success ? (
          <div className="text-center py-lg">
            <p className="text-label-md text-primary font-medium">
              Compte créé ! Vérifiez vos emails puis connectez-vous.
            </p>
          </div>
        ) : (
          <form className="space-y-md" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-xs" htmlFor="reg-email">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} strokeWidth={1.5} />
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.fr"
                  className="w-full pl-9 pr-4 py-[10px] bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-xs" htmlFor="reg-password">
                MOT DE PASSE
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} strokeWidth={1.5} />
                <input
                  id="reg-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-[10px] bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-xs" htmlFor="reg-confirm">
                CONFIRMER LE MOT DE PASSE
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} strokeWidth={1.5} />
                <input
                  id="reg-confirm"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-[10px] bg-surface-container-low border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-label-sm text-error bg-error-container rounded-lg px-md py-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-lg bg-primary text-on-primary py-3 px-4 rounded-lg text-label-md hover:bg-surface-tint transition-colors active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Création...
                </>
              ) : (
                <>Créer mon compte →</>
              )}
            </button>
          </form>
        )}

        <p className="mt-md text-label-sm text-center text-on-secondary-container">
          En créant un compte, vous acceptez nos{' '}
          <a href="#" className="text-primary hover:underline">
            Conditions d&apos;utilisation
          </a>
          .
        </p>

        <div className="mt-xl pt-lg border-t border-outline-variant text-center">
          <span className="text-body-sm text-secondary">Déjà un compte ?</span>{' '}
          <Link href="/login" className="text-label-md text-primary font-semibold hover:text-surface-tint">
            Se connecter
          </Link>
        </div>
      </main>

      <footer className="mt-xl text-center">
        <p className="text-label-sm text-outline">© 2024 plat-analyse. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
