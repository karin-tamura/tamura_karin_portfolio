// app/logout/page.tsx
'use client'

import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    signOut(auth).then(() => {
      router.push('/login')
    })
  }, [router])

  return <p>ログアウト中...</p>
}
