import { test, expect } from '@playwright/test';

test.describe('Match Analytics View & Core Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/analytics');
  });

  test('should render minimal header with title, hamburger menu, and settings action', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'MATCH ANALYTICS' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Ajustes & Servicios/i })).toBeVisible();
  });

  test('should toggle dark and light mode exclusively via Settings modal with high-contrast M3 tokens', async ({ page }) => {
    const html = page.locator('html');

    // Open Settings modal from header gear button
    const settingsBtn = page.getByRole('button', { name: /Ajustes & Servicios/i });
    await settingsBtn.click();

    await expect(page.getByRole('heading', { name: 'Ajustes & Servicios' })).toBeVisible();

    // Switch to Light Mode
    await page.getByRole('button', { name: /Modo Claro/i }).click();
    const isDarkAfterLight = await html.evaluate(el => el.classList.contains('dark'));
    expect(isDarkAfterLight).toBe(false);

    // Verify Light Mode high-contrast card surface (#FFFFFF) and primary text (#0F172A)
    const firstCard = page.locator('.glass-panel').first();
    const cardStyles = await firstCard.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        bg: style.backgroundColor,
        color: style.color,
      };
    });
    expect(cardStyles.bg).toBe('rgb(255, 255, 255)');
    expect(cardStyles.color).toBe('rgb(15, 23, 42)');

    // Switch back to Dark Mode
    await page.getByRole('button', { name: /Modo Oscuro/i }).click();
    const isDarkAfterDark = await html.evaluate(el => el.classList.contains('dark'));
    expect(isDarkAfterDark).toBe(true);
  });

  test('should render Overview Cards and Quick Actions when empty', async ({ page }) => {
    await expect(page.getByText('Comenzar Partido en Wear OS')).toBeVisible();
    await expect(page.getByText('Matches', { exact: true })).toBeVisible();
    await expect(page.getByText('Time on Court', { exact: true })).toBeVisible();
    await expect(page.getByText('Tie Breaks', { exact: true })).toBeVisible();
    await expect(page.getByText('Best Set Streak', { exact: true })).toBeVisible();
  });

  test('should render Physiological & Health Data section and cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Physiological & Health Data/i })).toBeVisible();
    await expect(page.getByText('Active Calories', { exact: true })).toBeVisible();
    await expect(page.getByText('Avg Heart Rate', { exact: true })).toBeVisible();
    await expect(page.getByText('Distance Covered', { exact: true })).toBeVisible();
  });

  test('should render chart panels with canvas elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Results by Opponent' })).toBeVisible();
    const opponentChartCanvas = page.locator('.chart-container canvas').first();
    await expect(opponentChartCanvas).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Won/Lost Trends' })).toBeVisible();
    const trendChartCanvas = page.locator('.chart-container canvas').nth(1);
    await expect(trendChartCanvas).toBeVisible();
  });

  test('should render Point Breakdown cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Point Outcome Breakdowns/i })).toBeVisible();
    await expect(page.getByText('Break Points Won', { exact: true })).toBeVisible();
    await expect(page.getByText('Break Points Saved', { exact: true })).toBeVisible();
    await expect(page.getByText('Points on Serve', { exact: true })).toBeVisible();
    await expect(page.getByText('Points Receiving', { exact: true })).toBeVisible();
  });

  test('should render Recent Match Results table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Match Results' })).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();
    await expect(table).toContainText('Result');
    await expect(table).toContainText('Score');
    await expect(table).toContainText('Date');
    await expect(table).toContainText('Opponent');
    await expect(table).toContainText('Duration');
  });
});
