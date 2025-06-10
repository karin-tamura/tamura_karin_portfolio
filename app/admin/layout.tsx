import AdminNav from '@/components/AdminNav' 
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNav />
      <main className="px-6 py-10 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}
