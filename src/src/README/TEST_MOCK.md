# 🧪 TEST_MOCK.md

## 概要

このドキュメントでは、フロントエンド/バックエンド開発におけるモック戦略をまとめます。主に以下のような目的でモックを導入しています：

- 開発初期にAPIが未完成でも動作確認できる
- テスト時に外部依存を排除して安定化
- Firebaseなど実サービスに接続せず、安全にテスト実行

---

## ✅ 活用モック技術と用途

| 技術        | 用途                             |
|-------------|----------------------------------|
| MSW         | クライアント側のAPIレスポンスをモック |
| vi.mock     | Firebase Adminなどのモジュール差し替え |
| Mock Service | Express APIレスポンスの代替         |

---

## 🔧 MSW（Mock Service Worker）

### セットアップ

```bash
npm install msw --save-dev
```

---

## モックハンドラ定義例
```ts
// src/mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.post('/api/auth/verify', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ uid: 'admin123' }))
  }),
]
```

## テスト環境での起動
```ts
// src/mocks/browser.ts
import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

---

## 🔒 Firebase モック（管理者認証）
```ts
// tests/mocks/firebase-admin-mock.ts
vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: vi.fn().mockResolvedValue({
      uid: 'admin123',
      admin: true,
    }),
  }),
}))
```

---

## 🔁 テストでの活用例
```ts
import request from 'supertest'
import app from '@/index'

test('管理者でAPIにアクセスできる', async () => {
  const res = await request(app)
    .get('/api/admin')
    .set('Authorization', 'Bearer mocked-token')
  expect(res.status).toBe(200)
})
```

--- 

## 📦 今後の拡張候補
- Firebase Admin SDK の自動モックライブラリ化
- SWRキャッシュのモック対応
- MSWとPlaywrightの統合（E2E向け）

