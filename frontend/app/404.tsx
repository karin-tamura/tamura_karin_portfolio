// frontend/app/404.tsx
export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        お探しのページは見つかりませんでした。
      </p>
      <a
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        トップページに戻る
      </a>
    </main>
  );
}
