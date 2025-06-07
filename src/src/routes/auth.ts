// src/routes/auth.ts
import { Router } from 'express'
import { getAuth } from 'firebase-admin/auth'

const router = Router()

router.post('/verify', async (req, res) => {
  const token = req.body.token

  if (!token) {
    return res.status(400).json({ message: 'Token is required' })
  }

  try {
    const decoded = await getAuth().verifyIdToken(token)

    if (decoded.admin === true) {
      return res.status(200).json({
        uid: decoded.uid,
        email: decoded.email,
      })
    } else {
      return res.status(403).json({ message: 'Access denied: not admin' })
    }
  } catch (err) {
    console.error('[POST /api/auth/verify] Failed to verify token:', err)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
})

export default router
