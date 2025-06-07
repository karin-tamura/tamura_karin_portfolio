'use client'

import { useState } from "react"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: Timestamp.now()
      })
      setSent(true)
    } catch (error) {
      console.error("Firestoreへの送信に失敗:", error)
    }
  }

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* 左側：連絡先 */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold tracking-widest mb-4">CONTACT</h2>
          <p className="text-gray-700 text-sm mb-1">hana.ringo.yuzu.ringo@gmail.com</p>
          <p className="text-gray-700 text-sm">Tel: 080-8556-0507</p>
        </div>

        {/* 右側：フォーム */}
        <form onSubmit={handleSubmit} className="md:w-2/3 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">お名前</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">メールアドレス *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">題名</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">メッセージを入力…</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-400 px-3 py-2"
            />
          </div>

          {sent && (
            <p className="text-teal-500 text-sm">送信ありがとうございました</p>
          )}

          <button type="submit" className="bg-gray-800 text-white px-6 py-2">
            送信する
          </button>

          {/* ホームに戻る */}
          <div className="mt-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← ホームに戻る
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
