import { test, expect } from '@playwright/test'

test.describe('Stadiums Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stadiums')
  })

  test('should display stadiums list', async ({ page }) => {
    // スタジアムカードが表示されることを確認
    await expect(page.locator('[data-testid="stadium-card"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('should display map view', async ({ page }) => {
    // 地図表示ボタンをクリック
    await page.click('text=地図')
    
    // 地図コンテナが表示されることを確認
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible({ timeout: 10000 })
  })

  test('should toggle between list and map view', async ({ page }) => {
    // 初期状態でリスト表示
    await expect(page.locator('[data-testid="stadium-card"]').first()).toBeVisible({ timeout: 10000 })
    
    // 地図表示に切り替え
    await page.click('text=地図')
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible({ timeout: 10000 })
    
    // リスト表示に戻す
    await page.click('text=リスト')
    await expect(page.locator('[data-testid="stadium-card"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('should filter stadiums by search', async ({ page }) => {
    // 検索入力を待機
    const searchInput = page.locator('input[type="search"]')
    await searchInput.waitFor({ state: 'visible' })
    
    // 初期のカード数を取得
    const initialCards = await page.locator('[data-testid="stadium-card"]').count()
    
    // 検索テキストを入力
    await searchInput.fill('東京')
    
    // 検索結果の変化を待機（カード数の変化またはURL変更を待つ）
    await expect(async () => {
      const currentCards = await page.locator('[data-testid="stadium-card"]').count()
      return currentCards !== initialCards || page.url().includes('search=東京')
    }).toPass({ timeout: 3000 })
    
    // 検索結果が表示されることを確認
    await expect(page.locator('[data-testid="stadium-card"]')).toHaveCount({ min: 1 })
  })

  test('should navigate to stadium detail', async ({ page }) => {
    // 最初のスタジアムカードが表示されるまで待機
    await page.locator('[data-testid="stadium-card"]').first().waitFor({ state: 'visible', timeout: 10000 })
    
    // 最初のスタジアムカードをクリック
    await page.locator('[data-testid="stadium-card"]').first().click()
    
    // スタジアム詳細ページに移動することを確認
    await expect(page).toHaveURL(/\/stadiums\/\d+/)
  })
})