'use client'

import { useBackendAdminCheck } from '@/features/auth/hooks/useBackendAdminCheck'

export default function AdminDashboardPage() {
  const status = useBackendAdminCheck()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">管理ダッシュボード</h1>
      <p className="text-sm text-gray-500 mt-2">Express 経由で管理者確認済み</p>
    </div>
  )
}
