import { test, expect } from '@playwright/test';

test.describe('App Navigation Flow & Slide-Out Drawer', () => {
  test('should render Match Analytics directly at root URL (/)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /MATCH ANALYTICS/i })).toBeVisible();
    await expect(page.locator('header')).toContainText('Player:');
    await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
  });

  test('should open slide-out navigation drawer with hamburger button', async ({ page }) => {
    await page.goto('/');

    const menuBtn = page.getByRole('button', { name: /Menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify slide-out drawer items
    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Estadísticas de Partidos/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Torneos/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Kit Bag/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Rivales & Scouting/i })).toBeVisible();
    await expect(drawer.getByRole('button', { name: /Configuración & Health Connect/i })).toBeVisible();
    await expect(drawer.getByRole('button', { name: /Cerrar Sesión/i })).toBeVisible();
  });

  test('should navigate from Drawer to Tournament Hub', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Menu/i }).click();

    await page.locator('aside').getByRole('link', { name: /Torneos/i }).click();

    await expect(page).toHaveURL(/\/tournament/);
    await expect(page.locator('header')).toContainText(/TOURNAMENT HUB/i);
    await expect(page.locator('body')).toContainText(/Torneos & Competiciones/i);
  });

  test('should navigate from Drawer to The Kit Bag', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Menu/i }).click();

    await page.locator('aside').getByRole('link', { name: /Kit Bag/i }).click();

    await expect(page).toHaveURL(/\/kit-bag/);
    await expect(page.locator('header')).toContainText(/THE KIT BAG/i);
    await expect(page.locator('body')).toContainText(/Raquetas|Kit Bag/i);
  });

  test('should navigate from Drawer to Scouting Report', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Menu/i }).click();

    await page.locator('aside').getByRole('link', { name: /Rivales & Scouting/i }).click();

    await expect(page).toHaveURL(/\/scouting/);
    await expect(page.locator('header')).toContainText(/SCOUTING REPORT/i);
    await expect(page.locator('body')).toContainText(/Rivales & Scouting/i);
  });

  test('should close drawer when clicking close button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Menu/i }).click();

    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();

    await page.getByRole('button', { name: /Cerrar menú/i }).click();
    await expect(drawer).toHaveClass(/-translate-x-full/);
  });
});
