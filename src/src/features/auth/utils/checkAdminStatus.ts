// src/features/auth/utils/checkAdminStatus.ts
import { getIdToken } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const checkAdminStatus = async () => {
  const user = auth.currentUser
  if (!user) throw new Error('未ログインです')

  const token = await getIdToken(user)

  const res = await fetch('http://localhost:3001/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || '認証に失敗しました')
  }

  return data // { uid, email }
}
