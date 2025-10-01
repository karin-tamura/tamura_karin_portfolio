// app/api/achievements/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/middleware/verifyAdmin'

// ✅ Prismaを使うのでNodeランタイムを明示
export const runtime = 'nodejs'

// ✅ 静的化しない（ビルド時に評価させない）
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
  try {
    const { idToken, title, content, year } = await req.json().catch(() => ({} as any))

    // 認可
    const isAdmin = await verifyAdmin(idToken)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // バリデーション
    if (!title || !content || year === undefined || year === null) {
      return NextResponse.json({ error: '全項目必須です' }, { status: 400 })
    }

    // 作成
    await prisma.achievement.create({
      data: { title, content, year: Number(year) },
    })

    return NextResponse.json({ message: 'Achievement added successfully', success: true })
  } catch (error) {
    console.error('[POST /api/achievements] error:', error)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
