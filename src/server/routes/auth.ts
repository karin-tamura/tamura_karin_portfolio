import { Router } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { asyncHandler } from '../../middleware/asyncHandler'

const router = Router()

router.post(
  '/verify',
  asyncHandler(async (req, res) => {
    const token = req.body.token

    if (!token) {
      return res.status(400).json({ message: 'Token is required' })
    }

    const decoded = await getAuth().verifyIdToken(token)

    if (decoded.admin === true) {
      return res.status(200).json({
        uid: decoded.uid,
        email: decoded.email,
      })
    } else {
      return res.status(403).json({ message: 'Access denied: not admin' })
    }
  })
)

export default router
