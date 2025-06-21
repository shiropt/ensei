import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should redirect to stadiums page from home', async ({ page }) => {
    await expect(page).toHaveURL('/stadiums')
  })

  test('should navigate to teams page', async ({ page }) => {
    // ハンバーガーメニューを開く
    await page.click('[aria-label="Toggle navigation"]')
    
    // チームページリンクをクリック
    await page.click('text=クラブ')
    
    await expect(page).toHaveURL('/teams')
  })

  test('should navigate to stadiums page', async ({ page }) => {
    // ハンバーガーメニューを開く
    await page.click('[aria-label="Toggle navigation"]')
    
    // スタジアムページリンクをクリック
    await page.click('text=スタジアム')
    
    await expect(page).toHaveURL('/stadiums')
  })

  test('should display header with title', async ({ page }) => {
    await expect(page.locator('h1:has-text("ensei")')).toBeVisible()
  })

  test('should have search functionality', async ({ page }) => {
    const searchInput = page.locator('input[type="search"]')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toHaveAttribute('placeholder', '検索')
  })
})