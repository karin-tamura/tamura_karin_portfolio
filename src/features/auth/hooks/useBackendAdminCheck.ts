'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getIdToken, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

type Status = 'loading' | 'authorized' | 'unauthorized'

export const useBackendAdminCheck = () => {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('👤 onAuthStateChanged ユーザー:', user)

      if (!user) {
        console.warn('❌ ログインユーザーなし')
        setStatus('unauthorized')
        // router.push('/not-found') // ← 一時的に無効
        return
      }

      try {
        const idToken = await getIdToken(user)
        console.log('🪙 IDトークン取得:', idToken.slice(0, 10) + '...')

        const res = await fetch('/api/check-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })

        const result = await res.json()
        console.log('🔁 /api/check-admin の結果:', result)

        if (!res.ok || !result.isAdmin) {
          console.warn('🚫 管理者認証失敗')
          setStatus('unauthorized')
          // router.push('/not-found') // ← 一時的に無効
          return
        }

        console.log('✅ 管理者認証成功')
        setStatus('authorized')
      } catch (err) {
        console.error('⚠️ 管理者チェックエラー:', err)
        setStatus('unauthorized')
        // router.push('/not-found') // ← 一時的に無効
      }
    })

    return () => unsubscribe()
  }, [router])

  return status
}
