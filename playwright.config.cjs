// vitest.config.cjs
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  test: {
    environment: 'node',       // Node.js 環境（API・ユーティリティ用）
    globals: true,             // describe, it, expect をグローバルに使用可能に
    include: [
      'src/**/*.test.ts',             // 通常の *.test.ts を対象
      'src/**/__tests__/**/*.ts',     // __tests__ ディレクトリも対象
    ],
    exclude: [
      '**/*.spec.ts',                 // Playwright 用 .spec.ts を除外
      '**/e2e/**',                    // Playwright の E2E テスト除外
      '**/integration/**',            // 統合テスト除外
      'playwright.config.ts',         // Playwright の設定ファイルを除外（.ts）
      'playwright.config.cjs',        // Playwright の設定ファイルを除外（.cjs）
      'node_modules',
      'dist',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'], // カバレッジ出力形式
      reportsDirectory: './coverage',     // 出力先
    },
    watch: false,        // CIや明示実行向けに Watch 無効
    clearMocks: true,    // 各テスト前に mock 自動クリア
    restoreMocks: true,  // 各テスト後に mock を元に戻す
  },
});
