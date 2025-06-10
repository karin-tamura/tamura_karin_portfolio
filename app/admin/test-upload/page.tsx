'use client'

import { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>('')

  const handleUpload = async () => {
    if (!file) return
    const fileRef = ref(storage, `test-uploads/${file.name}`)
    const snapshot = await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    setUrl(downloadURL)
    console.log('Download URL:', downloadURL)
  }

  return (
    <div className="p-6 space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        アップロード
      </button>

      {url && (
        <div>
          <p className="text-green-600">アップロード成功！</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            アップロードされた画像を見る
          </a>
        </div>
      )}
    </div>
  )
}
