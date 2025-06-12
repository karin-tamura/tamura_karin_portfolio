import { Router } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler'

const router = Router()

const skills = [{ id: 1, name: 'TypeScript', description: '静的型付きのJavaScript' }]

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.status(200).json(skills) // ✅ return を省略（void型に適合）
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (!name || name.trim() === '' || name.length > 50) {
      res.status(400).json({ error: 'Invalid skill name' }) // ✅ return を省略
      return
    }

    if (description && description.length > 200) {
      res.status(400).json({ error: 'Invalid description' }) // ✅ return を省略
      return
    }

    const newSkill = {
      id: skills.length + 1,
      name: name.trim(),
      description,
    }

    skills.push(newSkill)

    res.status(201).json(newSkill) 
  })
)

export default router
