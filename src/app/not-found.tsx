export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-red-600">404|ページが見つかりません</h1>
      <p className="text-sm">
        アクセスできないページ、または認証されていない可能性があります。
      </p>
      <div className="flex gap-4 mt-2">
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          トップへ戻る
        </a>
        <a
          href="/login"
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
        >
          ログインページへ
        </a>
      </div>
    </div>
  )
}
