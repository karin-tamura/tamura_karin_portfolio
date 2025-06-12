// src/server.ts
import express from 'express'
import skillRoutes from './server/routes/skillRoutes'

const app = express()

app.use(express.json())

// ✅ スキルルートを登録
app.use('/api/skills', skillRoutes)

export { app }

// ✅ ESM対応の起動条件
if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
  })
}
