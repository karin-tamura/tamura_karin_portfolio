// src/lib/middleware/verifyAdmin.ts

import { getAuth } from 'firebase-admin/auth'
import { cert, getApps, initializeApp } from 'firebase-admin/app'

// Firebase Admin SDK 初期化
if (!getApps().length) {
  const decoded = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, 'base64').toString('utf-8')
  )

  initializeApp({
    credential: cert({
      projectId: decoded.project_id,
      clientEmail: decoded.client_email,
      privateKey: decoded.private_key.replace(/\\n/g, '\n'),
    }),
  })
}

// ✅ 修正版 verifyAdmin: idToken を直接受け取る
export async function verifyAdmin(idToken: string): Promise<boolean> {
  try {
    if (!idToken) return false

    const decodedToken = await getAuth().verifyIdToken(idToken)
    return decodedToken.uid === process.env.NEXT_PUBLIC_ADMIN_UID
  } catch (error) {
    console.error('🔥 verifyAdmin エラー:', error)
    return false
  }
}
