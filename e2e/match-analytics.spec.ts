import { test, expect } from '@playwright/test';

test.describe('Match Analytics View & Core Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/analytics');
  });

  test('should render header with title, player info, and actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'MATCH ANALYTICS' })).toBeVisible();
    await expect(page.locator('header')).toContainText('Player:');
    await expect(page.getByRole('button', { name: /Filters/i })).toBeVisible();
  });

  test('should toggle dark mode when clicking the theme switch button', async ({ page }) => {
    const html = page.locator('html');
    const themeBtn = page.locator('header button').filter({ has: page.locator('.material-icons-round:has-text("dark_mode"), .material-icons-round:has-text("light_mode")') });
    
    await expect(themeBtn).toBeVisible();

    const initiallyDark = await html.evaluate(el => el.classList.contains('dark'));

    await themeBtn.click();
    const afterFirstClick = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterFirstClick).toBe(!initiallyDark);

    await themeBtn.click();
    const afterSecondClick = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterSecondClick).toBe(initiallyDark);
  });

  test('should render Overview Cards', async ({ page }) => {
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
    // Results by Opponent chart
    await expect(page.getByRole('heading', { name: 'Results by Opponent' })).toBeVisible();
    const opponentChartCanvas = page.locator('.chart-container canvas').first();
    await expect(opponentChartCanvas).toBeVisible();

    // Won/Lost Trends chart
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
    
    // Check table headers
    const table = page.locator('table');
    await expect(table).toBeVisible();
    await expect(table).toContainText('Result');
    await expect(table).toContainText('Score');
    await expect(table).toContainText('Date');
    await expect(table).toContainText('Opponent');
    await expect(table).toContainText('Duration');
  });
});
