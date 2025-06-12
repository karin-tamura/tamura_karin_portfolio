import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { cert, getApps, initializeApp } from 'firebase-admin/app'

// Firebase Admin 初期化（複数回防止）
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

// Express の Request 型を拡張して user を追加
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; [key: string]: any }
    }
  }
}

// Express 用 verifyAdmin ミドルウェア
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const idToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null

    if (!idToken) {
      res.status(401).json({ error: 'Missing token' })
      return
    }

    const decodedToken = await getAuth().verifyIdToken(idToken)

    if (decodedToken.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      res.status(403).json({ error: 'Forbidden: Not admin' })
      return
    }

    req.user = decodedToken
    next()
  } catch (error) {
    console.error('[verifyAdmin] Firebase Auth エラー:', error)
    res.status(401).json({ error: 'Unauthorized' })
  }
}
