'use client'

import { useEffect, useState } from 'react'
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { storage, db } from '@/lib/firebase'

export function ProfileForm() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 🔹 初期値読み込み
  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'profile', 'main')
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        const data = snap.data()
        setName(data.name || '')
        setBio(data.bio || '')
        setPreview(data.imageUrl || null)
      }
    }
    fetchProfile()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    if (selected) {
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      let imageUrl = preview || ''

      if (file) {
        const imageRef = ref(storage, `profile/${file.name}`)
        const snapshot = await uploadBytes(imageRef, file)
        imageUrl = await getDownloadURL(snapshot.ref)
      }

      await setDoc(doc(db, 'profile', 'main'), {
        name,
        bio,
        imageUrl,
        updatedAt: new Date(),
      })

      setSuccess(true)
    } catch (err) {
      console.error('プロフィール保存エラー:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-semibold">名前</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-1 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">自己紹介</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border px-3 py-1 w-full"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-semibold">プロフィール画像</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 w-32 h-32 object-cover rounded-full"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '保存中…' : '保存'}
      </button>

      {success && <p className="text-green-600 mt-2">保存しました</p>}
    </form>
  )
}
