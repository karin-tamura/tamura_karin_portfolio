// src/routes/admin.ts
import * as express from 'express'
import { verifyAdminToken } from '../middleware/auth'

const router = express.Router()

// 管理者のみがアクセスできるエンドポイント
router.get('/dashboard-data', verifyAdminToken, (req, res) => {
  res.json({
    message: '管理者用ダッシュボードデータ ',
    uid: req.user?.uid, // 型定義済み
  })
})

export default router
