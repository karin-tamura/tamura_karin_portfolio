// src/controllers/profileController.ts

import { Request, Response } from 'express'
import { prisma } from '../prisma/client'

// GET /api/profile
export const getProfile = async (_req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } })
    if (!profile) return res.status(404).json({ error: 'Profile not found' })
    res.json(profile)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

// POST /api/profile
export const updateProfile = async (req: Request, res: Response) => {
  const { name, bio, imageUrl, imagePath } = req.body

  if (!name || !bio || !imageUrl) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await prisma.profile.upsert({
      where: { id: 1 },
      update: { name, bio, imageUrl, imagePath },
      create: { id: 1, name, bio, imageUrl, imagePath },
    })
    res.json({ message: 'Profile updated successfully' })
  } catch (err) {
    console.error('🔥 プロフィール更新エラー:', err)
    res.status(500).json({ error: 'Server error' })
  }
}
