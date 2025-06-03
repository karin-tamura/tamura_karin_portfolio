"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setCookie } from "cookies-next"; // 👈 追加！

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🔐 Firebaseでログイン
      await signInWithEmailAndPassword(auth, email, password);

      // 🍪 Cookieにログイン状態を保存
      setCookie("logged_in", "true", {
        maxAge: 60 * 60, // 1時間
        path: "/",
      });

      // 🚀 ダッシュボードへ遷移
      router.push("/admin/dashboard");
    } catch (err) {
      setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </main>
  );
}
