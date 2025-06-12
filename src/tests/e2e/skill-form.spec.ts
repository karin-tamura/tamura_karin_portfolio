import { test, expect } from '@playwright/test'

test.describe('スキル登録フォーム', () => {
  test.beforeEach(async ({ page }) => {
    // 管理者としてログイン状態をシミュレート（必要に応じて調整）
    await page.goto('/login')
    await page.fill('input[type="email"]', process.env.E2E_EMAIL!)
    await page.fill('input[type="password"]', process.env.E2E_PASSWORD!)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/admin/)
    await page.goto('/admin/skill-editor')
  })

  test('スキルを正常に追加できる', async ({ page }) => {
    const skillName = 'Playwright Test Skill'
    const description = 'E2E テストで登録されたスキル'

    await page.fill('input[name="name"]', skillName)
    await page.fill('textarea[name="description"]', description)
    await page.click('button:has-text("登録")')

    // 成功時にUIに反映されることを確認（例：リストに表示）
    await expect(page.locator(`text=${skillName}`)).toBeVisible()
  })

  test('バリデーションエラー：空のスキル名', async ({ page }) => {
    await page.fill('input[name="name"]', '')
    await page.click('button:has-text("登録")')

    await expect(page.locator('text=スキル名は必須です')).toBeVisible()
  })

  test('バリデーションエラー：スキル名が長すぎる', async ({ page }) => {
    const longName = 'A'.repeat(51)
    await page.fill('input[name="name"]', longName)
    await page.click('button:has-text("登録")')

    await expect(page.locator('text=スキル名は50文字以内で入力してください')).toBeVisible()
  })
})
