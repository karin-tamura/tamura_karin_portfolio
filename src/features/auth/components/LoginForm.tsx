'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/') 
    } catch (err) {
      setError('ログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    setError('')
    try {
      await signInAnonymously(auth)
      router.push('/') // ゲストもトップページへいくことは可能
    } catch (err) {
      setError('ゲストログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64 mx-auto mt-10">
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-1 rounded disabled:opacity-50"
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

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}
