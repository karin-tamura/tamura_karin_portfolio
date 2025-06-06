# ⚙️ CI.md

## 概要

このドキュメントでは、GitHub Actions を用いた **CI（継続的インテグレーション）構成**と、自動化されたテスト・ビルド・チェックの仕組みについて説明します。

---

## ✅ 目的

- プルリクエスト作成時にテストとビルドを自動実行
- Lint やフォーマットの自動チェック
- テストの失敗を早期に検出し、品質と開発効率を向上

---

## 🚀 使用ツール

| ツール名            | 用途                          |
|---------------------|-------------------------------|
| GitHub Actions       | CI/CD ワークフローの実行      |
| Vitest               | 単体・結合テスト               |
| Playwright           | E2E テスト                    |
| ESLint + Prettier    | Lint / フォーマット           |
| pnpm / npm           | パッケージ管理 / スクリプト   |

---

## 🛠️ ワークフロー定義ファイル

`.github/workflows/ci.yml` を作成：

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Lint check
        run: npm run lint

      - name: Run Unit + Integration tests
        run: npm run test

      - name: Run Playwright tests
        run: |
          npx playwright install --with-deps
          npm run test:e2e
```

---

## 📦 スクリプト例（package.json）
```json
{
  "scripts": {
    "dev": "next dev",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --check .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

---

## 📈 今後の拡張候補
- テストカバレッジの CI 結果に含める
- Cloud Firestore / MySQL などのモック対応（Dockerなど）
- ステージ環境への自動デプロイ連携
- GitHub Actions の Matrix 構成で Node.js 複数バージョン確認
