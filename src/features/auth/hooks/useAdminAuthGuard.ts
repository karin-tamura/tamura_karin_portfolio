'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFirebaseAuth } from '@/features/auth/hooks/useFirebaseAuth'
import { isAdmin } from '@/features/shared/utils/isAdmin'

// 外部型に切り出してもOK
export type AuthStatus = 'loading' | 'unauthorized' | 'authorized'

export const useAdminAuthGuard = (): { authStatus: AuthStatus; user: ReturnType<typeof useFirebaseAuth> } => {
  const router = useRouter()
  const user = useFirebaseAuth()
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    if (user === undefined) return // Firebase 初期化中

    if (!user) {
      router.push('/') // 未ログイン → トップへ
    } else if (!isAdmin(user.uid)) {
      setAuthStatus('unauthorized')
    } else {
      setAuthStatus('authorized')
    }
  }, [user, router])

  return { authStatus, user }
}
