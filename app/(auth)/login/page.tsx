'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-md">
      <main className="w-full max-w-[400px] flex flex-col items-center">
        {/* App name */}
        <div className="mb-xl text-center">
          <h1 className="text-headline-md font-semibold text-on-surface tracking-tight mb-xs">
            plat-analyse
          </h1>
          <p className="text-body-sm text-secondary">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label
                htmlFor="email"
                className="text-label-sm text-on-surface-variant uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-label-sm text-on-surface-variant uppercase tracking-wider"
                >
                  Mot de passe
                </label>
                <a href="#" className="text-label-sm text-primary hover:underline">
                  Oublié ?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-md py-sm border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-label-sm text-error bg-error-container rounded-lg px-md py-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-xs w-full bg-primary-container text-on-primary py-[11px] rounded-lg text-label-md hover:bg-surface-tint transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 flex items-center justify-center gap-sm"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <p className="mt-lg text-body-sm text-secondary">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Créer un compte
          </Link>
        </p>
      </main>
    </div>
  )
}
