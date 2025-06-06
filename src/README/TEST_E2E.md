# 🧪 TEST_E2E.md

## 概要

このドキュメントでは、Playwright を使用した E2E（End-to-End）テストの方針・構成・ケース設計をまとめます。  
対象は主に以下です：

- ログイン機能の一連の流れ
- 認可（admin 判定）によるルーティング制御
- UI 表示の妥当性と状態変化の確認

---

## ✅ テストの目的

| テスト項目             | 目的                                                                 |
|------------------------|----------------------------------------------------------------------|
| ログイン成功           | 正しいメールアドレスとパスワードで正常に遷移することを確認             |
| ログイン失敗           | 不正な入力や未入力時のバリデーション、エラー表示を確認                 |
| ゲストログイン         | 匿名認証が正しく動作し、トップページにリダイレクトされるかを確認       |
| 管理者ページアクセス   | 認証済かつ admin の UID のみがアクセス可能であることを確認              |
| 非管理者のアクセス制限 | 認可されないユーザーが `/admin` にアクセスできないことを確認            |

---

## 🚀 テストセットアップ

```bash
npm install -D @playwright/test
npx playwright install
```

---

## 設定ファイル例：playwright.config.ts
```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  testDir: './tests/e2e',
})
```

---

## 📁 テストディレクトリ構成

tests/
├── e2e/
│   ├── login.spec.ts       # ログイン動作確認
│   ├── guest.spec.ts       # ゲストログイン動作確認
│   └── admin.spec.ts       # 管理者アクセス制限確認

---

## 🧪 テストケース例

- login.spec.ts
```ts
import { test, expect } from '@playwright/test'

test('ログイン成功', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'admin@example.com')
  await page.fill('input[type="password"]', 'correct-password')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/')
})

test('ログイン失敗（未入力）', async ({ page }) => {
  await page.goto('/login')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=メールアドレスとパスワードを入力してください')).toBeVisible()
})
```

- admin.spec.ts
```ts
test('未ログインユーザーは /admin にアクセスできない', async ({ page }) => {
  await page.goto('/admin/dashboard')
  await expect(page).toHaveURL('/not-found')
})
```

---

## 📦 今後の拡張候補
- 入力フィールドのフォーカステスト
- ログイン後に表示されるユーザー情報や UID 表示の検証
- カテゴリ作成 UI の動作確認
- ダークモード切替やレスポンシブ表示テスト
- CI 上での E2E テスト実行（GitHub Actions）

