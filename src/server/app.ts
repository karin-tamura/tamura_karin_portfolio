import express from 'express'
import skillsRouter from './routes/skillRoutes'
import achievementsRouter from './routes/achievementRoutes' 

const app = express()

app.use(express.json())

// APIルートをマウント
app.use('/api/skills', skillsRouter)
app.use('/api/achievements', achievementsRouter) 

export default app
