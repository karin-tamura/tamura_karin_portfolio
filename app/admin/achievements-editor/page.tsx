'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Achievement = {
  date: string
  title: string
}

export default function AchievementsEditorPage() {
  const router = useRouter()

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    if (!date.trim() || !title.trim()) return
    const newItem: Achievement = {
      date: date.trim(),
      title: title.trim(),
    }
    setAchievements([...achievements, newItem])
    setDate('')
    setTitle('')
    router.push('/logout') // ✅ 保存後にログアウトページへ
  }

  const handleDelete = (index: number) => {
    const updated = [...achievements]
    updated.splice(index, 1)
    setAchievements(updated)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-6 border-b pb-2 text-center">実績編集</h1>

      {/* 一覧表示 */}
      <div className="space-y-6 mb-10">
        {achievements.map((item, i) => (
          <div key={i} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.date}</p>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-500 text-sm hover:underline"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 実績追加フォーム */}
      <div className="space-y-4 border-t pt-6">
        <div>
          <label className="block text-sm font-medium mb-1">日付（例: 2025 Sep.）</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: 2025 Sep."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">タイトル</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: Ms.Engineer 卒業"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition"
        >
          保存
        </button>
      </div>
    </div>
  )
}
