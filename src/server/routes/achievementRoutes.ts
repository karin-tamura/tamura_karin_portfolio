import { Router } from 'express'

const router = Router()
const achievements: { id: number; year: number; description: string }[] = []
let idCounter = 1

router.get('/', (_req, res) => {
  res.json(achievements)
})

router.post('/', (req, res) => {
  const { year, description } = req.body
  const now = new Date().getFullYear()

  if (!year || isNaN(Number(year)) || Number(year) > now) {
    res.status(400).json({ error: 'Invalid year' })
    return
  }

  if (!description || description.trim() === '') {
    res.status(400).json({ error: 'Invalid description' })
    return
  }

  const newItem = {
    id: idCounter++,
    year: Number(year),
    description: description.trim(),
  }

  achievements.push(newItem)
  res.status(201).json(newItem)
})

export default router
