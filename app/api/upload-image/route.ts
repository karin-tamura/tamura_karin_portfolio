import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { mkdirSync } from 'fs'
import { NextRequest } from 'next/server'

// 保存先ディレクトリ
const uploadDir = path.join(process.cwd(), 'public/uploads')
mkdirSync(uploadDir, { recursive: true })

// Edge API設定
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file || !file.name) {
      return NextResponse.json({ error: '画像ファイルが必要です' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadDir, fileName)

    await fs.writeFile(filePath, buffer)

    // 🔽 ここでログアウト誘導用のフラグを返す
    return NextResponse.json({
      imageUrl: `/uploads/${fileName}`,
      success: true,
      message: 'アップロード成功',
    })
  } catch (err) {
    console.error('🔥 アップロードエラー:', err)
    return NextResponse.json({ error: '画像アップロード失敗' }, { status: 500 })
  }
}
