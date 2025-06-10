'use client'

import { useState } from 'react'

export default function ProfileEditor() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 保存処理（Firestore連携など）
    alert('保存されました')
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto text-center">
      {/* タイトル */}
      <h1 className="text-xl font-semibold mb-6 border-b-2 inline-block border-gray-500 pb-1">
        プロフィール編集
      </h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">プロフィール画像</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">紹介文</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* ボタン */}
        <div className="text-center pt-4">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition">
            保存する
          </button>
        </div>
      </form>
    </div>
  )
}
