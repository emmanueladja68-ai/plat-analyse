'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Upload, CreditCard, User } from 'lucide-react'

const ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/importer', label: 'Importer', icon: Upload },
  { href: '/depenses', label: 'Dépenses', icon: CreditCard },
  { href: '/profil', label: 'Profil', icon: User },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 h-16 flex justify-around items-center bg-surface-container-lowest border-t border-outline-variant md:hidden">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-[2px] transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-secondary'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-label-sm">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
