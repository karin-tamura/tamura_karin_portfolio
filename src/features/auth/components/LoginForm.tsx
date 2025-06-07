'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid
      console.log('✅ ログイン成功 UID:', uid)
      console.log('🔐 環境変数UID:', process.env.NEXT_PUBLIC_ADMIN_UID)

      router.push('/admin')
    } catch (err) {
      console.error('❌ ログイン失敗:', err)
      router.push('/not-found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-2 w-72 mx-auto mt-10 p-4 border rounded shadow"
    >
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded"
        disabled={loading}
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full pr-16"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
        >
          {showPassword ? '非表示' : '表示'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="bg-blue-500 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'ログイン中...' : 'LOGIN'}
      </button>
    </form>
  )
}
