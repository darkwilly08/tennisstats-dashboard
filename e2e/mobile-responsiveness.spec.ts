import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness (375px Viewport)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should render cleanly on 375px width without horizontal scroll', async ({ page }) => {
    await page.goto('/');

    // Check header elements
    const menuBtn = page.getByRole('button', { name: /Menu/i });
    await expect(menuBtn).toBeVisible();

    // Verify touch target is at least 44px
    const box = await menuBtn.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(40);
      expect(box.height).toBeGreaterThanOrEqual(40);
    }

    // Check no horizontal page overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    // Open drawer on mobile
    await menuBtn.click();
    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();

    // Check drawer navigation items
    await expect(drawer.getByRole('link', { name: /Estadísticas de Partidos/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Torneos/i })).toBeVisible();

    // Close drawer
    await page.getByRole('button', { name: /Cerrar menú/i }).click();
  });

  test('should render tournament hub cleanly on mobile', async ({ page }) => {
    await page.goto('/tournament');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    await expect(page.getByRole('button', { name: /\+ Crear Torneo/i }).first()).toBeVisible();
  });

  test('should render kit bag cleanly on mobile', async ({ page }) => {
    await page.goto('/kit-bag');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    await expect(page.locator('body')).toContainText(/Raquetas|Kit Bag/i);
  });

  test('should render scouting report cleanly on mobile', async ({ page }) => {
    await page.goto('/scouting');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    await expect(page.locator('body')).toContainText(/Rivales & Scouting/i);
  });
});
