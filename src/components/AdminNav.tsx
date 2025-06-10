'use client'

import { usePathname } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `text-gray-800 ${pathname === path ? 'font-bold' : ''} hover:opacity-70 transition`

  return (
    <nav className="flex justify-center gap-x-8 py-6 text-base border-b">
      <a href="/admin/profile-editor" className={linkClass('/admin/profile-editor')}>プロフィール編集</a>
      <a href="/admin/skill-editor" className={linkClass('/admin/skill-editor')}>スキル編集</a>
      <a href="/admin/achievements-editor" className={linkClass('/admin/achievements-editor')}>実績編集</a>
    </nav>
  )
}
