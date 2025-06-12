// src/routes/__tests__/skillRoutes.test.ts
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import skillsRouter from '../../server/routes/skillRoutes' // 相対パス注意

const app = express()
app.use(express.json())
app.use('/api/skills', skillsRouter)

describe('skillsRouter', () => {
  it('GET /api/skills - should return skills list', async () => {
    const res = await request(app).get('/api/skills')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/skills - valid input should create skill', async () => {
    const res = await request(app)
      .post('/api/skills')
      .send({ name: 'Node.js', description: 'バックエンド' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Node.js')
  })

  it('POST /api/skills - empty body should return 400', async () => {
    const res = await request(app).post('/api/skills').send({})
    expect(res.status).toBe(400)
  })

  it('POST /api/skills - blank name should return 400', async () => {
    const res = await request(app).post('/api/skills').send({ name: '   ' })
    expect(res.status).toBe(400)
  })

  it('POST /api/skills - missing description should succeed', async () => {
    const res = await request(app).post('/api/skills').send({ name: 'React' })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('React')
  })
})

it('POST /api/skills → 400 if name is only spaces', async () => {
  const res = await request(app)
    .post('/api/skills')
    .send({ name: '   ', description: 'only spaces' })
  expect(res.status).toBe(400)
})

it('POST /api/skills → 201 if description is omitted', async () => {
  const res = await request(app)
    .post('/api/skills')
    .send({ name: 'Node.js' }) // descriptionなし
  expect(res.status).toBe(201)
  expect(res.body.name).toBe('Node.js')
})