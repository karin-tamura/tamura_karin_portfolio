// src/index.ts
import express from 'express'
import adminRouter from './routes/admin'
import authRouter from './routes/auth' 

const app = express()

app.use(express.json()) // ← JSONボディパーサー
app.use('/api/admin', adminRouter)
app.use('/api/token', authRouter) // ← トークン検証ルート

app.listen(3001, () => {
  console.log('APIサーバー起動中 → http://localhost:3001')
})
