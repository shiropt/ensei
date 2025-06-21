import '@testing-library/jest-dom'

// グローバルなテスト設定
global.console = {
  ...console,
  // テスト中のコンソールログを制御
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Next.js環境変数のモック
process.env.NODE_ENV = 'test'