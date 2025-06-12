import { test, expect } from '@playwright/test'

const baseURL = 'http://localhost:3000'
const correctEmail = 'hana.ringo.yuzu.ringo@gmail.com'
const correctPassword = '20011013'
const wrongPassword = 'wrongpassword'

test.describe('ログインフォーム', () => {
  test('✅ 成功: 正しいメール・パスワードで /admin に遷移', async ({ page }) => {
    await page.goto(`${baseURL}/login`)
    await page.getByLabel('メールアドレス').fill(correctEmail)
    await page.getByLabel('パスワード').fill(correctPassword)
    await page.getByRole('button', { name: 'LOGIN' }).click()
    await page.waitForURL(`${baseURL}/admin`)
  })

  test('❌ 失敗: 空欄 → ネイティブバリデーションで未遷移', async ({ page }) => {
    await page.goto(`${baseURL}/login`)
    await page.getByRole('button', { name: 'LOGIN' }).click()
    
    // メールアドレス欄の validity を確認
    const emailInput = page.getByLabel('メールアドレス')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveJSProperty('validationMessage', 'このフィールドを入力してください。')

    // URLが変わっていないことを確認
    await expect(page).toHaveURL(`${baseURL}/login`)
  })

  test('❌ 失敗: 間違ったパスワード → /not-found に遷移', async ({ page }) => {
    await page.goto(`${baseURL}/login`)
    await page.getByLabel('メールアドレス').fill(correctEmail)
    await page.getByLabel('パスワード').fill(wrongPassword)
    await page.getByRole('button', { name: 'LOGIN' }).click()
    await page.waitForURL(`${baseURL}/not-found`)
  })
})
