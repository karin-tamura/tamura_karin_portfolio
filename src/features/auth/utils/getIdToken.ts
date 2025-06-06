// src/features/auth/utils/getIdToken.ts
import { auth } from '@/lib/firebase'

export const getIdToken = async (): Promise<string | null> => {
  const user = auth.currentUser
  if (!user) return null
  return await user.getIdToken()
}
