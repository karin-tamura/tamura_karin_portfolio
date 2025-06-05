'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFirebaseAuth } from '@/features/auth/hooks/useFirebaseAuth'
import { isAdmin } from '@/features/auth/utils/isAdmin'

export default function AdminDashboardPage() {
  const router = useRouter()
  const user = useFirebaseAuth()
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    if (user === undefined) return // Firebaseの初期化待ち

    if (!user) {
      router.push('/') // 未ログインユーザーはトップへ
    } else if (!isAdmin(user.uid)) {
      setAccessDenied(true) // 管理者でない → 拒否メッセージ表示へ
    } else {
      setLoading(false) // 管理者 → ページ表示
    }
  }, [user, router])

  const handleGuestAccess = () => {
    router.push('/')
  }

  const handleRetryLogin = () => {
    router.push('/login')
  }

  if (loading) return null

  if (accessDenied) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4 px-4">
        <p className="text-lg font-semibold text-red-600">
          ログイン情報が一致しません
        </p>
        <p className="text-sm">再度入力するか、ゲストとして閲覧するかを選択してください。</p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleGuestAccess}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ゲストとして閲覧する
          </button>
          <button
            onClick={handleRetryLogin}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
          >
            再度入力する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold">管理ダッシュボード</h1>
      <p>ようこそ、管理者の方。</p>
    </div>
  )
}
