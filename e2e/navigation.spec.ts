import { test, expect } from '@playwright/test';

test.describe('App Navigation Flow', () => {
  test('should display home page navigation buttons', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Tennis Pro App Navigation' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Match Analytics/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /The Kit Bag/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tournament Hub/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Scouting Report/i })).toBeVisible();
  });

  test('should navigate from Home to Match Analytics', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Match Analytics/i }).click();

    await expect(page).toHaveURL(/\/analytics/);
    await expect(page.getByRole('heading', { name: /Match Analytics/i })).toBeVisible();
  });

  test('should navigate from Home to The Kit Bag', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /The Kit Bag/i }).click();

    await expect(page).toHaveURL(/\/kit-bag/);
    await expect(page.locator('body')).toContainText(/Kit Bag/i);
  });

  test('should navigate from Home to Tournament Hub', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Tournament Hub/i }).click();

    await expect(page).toHaveURL(/\/tournament/);
    await expect(page.locator('body')).toContainText(/Tournament/i);
  });

  test('should navigate from Home to Scouting Report', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Scouting Report/i }).click();

    await expect(page).toHaveURL(/\/scouting/);
    await expect(page.locator('body')).toContainText(/Rivalry Analysis|CourtCommand/i);
  });
});
