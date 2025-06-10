import { NextRequest, NextResponse } from 'next/server'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// 初期化（Base64 → JSON）
if (!getApps().length) {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  if (!base64) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_BASE64')

  const jsonStr = Buffer.from(base64, 'base64').toString('utf-8')
  const serviceAccount = JSON.parse(jsonStr)

  initializeApp({
    credential: cert(serviceAccount),
  })
}

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()
    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 })
    }

    const decodedToken = await getAuth().verifyIdToken(idToken)
    const isAdmin = decodedToken.uid === process.env.NEXT_PUBLIC_ADMIN_UID

    return NextResponse.json({ isAdmin })
  } catch (error) {
    console.error('🔥 認証エラー:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
