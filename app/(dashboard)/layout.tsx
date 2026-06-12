import Sidebar from '@/components/layout/Sidebar'
import MobileNav from '@/components/layout/MobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-low">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-[240px]">{children}</div>
    </div>
  )
}
