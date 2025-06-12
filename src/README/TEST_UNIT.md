# 🧪 TEST_UNIT.md

## 概要

このドキュメントでは、プロジェクト内で実装された関数やユーティリティに対する **ユニットテスト** の設計方針・対象範囲・ツール・テストケースを記述します。

---

## ✅ 主な目的

- 関数単体の正確性を保証
- バリデーション処理や条件分岐の網羅
- Firebase や API 通信関数の単体検証（モック対応）

---

## 🧪 使用ツール

- **Vitest**：高速なユニットテスト実行
- **ts-mockito / vi.fn**：依存関数・外部ライブラリのモック化
- **@testing-library/react-hooks**（必要に応じて）：カスタムフックのテスト

---

## 📁 テスト構成例

```plaintext
src/
├── features/
│   └── auth/
│       ├── utils/
│       │   └── checkAdminStatus.ts
│       └── __tests__/
│           └── checkAdminStatus.test.ts  ← このファイルで単体テスト
├── lib/
│   └── firebase.ts （モック対象）

```

---

## 🔍 対象関数とテスト例
1. カテゴリ名のバリデーション関数
```ts
export function isValidCategoryName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 20
}
```

✅ テストケース例
```ts
import { describe, expect, it } from 'vitest'
import { isValidCategoryName } from '../utils/validation'

describe('isValidCategoryName', () => {
  it('空文字は無効', () => {
    expect(isValidCategoryName('')).toBe(false)
  })

  it('20文字以内なら有効', () => {
    expect(isValidCategoryName('生活費')).toBe(true)
  })

  it('20文字を超えると無効', () => {
    const longName = 'あ'.repeat(21)
    expect(isValidCategoryName(longName)).toBe(false)
  })
})
```
2. Firebase トークン取得関数（モック対象）
```ts
export async function getCurrentIdToken(): Promise<string | null> {
  const user = auth.currentUser
  if (!user) return null
  return await user.getIdToken()
}
```

✅ テストケース例（vi.mock）
```ts
import { vi, describe, it, expect } from 'vitest'
import { getCurrentIdToken } from '../utils/firebaseToken'
import { auth } from '@/lib/firebase'

vi.mock('@/lib/firebase', () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn(() => Promise.resolve('mock-token')),
    },
  },
}))

describe('getCurrentIdToken', () => {
  it('現在のユーザーが存在する場合、トークンを取得する', async () => {
    const token = await getCurrentIdToken()
    expect(token).toBe('mock-token')
  })
})
```
## 🚫 異常系も忘れずに
- 無効な入力値（空・null・不正形式）
- 例外発生時の fallback 処理
- 非同期関数の reject ケース対応（try/catch）

---

## 🛠 skills APIユーティリティのユニットテスト

### 🔧 バリデーション関数（isValidSkillName, isValidDescription）

```ts
// src/utils/validation.ts
export function isValidSkillName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 50
}

export function isValidDescription(description: string): boolean {
  return description.trim().length <= 200
}
```

### ✅ テストケース例
```ts
import { describe, it, expect } from 'vitest'
import { isValidSkillName, isValidDescription } from '../validation'

describe('isValidSkillName', () => {
  it('空文字列は無効', () => {
    expect(isValidSkillName('')).toBe(false)
  })

  it('50文字以内は有効', () => {
    expect(isValidSkillName('TypeScript')).toBe(true)
  })

  it('51文字以上は無効', () => {
    expect(isValidSkillName('a'.repeat(51))).toBe(false)
  })
})

describe('isValidDescription', () => {
  it('200文字以内は有効', () => {
    expect(isValidDescription('これは説明です')).toBe(true)
  })

  it('201文字以上は無効', () => {
    expect(isValidDescription('a'.repeat(201))).toBe(false)
  })
})
```

### 📝 補足：
- サーバーサイドの /api/skills POST エンドポイントでも使用可能な汎用バリデーション関数として抽出。
- フロント／バック双方で同一ロジックを再利用することで、バリデーションの一貫性を担保。

--- 

### テスト結果
```pwsh
PS C:\portfolio-project> npm run test:unit
>>

> test:unit
> vitest run


 RUN  v3.2.3 C:/portfolio-project

 ✓ src/utils/__tests__/validation.test.ts (6 tests) 7ms
 ✓ src/tests/api/skills.test.ts (2 tests) 59ms

 Test Files  2 passed (2)
      Tests  8 passed (8)
   Start at  18:26:10
   Duration  1.45s (transform 162ms, setup 0ms, collect 592ms, tests 67ms, environment 1ms, prepare 924ms)
```


