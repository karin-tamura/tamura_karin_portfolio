import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../server/app'

const endpoint = '/api/skills'

describe('Skills API 統合テスト', () => {
  const testSkillName = 'TypeScript'

  it('POST 正常系: スキルを追加して 200 or 201 を返す', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ name: testSkillName })

    expect([200, 201]).toContain(res.status)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', testSkillName)
  })

  it('POST 異常系①: 空オブジェクト {} → 400', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({})

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST 異常系②: 空白 name: "   " → 400', async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ name: '   ' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST 異常系③: 重複 name → 200 or 409', async () => {
    await request(app)
      .post(endpoint)
      .send({ name: 'DuplicateSkill' })

    const res = await request(app)
      .post(endpoint)
      .send({ name: 'DuplicateSkill' })

    expect([200, 409]).toContain(res.status)
  })

  it('GET 正常系: スキル一覧を取得して配列で返す', async () => {
    const res = await request(app).get(endpoint)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('name')
  })
})
