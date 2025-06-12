'use client'

import { useState } from 'react'

// スキルの型定義
type Skill = {
  name: string
  description: string
}

export default function SkillEditorPage() {
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState<Skill[]>([{ name: '', description: '' }])
  const [loading, setLoading] = useState(false)

  // スキルを追加
  const addSkill = () => {
    setSkills([...skills, { name: '', description: '' }])
  }

  // スキルの更新
  const updateSkill = (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    const updated = [...skills]
    updated[index][field] = value
    setSkills(updated)
  }

  // 保存処理
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, summary, skills }),
      })
      const data = await res.json()
      alert(data.message || data.error)
    } catch (e) {
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">スキルカテゴリ追加</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="カテゴリ名"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="概要"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <div className="space-y-2">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="スキル名"
              value={skill.name}
              onChange={(e) => updateSkill(idx, 'name', e.target.value)}
            />
            <input
              className="flex-1 border p-2 rounded"
              placeholder="説明"
              value={skill.description}
              onChange={(e) => updateSkill(idx, 'description', e.target.value)}
            />
          </div>
        ))}
        <button onClick={addSkill} className="text-sm text-blue-600 underline">
          + スキルを追加
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '送信中...' : '保存'}
      </button>
    </div>
  )
}
