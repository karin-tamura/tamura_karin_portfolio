// src/tests/integration/achievements-api.spec.ts
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../server/app'

const endpoint = '/api/achievements'

describe('Achievements API 統合テスト', () => {
  it('POST 正常系: 年度＋内容を送信し 201 を返す', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ year: 2022, description: 'Webアプリ制作' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject({
      year: 2022,
      description: 'Webアプリ制作',
    })
  })

  it('POST 異常系: 年度が未来 → 400', async () => {
    const futureYear = new Date().getFullYear() + 5
    const res = await request(app)
      .post(endpoint)
      .send({ year: futureYear, description: '未来の実績' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST 異常系: 年度が文字列 → 400', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ year: '文字列', description: 'タイプミス' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST 異常系: 年度が空白 → 400', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ year: '', description: '空欄エラー' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('GET 正常系: 実績一覧を取得して配列で返す', async () => {
    const res = await request(app).get(endpoint)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('year')
    expect(res.body[0]).toHaveProperty('description')
  })
})
