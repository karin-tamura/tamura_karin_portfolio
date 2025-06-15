import { Router, Request, Response } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { asyncHandler } from '../../middleware/asyncHandler'

const router = Router()

router.post(
  '/verify',
  asyncHandler(async (req: Request, res: Response) => {
    const token = req.body.token

    if (!token) {
      res.status(400).json({ message: 'Token is required' })
      return
    }

    try {
      const decoded = await getAuth().verifyIdToken(token)

      if (decoded.admin === true) {
        res.status(200).json({
          uid: decoded.uid,
          email: decoded.email,
        })
      } else {
        res.status(403).json({ message: 'Access denied: not admin' })
      }
    } catch (error) {
      res.status(401).json({ message: 'Invalid token', error })
    }
  })
)

export default router
