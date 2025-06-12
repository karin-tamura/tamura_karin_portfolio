import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/middleware/verifyAdmin'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { idToken, title, content, year } = body

  const isAdmin = await verifyAdmin(idToken)
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!title || !content || !year) {
    return NextResponse.json({ error: '全項目必須です' }, { status: 400 })
  }

  try {
    await prisma.achievement.create({
      data: {
        title,
        content,
        year: Number(year),
      },
    })

    // 👇 追加：成功時に明示的な成功フラグを返す
    return NextResponse.json({ message: 'Achievement added successfully', success: true })
  } catch (error) {
    console.error('🔥 実績追加エラー:', error)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
