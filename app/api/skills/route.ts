import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/middleware/verifyAdmin'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { idToken, name, bio, imageUrl } = body

  const isAdmin = await verifyAdmin(idToken)
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!name || !bio || !imageUrl) {
    return NextResponse.json({ error: '全項目が必須です' }, { status: 400 })
  }

  try {
    await prisma.profile.update({
      where: { id: 1 },
      data: { name, bio, imageUrl },
    })

    // 🔽 フロントでログアウト遷移の判定に使えるフラグを含める
    return NextResponse.json({
      message: 'Profile updated successfully',
      success: true,
    })
  } catch (error) {
    console.error('🔥 プロフィール更新エラー:', error)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
