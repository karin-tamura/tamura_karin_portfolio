// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // 任意のロジック（ログインチェック、リダイレクトなど）
  return NextResponse.next()
}

// 適用するパスを限定したい場合
export const config = {
  matcher: ['/admin/:path*'], // 管理ページなどにだけ適用する例
}
