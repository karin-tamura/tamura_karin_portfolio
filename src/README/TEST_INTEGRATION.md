# 🔗 TEST_INTEGRATION.md

## 概要

このドキュメントでは、Express バックエンドと Firebase Admin SDK / Prisma ORM など外部依存を含んだ **結合テスト（Integration Test）** の設計方針と実装例をまとめます。APIルーター、DB、認証の連携が正しく動作することを確認するのが目的です。

---

## ✅ 対象範囲と目的

| 対象コンポーネント       | テスト目的                                                  |
|--------------------------|-------------------------------------------------------------|
| Express ルーター         | ルーティングとレスポンス構造の妥当性を検証                 |
| Firebase Admin SDK       | トークン署名の検証と管理者判定が連動しているかを確認       |
| Prisma ORM               | 実際の DB 操作とレスポンスの整合性を確認                   |
| ミドルウェア（auth.ts） | トークンなし・不正トークン時の挙動を確認                   |

---

## 🧪 使用技術

- `vitest`：テストフレームワーク
- `supertest`：Express アプリに対するリクエスト発行
- `@prisma/client`：DBとの実接続（テストDBを使用）
- `firebase-admin`：IDトークンの検証用（モック可能）

---

## 🔧 テストDBと環境構築

1. `.env.test` にテスト用の DB 接続情報を記載（例：`mysql://..._test`）
2. Prisma のマイグレーション適用：

```bash
npx prisma migrate reset --env-file=.env.test
```

---

## 🔐 認証ミドルウェアのテスト例
```ts
// tests/integration/admin-auth.spec.ts
import request from 'supertest'
import app from '@/index' // Expressアプリ
import { getAuth } from 'firebase-admin/auth'

vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: vi.fn().mockResolvedValue({ uid: 'admin123', admin: true }),
  }),
}))

test('adminトークンで /api/admin にアクセスできる', async () => {
  const res = await request(app)
    .get('/api/admin')
    .set('Authorization', 'Bearer valid-token')

  expect(res.status).toBe(200)
})
```

## 📁 ディレクトリ構成（例）
```plaintext
tests/
├── integration/
│   ├── admin-auth.spec.ts      # Firebase Admin + Express の連携確認
│   ├── category-api.spec.ts    # Prisma + API のPOST/GETテスト
```

---

## 📦 今後の拡張候補
- DBに保存されたデータとレスポンスの整合性チェック
- ロールごとのアクセス制御テスト（admin / guest）
- テスト用 Firebase Admin モックの自動生成

