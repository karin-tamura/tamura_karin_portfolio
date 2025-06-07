'use client'

import Link from "next/link"

export function Header() {
  return (
    <header className="px-6 py-4 border-b border-gray-200 text-sm font-light">
      <div className="flex justify-end space-x-12 pr-10">
        <Link
          href="/"
          className="relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gray-800 after:scale-x-100 after:origin-left font-medium"
        >
          ホーム
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 hover:underline hover:underline-offset-4"
        >
          お問い合わせ
        </Link>
        <Link
          href="/login"
          className="text-gray-700 hover:underline hover:underline-offset-4"
        >
          管理画面
        </Link>
      </div>
    </header>
  )
}
