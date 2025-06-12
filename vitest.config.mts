// vitest.config.mts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'), // エイリアス @ を src に通す
    },
  },
  test: {
    environment: 'node',
    globals: true, // describe / it / expect をグローバルで認識
    include: [
      'src/**/*.test.ts',
      'src/**/__tests__/**/*.ts',
      'tests/**/*.test.ts',
      'tests/**/*.ts',
    ],
    exclude: [
      '**/*.spec.ts',
      '**/e2e/**',
      'playwright.config.ts',
      'playwright.config.cjs',
      'node_modules',
      'dist',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      exclude: [
        '**/*.test.ts',
        '**/__tests__/**',
        '**/*.d.ts',
        'src/**/*.mock.ts',
        'src/**/mocks/**',
        'src/**/types/**',
        'src/**/constants/**',
      ],
    },
    watch: false,
    clearMocks: true,
    restoreMocks: true,
  },
})
