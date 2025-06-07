// src/features/auth/hooks/useBackendAdminCheck.ts
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminStatus } from '../utils/checkAdminStatus'

type Status = 'loading' | 'authorized' | 'unauthorized'

export const useBackendAdminCheck = () => {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    checkAdminStatus()
      .then(() => {
        setStatus('authorized')
      })
      .catch(() => {
        setStatus('unauthorized')
        router.push('/not-found')
      })
  }, [router])

  return status
}
