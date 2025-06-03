'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ←追加！

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ←送信開始時
    setError('');

    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // ←完了時
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">{isNewUser ? '新規登録' : 'ログイン'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? '処理中...'
            : isNewUser
              ? '登録する'
              : 'ログイン'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      <button
        onClick={() => setIsNewUser(!isNewUser)}
        className="mt-4 text-blue-500 underline disabled:opacity-50"
        disabled={loading}
      >
        {isNewUser ? 'ログインへ切り替え' : '新規登録はこちら'}
      </button>
    </main>
  );
}
