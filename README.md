# 🌐 田村華鈴 ポートフォリオサイト

## 📖 プロジェクト概要

このポートフォリオサイトは以下の 6 セクションで構成されています。  
閲覧者にとっては「わかりやすく」、運用者にとっては「管理しやすい」ことを意識して設計しました。

- 自己紹介  
- 実績紹介  
- スキルの可視化  
- 最新作品  
- 問い合わせ  
- 管理機能（認証・編集用）

---

## 🛠 技術スタック

- **フロントエンド**：Next.js（App Router） / TypeScript / Tailwind CSS  
- **バックエンド**：Express / TypeScript / Prisma ORM（MySQL）  
- **認証**：Firebase Authentication  
- **テスト**  
  - 単体テスト：Vitest  
  - API 統合テスト：Supertest  
  - E2E テスト：Playwright  
- **CI/CD**：GitHub Actions（自動テスト実行 & デプロイ）  

---

## ⚙ 環境構築 & 起動方法

### 前提条件
- Node.js v20 以上  
- npm または pnpm / yarn が利用可能  
- `.env` ファイルを設定（`.env.example` をコピーして必要項目を記入）  

```bash
cp .env.example .env
```

---

インストール & 起動
# 依存関係をインストール

```bash
npm install
```

# データベースのマイグレーション

```bash
npx prisma migrate dev
```

# 開発サーバーを起動

```bash
npm run dev
```

アプリは通常 http://localhost:3000で動作します。


---


