// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'

export async function verifyAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const idToken = req.headers.authorization?.split('Bearer ')[1]
  if (!idToken) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken)

    if (decodedToken.admin === true) {
      req.user = decodedToken
      return next()
    } else {
      return res.status(403).json({ message: 'Access denied: not admin' })
    }
  } catch (error) {
    console.error('[verifyAdminToken] Error verifying token:', error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
