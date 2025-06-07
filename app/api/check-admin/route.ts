// app/api/check-admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { initializeApp, cert, getApps } from 'firebase-admin/app'

// Firebase Admin SDK の初期化（環境変数からサービスアカウント取得）
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()

    const decodedToken = await getAuth().verifyIdToken(idToken)
    const isAdmin = decodedToken.uid === process.env.NEXT_PUBLIC_ADMIN_UID

    return NextResponse.json({ isAdmin })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
