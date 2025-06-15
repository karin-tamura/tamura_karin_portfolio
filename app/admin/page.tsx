'use client'

export default function AdminHomePage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">

      <h1 className="text-2xl font-bold text-gray-800 mb-2">管理画面にようこそ</h1>
      <p className="text-gray-600">
        編集したい項目を、上のメニューから選択してください。
      </p>

      <p className="mt-6 text-sm text-gray-400">
        プロフィール・スキル・実績の3セクションが編集できます。
      </p>
    </div>
  )
}
