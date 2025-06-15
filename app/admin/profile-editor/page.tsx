'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileEditorPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('プロフィールが保存されました')
    router.push('/logout')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-6 border-b pb-2 text-center">プロフィール編集</h1>

      {/* プロフィール画像 */}
      <div className="flex flex-col items-center mb-10">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="プロフィール画像"
            className="w-32 h-32 object-cover rounded-full border"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm border">
            No Image
          </div>
        )}

        <label className="mt-4 text-sm font-medium">プロフィール画像</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: 田村華鈴"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">紹介文</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: 地域と女性の未来をデザインする、元公務員エンジニア。"
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  )
}
