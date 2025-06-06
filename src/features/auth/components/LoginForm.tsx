'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください')
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。')
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    setError('')
    try {
      await signInAnonymously(auth)
      router.push('/')
    } catch (err) {
      setError('ゲストログインに失敗しました')
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="bg-blue-500 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'ログイン中...' : 'LOGIN'}
      </button>

      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={loading}
        className="text-sm text-blue-600 underline mt-2 disabled:opacity-50"
      >
        ゲストとして閲覧
      </button>
    </form>
  )
}
