# 🔥 FIREBASE.md

## 概要

本プロジェクトでは、Firebase を利用してユーザー認証を行っています。クライアント側では Firebase Auth によるログイン・ゲストアクセス、サーバー側では Firebase Admin SDK による ID トークンの検証と管理者判定を実施しています。

---

## 🔧 セットアップ

1. Firebase プロジェクトを作成（[https://console.firebase.google.com](https://console.firebase.google.com)）
2. 認証方法を有効化（Email/Password、匿名ログインなど）
3. 以下の環境変数を `.env.local` に設定：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx
NEXT_PUBLIC_ADMIN_UID=管理者UID
```

---

## ✅ 主な役割
- クライアントが Firebase でログイン
- getIdToken() により ID トークンを取得
- /api/auth/verify へトークンを送信
- Express 側で Firebase Admin SDK によりトークン署名とクレームを検証
- admin: true を確認してアクセス制御

---

## 🔐 カスタムクレーム設定例（管理者ユーザー）

 Firebase CLI や Admin SDK を用いて、管理者ユーザーに対し以下のように一度だけクレームを付与します

```ts
import { getAuth } from 'firebase-admin/auth'

await getAuth().setCustomUserClaims('UID_HERE', { admin: true })
```

---

## 🔥 クライアント側初期化-例

```ts
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
```

---

## 📦 今後の拡張候補
- Firestore / Cloud Storage の活用
- ロールベース認可の導入（admin / editor / guest など）
- トークン失効・セッション検知の強化
- Analytics / Performance Monitoring の導入


