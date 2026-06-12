'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Upload, CreditCard, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/importer', label: 'Importer', icon: Upload },
  { href: '/depenses', label: 'Dépenses', icon: CreditCard },
]

export default function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant z-40">
      {/* Header */}
      <div className="px-lg py-xl">
        <h1 className="text-headline-sm font-bold text-on-surface">plat-analyse</h1>
        <p className="text-body-sm text-secondary mt-xs truncate">{email || 'user@example.com'}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-sm space-y-[2px]">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-surface-container-high text-on-surface font-medium border-l-2 border-primary pl-[14px]'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="text-body-sm">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-lg border-t border-outline-variant">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-secondary hover:bg-surface-container rounded-lg transition-colors"
        >
          <LogOut size={20} strokeWidth={1.5} />
          <span className="text-body-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
