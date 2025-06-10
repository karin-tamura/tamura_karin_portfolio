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
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('✅ handleLogin 発火') // ← 追加

    setLoading(true)
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid

      console.log('✅ ログイン成功 UID:', uid)
      console.log('🔐 環境変数 UID:', process.env.NEXT_PUBLIC_ADMIN_UID)

      if (!process.env.NEXT_PUBLIC_ADMIN_UID) {
        console.warn('⚠️ .env.local に NEXT_PUBLIC_ADMIN_UID が定義されていません')
      }

      if (uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        setError('管理者としての認可がありません。')
        router.push('/not-found')
        return
      }

      router.push('/admin')
    } catch (err) {
      console.error('❌ ログイン失敗:', err)
      setError('メールアドレスまたはパスワードが正しくありません。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 左側の説明 */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">管理者ログイン</h1>
          <p className="text-gray-700 text-sm">
            このページはポートフォリオ管理者専用のログインページです。管理者以外はアクセスできません。
          </p>
        </div>

        {/* 右側のフォーム */}
        <form
          onSubmit={handleLogin}
          className="space-y-6 border rounded-lg p-8 shadow-sm bg-gray-50"
        >
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-700">パスワード</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded pr-16"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword ? '非表示' : '表示'}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? 'ログイン中...' : 'LOGIN'}
          </button>

          <p className="mt-4 text-sm text-left">
            <a href="/" className="text-blue-600 hover:underline">
              ← ホームに戻る
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
