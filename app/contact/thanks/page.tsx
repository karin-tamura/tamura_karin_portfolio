export default function ThanksPage() {
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">ご送信ありがとうございます！</h1>
      <p className="text-gray-700">メッセージは正常に送信されました。</p>
      <div className="mt-6">
        <a href="/" className="text-blue-600 underline">
          ← ホームに戻る
        </a>
      </div>
    </main>
  );
}
