# 📦 EXPRESS.md

## 概要

本プロジェクトでは、Next.js フロントエンドと分離された Express バックエンド API を構築しています。主に Firebase 認証済ユーザーのトークン検証、および管理者専用エンドポイントの保護に使用しています。

---

## 🔧 セットアップ

1. Firebase Admin SDK のサービスアカウントキーを `.env.admin.local` に設定
2. 以下のコマンドでサーバー起動：

```bash
cd api-server
npm install
npm run dev
```

---

# Express バックエンド構成

このプロジェクトでは、Next.js フロントエンドと連携するためのバックエンド API サーバーを Express で構築しています。

---

## ✅ 主な役割

- Firebase 認証トークンの検証
- 管理者専用 API の保護（`/api/admin/...`）
- クライアントからのトークン送信・署名確認
- カスタムクレーム（`admin: true`）の確認
- Express ミドルウェアによる認可制御

---

## 🔧 ディレクトリ構成（例）

src/
├── index.ts # エントリポイント（APIサーバー起動）
├── routes/
│ └── admin.ts # 管理者専用エンドポイント（/api/admin）
├── middleware/
│ └── auth.ts # Firebase トークン検証ミドルウェア


---

## 🧩 認証処理の流れ

1. クライアントが Firebase Auth でログイン
2. `getIdToken()` で ID トークンを取得
3. Express にリクエスト（例：POST `/api/auth/verify`）
4. `firebase-admin` によりトークンを検証
5. `admin: true` のカスタムクレームを確認

---

## 🛡️ ミドルウェア例（`verifyAdminToken`）

```ts
import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'

export async function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = await getAuth().verifyIdToken(token)
    if (decoded.admin === true) {
      req.user = decoded
      return next()
    } else {
      return res.status(403).json({ message: 'Access denied: not admin' })
    }
  } catch (err) {
    console.error('Token verification failed:', err)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
```

---

## 📦 今後の拡張候補
- Prisma による DB アクセス追加
- バリデーション（Zod 等）によるリクエスト検証
- エラーハンドリングミドルウェアの導入
- Swagger / OpenAPI による API ドキュメント化

