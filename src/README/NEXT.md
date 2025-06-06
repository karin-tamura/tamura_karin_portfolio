# ⚛️ NEXT.md

## 概要
Next.js をベースに、Firebase 認証付きの管理画面およびトップページを構築しています。

---

## 🔧 セットアップ
1. 依存パッケージのインストール
2. 環境変数の設定（`.env.local`）
3. 開発サーバー起動

---

## ✅ 主な役割
- Firebase 認証に基づくルーティング制御
- ページごとの認可チェック（middleware + カスタムフック）
- Express API との通信
- サーバーサイドレンダリング（必要に応じて）

---

## 📁 ディレクトリ構成（例）

```plaintext
src/
├── app/
│   ├── page.tsx             # トップページ
│   ├── login/page.tsx       # ログインページ
│   └── admin/dashboard/     # 管理者用ページ
├── features/
│   └── auth/
│       ├── hooks/
│       │   └── useAdminAuthGuard.ts
│       │   └── useBackendAdminCheck.ts
│       └── utils/
│           └── checkAdminStatus.ts
├── lib/
│   └── firebase.ts          # Firebase 初期化
└── middleware.ts            # 管理者用ページのアクセス制御
```

---

## 🔐 認可処理の流れ
- ユーザーがログインページで Firebase Auth により認証
- useFirebaseAuth() フックでログイン状態を取得
- useAdminAuthGuard() または useBackendAdminCheck() により管理者かどうかを判定
- middleware.ts により /admin 配下への直接アクセスも保護

---

## 🚦 middleware によるガード例

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const uid = request.cookies.get('uid')?.value

  if (isAdminPage && uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }

  return NextResponse.next()
}
```

---

## 📡 API 通信例（管理者検証）

```ts
const token = await getIdToken(auth.currentUser!)
const res = await fetch('/api/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token }),
})
```

---

## 🧩 今後の拡張候補
- App Router における SSR/API Handler の活用
- Zustand/Recoil/SWR などの状態管理導入
- アクセシビリティ対応（aria-*, focus trap, etc）
- ページごとのローディング最適化
- 404 / 500 カスタムページ設計



