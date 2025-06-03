// frontend/app/admin/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteCookie } from "cookies-next";
import { useEffect, useState, DragEvent } from "react";
import Image from "next/image";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    setUserEmail(user?.email ?? null);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    deleteCookie("logged_in");
    router.push("/admin/login");
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfileImage(url);
    // 🔜 本番では Firebase Storage にアップロードしてURLを保存
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">管理画面ダッシュボード</h1>
      {userEmail && (
        <p className="text-sm text-gray-500 mb-4">ログイン中：{userEmail}</p>
      )}

      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">プロフィール情報</h2>

        {/* ドラッグ＆ドロップエリア */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="プロフィール画像"
              width={150}
              height={150}
              className="rounded-full mx-auto object-cover"
            />
          ) : (
            <p className="text-gray-500">ここに画像をドロップしてください</p>
          )}
        </div>

        <ul className="text-gray-800 space-y-2 mt-6">
          <li><strong>名前：</strong> 田村 華鈴</li>
          <li><strong>出身：</strong> 長崎県</li>
          <li><strong>職業：</strong> エンジニア見習い（今は歯医者さんでアルバイト）</li>
          <li><strong>好きなもの：</strong> 猫</li>
        </ul>

        <button
          onClick={() => router.push("/admin/edit")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition w-full"
        >
          編集へ進む
        </button>
      </section>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
      >
        ログアウト
      </button>
    </main>
  );
}
