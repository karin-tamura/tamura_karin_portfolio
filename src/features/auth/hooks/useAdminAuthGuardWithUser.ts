'use client'

import { useEffect, useState } from 'react'
import { useFirebaseAuth } from './useFirebaseAuth'
import { isAdmin } from '../../shared/utils/isAdmin'

export function useAdminAuthGuardWithUser() {
  const user = useFirebaseAuth()
  const [authStatus, setAuthStatus] = useState<'loading' | 'unauthorized' | 'authorized'>('loading')

  useEffect(() => {
    if (user === undefined) return

    if (!user) {
      setAuthStatus('unauthorized')
    } else if (!isAdmin(user.uid)) {
      setAuthStatus('unauthorized')
    } else {
      setAuthStatus('authorized')
    }
  }, [user])

  return { authStatus, user }
}
