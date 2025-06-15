'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Skill = {
  name: string
  description: string
}

type SkillGroup = {
  category: string
  summary: string
  skills: Skill[]
}

export default function SkillEditorPage() {
  const router = useRouter()

  const [groups, setGroups] = useState<SkillGroup[]>([])

  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [skillName, setSkillName] = useState('')
  const [skillDesc, setSkillDesc] = useState('')

  const handleAddSkillGroup = () => {
    if (!category.trim() || !summary.trim() || !skillName.trim()) return
    const newGroup: SkillGroup = {
      category: category.trim(),
      summary: summary.trim(),
      skills: [{ name: skillName.trim(), description: skillDesc.trim() }]
    }
    setGroups([...groups, newGroup])
    setCategory('')
    setSummary('')
    setSkillName('')
    setSkillDesc('')
    router.push('/logout') // ✅ 保存後にログアウトへ
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-6 border-b pb-2 text-center">スキル編集</h1>

      {/* 一覧表示 */}
      <div className="space-y-6 mb-10">
        {groups.map((group, i) => (
          <div key={i} className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
              <span>🛠️ {group.category}</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">{group.summary}</p>
            <ul className="space-y-1">
              {group.skills.map((skill, j) => (
                <li key={j}>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 追加フォーム */}
      <div className="space-y-4 border-t pt-6">
        <div>
          <label className="block text-sm font-medium mb-1">カテゴリ名</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: フロントエンド"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">カテゴリの説明</label>
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: React / Next.js を中心にUI構築"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">スキル名</label>
          <input
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: TypeScript"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">スキルの説明</label>
          <textarea
            value={skillDesc}
            onChange={(e) => setSkillDesc(e.target.value)}
            rows={2}
            className="w-full border px-3 py-2 rounded"
            placeholder="例: 型安全なフロントエンド開発を支える言語"
          />
        </div>
        <button
          onClick={handleAddSkillGroup}
          className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition"
        >
          保存
        </button>
      </div>
    </div>
  )
}
