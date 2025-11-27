import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// グローバルなテスト設定
global.console = {
  ...console,
  // テスト中のコンソールログを制御
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

// Next.js環境変数のモック
process.env.NODE_ENV = 'test'
