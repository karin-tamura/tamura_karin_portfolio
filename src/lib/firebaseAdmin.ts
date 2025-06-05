// src/lib/firebaseAdmin.ts
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Firebase Admin SDK の構成（環境変数から取得）
const adminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
}

// Firebase Admin アプリの初期化（再利用を考慮）
const adminApp = getApps().length === 0 ? initializeApp(adminConfig) : getApp()

// 認証オブジェクトをエクスポート
export const adminAuth = getAuth(adminApp)
