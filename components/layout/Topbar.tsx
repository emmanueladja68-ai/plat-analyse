'use client'

import { Bell, Settings, Search } from 'lucide-react'

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] h-16 flex justify-between items-center px-lg bg-surface-container-lowest border-b border-outline-variant z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-headline-sm text-on-surface">{title}</h2>
      </div>

      <div className="flex items-center gap-md">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-surface-container px-3 py-[6px] rounded-lg border border-outline-variant gap-2">
          <Search size={16} strokeWidth={1.5} className="text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent border-none outline-none text-body-sm w-48 text-on-surface placeholder:text-secondary"
          />
        </div>

        {/* Bell */}
        <button className="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors">
          <Bell size={20} strokeWidth={1.5} />
        </button>

        {/* Settings */}
        <button className="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors">
          <Settings size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
