// frontend/app/admin/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteCookie } from "cookies-next";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    deleteCookie("logged_in"); // クッキー削除
    router.push("/admin/login"); // ログインページに戻る
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">管理画面ダッシュボード</h1>
      <p className="text-gray-600 mb-6">
        ようこそ、管理者ページへ！ここからポートフォリオを編集できます ✨
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
      >
        ログアウト
      </button>
    </main>
  );
}
