import { Router, Request, Response } from 'express'
import { verifyAdmin } from '../../middleware/verifyAdmin'
import { asyncHandler } from '../../middleware/asyncHandler'

const router = Router()

router.get(
  '/dashboard-data',
  verifyAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      message: '管理者用ダッシュボードデータ',
      uid: req.user?.uid, // ✅ 型エラーなし
    })
  })
)

export default router
