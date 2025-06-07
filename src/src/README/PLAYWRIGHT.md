# 🧪 PLAYWRIGHT.md

## 概要

このプロジェクトでは、[Playwright](https://playwright.dev/) を使用して、ログイン機能を中心とした E2E（End-to-End）テストを自動化しています。主に以下のケースを対象にしています：

- 正常ログインの確認  
- 認証エラーの検出  
- 管理画面へのアクセス制限の検証

---

## 🚀 セットアップ

1. Playwright のインストール
```bash
npm install -D @playwright/test
npx playwright install
``` 

2. playwright.config.ts をプロジェクトルートに追加
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
3. テスト実行
```bash
npx playwright test
```

---

## 🧪 テストディレクトリ構成
tests/
├── e2e/
│   ├── login.spec.ts      # ログイン機能のテスト
│   └── admin.spec.ts      # 管理者画面アクセス制限のテスト


---

## ✅ テスト例：ログイン成功と失敗
```ts
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('ログイン成功', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'admin@example.com')
  await page.fill('input[type="password"]', 'correct-password')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/')
})

test('ログイン失敗（パスワード誤り）', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'admin@example.com')
  await page.fill('input[type="password"]', 'wrong-password')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=ログインに失敗しました')).toBeVisible()
})
```

---

## 🔐 管理者アクセス制限テスト
```ts
// tests/e2e/admin.spec.ts
import { test, expect } from '@playwright/test'

test('未ログインユーザーは /admin にアクセスできない', async ({ page }) => {
  await page.goto('/admin/dashboard')
  await expect(page).toHaveURL('/not-found')
})
```

---

## 📦 今後の拡張候補
- Firestore の読み書きを含む統合テスト
- 管理者アクションの操作テスト（カテゴリ作成・削除など）
- スクリーンショットによるビジュアルリグレッションチェック
- CI（GitHub Actions 等）との統合











