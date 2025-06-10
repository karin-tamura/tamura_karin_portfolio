'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative px-6 py-16">
      {/* 🔹 ナビゲーション（右上固定） */}
      <div className="absolute top-4 right-6 flex space-x-6 text-sm text-gray-700">
        <Link href="/" className="hover:underline font-medium">ホーム</Link>
        <Link href="/contact" className="hover:underline">お問い合わせ</Link>
        <Link href="/login" className="hover:underline">管理画面</Link>
      </div>

      {/* 🔹 中央キャッチコピー */}
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-gray-300 pb-1">
          社会学から創る未来サービス
        </h1>
      </div>
    </section>
  )
}
