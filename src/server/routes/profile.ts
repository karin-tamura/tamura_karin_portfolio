import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

export const getProfile = async (_req: Request, res: Response) => {
  const profile = await prisma.profile.findFirst()
  res.json(profile) // ✅ return は付けない
}

export const updateProfile = async (req: Request, res: Response) => {
  const { name, imagePath } = req.body

  const updated = await prisma.profile.update({
    where: { id: 1 },
    data: { name, imagePath },
  })

  res.json(updated) // ✅ return は付けない
}
