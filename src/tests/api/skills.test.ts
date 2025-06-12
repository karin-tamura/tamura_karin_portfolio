import request from 'supertest'
import { app } from '../../server' // ← Expressアプリを export している場合
import { describe, it, expect } from 'vitest'

describe('GET /api/skills', () => {
  it('should return skills list', async () => {
    const res = await request(app).get('/api/skills')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

describe('POST /api/skills', () => {
  it('should return 400 if invalid body', async () => {
    const res = await request(app).post('/api/skills').send({})
    expect(res.status).toBe(400)
  })
})
