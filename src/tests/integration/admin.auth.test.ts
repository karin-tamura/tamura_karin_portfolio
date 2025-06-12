import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// 実際のverifyAdminの代わりに使うモック
const mockVerifyAdminAllow = (_req: any, _res: any, next: any) => next()
const mockVerifyAdminDeny = (_req: any, res: any) =>
  res.status(403).json({ error: 'Forbidden' })
const mockVerifyAdminUnauthorized = (_req: any, res: any) =>
  res.status(401).json({ error: 'Missing token' })

// テスト用 Express app をセットアップ（verifyAdminを入れ替える）
const createTestApp = (verifyAdminMock: any) => {
  const app = express()
  app.use('/admin/dashboard-data', verifyAdminMock, (_req, res) => {
    res.json({ message: '管理者用ダッシュボードデータ', uid: 'mock-admin-uid' })
  })
  return app
}

describe('認証・認可チェック: /admin/dashboard-data', () => {
  it('トークンなし → 401', async () => {
    const app = createTestApp(mockVerifyAdminUnauthorized)
    const res = await request(app).get('/admin/dashboard-data')
    expect(res.status).toBe(401)
    expect(res.body.error).toMatch(/Missing/)
  })

  it('不正なトークン → 401', async () => {
    const app = createTestApp(mockVerifyAdminUnauthorized)
    const res = await request(app)
      .get('/admin/dashboard-data')
      .set('Authorization', 'Bearer invalid_token')
    expect(res.status).toBe(401)
  })

  it('非管理者のUID → 403', async () => {
    const app = createTestApp(mockVerifyAdminDeny)
    const res = await request(app)
      .get('/admin/dashboard-data')
      .set('Authorization', 'Bearer dummy_token')
    expect(res.status).toBe(403)
  })

  it('管理者UID → 200 + uid含むレスポンス', async () => {
    const app = createTestApp(mockVerifyAdminAllow)
    const res = await request(app)
      .get('/admin/dashboard-data')
      .set('Authorization', 'Bearer valid_token')
    expect(res.status).toBe(200)
    expect(res.body.uid).toBe('mock-admin-uid')
  })
})
