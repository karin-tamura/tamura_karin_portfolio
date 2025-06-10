# 📘 API設計書

本ドキュメントは、ポートフォリオ管理画面における各APIの仕様を示します。

---

## 1. プロフィール取得

### `GET /api/profile`

#### レスポンス例

```json
{
  "name": "田村華鈴",
  "bio": "島生まれ島育ちの見習いエンジニア",
  "imagePath": "/uploads/profile.png"
}
```

---

## 2. プロフィール更新

### POST `/api/profile`

#### 📤 リクエストボディ（JSON）

```json
{
  "name": "田村華鈴",
  "bio": "紹介文テキスト",
  "imagePath": "/uploads/profile.png"
}
```
#### 📥 レスポンス例
```json
{
  "message": "Profile updated successfully"
}
```

---

## 3. スキル一覧取得

### GET /api/skills

#### 📥 レスポンス例

```json
[
  {
    "category": "フロントエンド",
    "summary": "React / Next.js を中心に構築しています",
    "skills": [
      { "name": "React", "description": "UI構築に特化したライブラリ" },
      { "name": "TypeScript", "description": "型安全なフロントエンド言語" }
    ]
  }
]
```

---

## 4. スキルカテゴリ追加

### POST /api/skills

#### 📤 リクエストボディ（JSON）
```json
{
  "category": "バックエンド",
  "summary": "Node.js や Express を使用しています",
  "skills": [
    { "name": "Express", "description": "軽量なWebアプリケーションフレームワーク" }
  ]
}
```

#### 📥 レスポンス例
```json
{
  "message": "Skill group added successfully"
}
```

---

## 5. 実績一覧取得

### GET /api/achievements

#### 📥 レスポンス例
```json
[
  {
    "date": "2025 Sep.",
    "title": "Ms.Engineer 卒業"
  },
  {
    "date": "2024 Mar.",
    "title": "福岡県立大学 卒業"
  }
]
```

---

## 6. 実績追加

### POST /api/achievements

#### 📤 リクエストボディ（JSON）
```json
{
  "date": "2025 Sep.",
  "title": "Ms.Engineer 卒業"
}
```

#### 📥 レスポンス例
```json
{
  "message": "Achievement added successfully"
}
```

---

## 7. 画像アップロード

### POST /api/upload-image

#### 📤 リクエスト形式
multipart/form-data
フィールド / image 
型 / file
内容 / 画像ファイル（png, jpg）

#### 📥 レスポンス例
```json
{
  "path": "/uploads/abc123.png"
}
```

---

## 🚨 共通エラーレスポンス
```json
{
  "error": "エラーメッセージ内容"
}
```

---

## 🧪 テスト対象 API 一覧

| メソッド | パス                  | テスト項目例             |
| ---- | ------------------- | ------------------ |
| GET  | `/api/profile`      | 管理者認証 / データ取得の正常系  |
| POST | `/api/profile`      | バリデーション / 保存処理     |
| GET  | `/api/skills`       | 正常取得 / 空データ時の挙動    |
| POST | `/api/skills`       | ネスト構造の正しさ / 必須項目漏れ |
| GET  | `/api/achievements` | 並び順チェック / 形式確認     |
| POST | `/api/achievements` | 日付・タイトルの入力バリデーション  |
| POST | `/api/upload-image` | ファイル形式・サイズの検証      |


