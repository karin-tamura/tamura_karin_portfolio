import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Firebase Admin 初期化（再初期化防止）
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('__session')?.value
  const { pathname } = req.nextUrl

  console.log(`[middleware] Accessing ${pathname}`)

  if (!token) {
    console.warn('[middleware] No token found. Redirecting to /not-found')
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  try {
    const decoded = await getAuth().verifyIdToken(token)
    console.log(`[middleware] Authenticated UID: ${decoded.uid}`)
    return NextResponse.next()
  } catch (error) {
    console.error('[middleware] Invalid token:', error)
    return NextResponse.redirect(new URL('/not-found', req.url))
  }
}

// 適用パス設定
export const config = {
  matcher: ['/admin/:path*'],
}
