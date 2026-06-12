import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'plat-analyse',
  description: 'Optimisez votre gestion financière avec précision.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full bg-surface text-on-surface antialiased">{children}</body>
    </html>
  )
}
