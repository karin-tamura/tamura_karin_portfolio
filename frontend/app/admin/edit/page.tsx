"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminEditPage() {
  const [name, setName] = useState("田村 華鈴");
  const [location, setLocation] = useState("長崎県");
  const [job, setJob] = useState("エンジニア見習い（今は歯医者さんでアルバイト）");
  const [likes, setLikes] = useState("猫");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // 🔜 本番ではFirebaseへ保存する処理に
    console.log({ name, location, job, likes, image });
    alert("仮保存しました！（console に出力中）");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>

        {/* プレビュー画像 */}
        {previewUrl && (
          <div className="mb-4">
            <Image
              src={previewUrl}
              alt="プロフィールプレビュー"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
          </div>
        )}

        {/* 画像アップロード */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">プロフィール画像</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* テキスト入力欄 */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">名前</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">出身</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">職業</label>
            <input
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">好きなもの</label>
            <input
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          保存する
        </button>
      </div>
    </main>
  );
}
