// src/features/auth/hooks/useBackendAdminCheck.ts
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
      if (!user) {
        setStatus('unauthorized')
        router.push('/not-found')
        return
      }

      try {
        const idToken = await getIdToken(user)
        const res = await fetch('/api/check-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })

        if (!res.ok) throw new Error('認証失敗')

        const result = await res.json()
        if (result.isAdmin) {
          setStatus('authorized')
        } else {
          setStatus('unauthorized')
          router.push('/not-found')
        }
      } catch (err) {
        console.error('管理者チェックエラー:', err)
        setStatus('unauthorized')
        router.push('/not-found')
      }
    })

    return () => unsubscribe()
  }, [router])

  return status
}
