'use client'

import { useEffect, useState } from 'react'

export default function ProfileEditorPage() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // 初期データ取得
  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setName(data.name ?? '')
        setBio(data.bio ?? '')
        setImageUrl(data.imageUrl ?? '')
      })
  }, [])

  const handleSave = async () => {
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio, imageUrl }),
    })
    alert('保存しました')
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">プロフィール編集</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="名前"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="自己紹介"
        className="w-full border p-2 rounded h-32"
      />
      <input
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="画像URL"
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        保存
      </button>
    </div>
  )
}
