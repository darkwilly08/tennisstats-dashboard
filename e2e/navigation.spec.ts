import { test, expect } from '@playwright/test';

test.describe('App Navigation Flow, Drawer Avatar & Safe-Area Support', () => {
  test('should render Match Analytics directly at root URL (/) with uncluttered header', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /MATCH ANALYTICS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
  });

  test('should open slide-out navigation drawer and display Google photo avatar when available', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { flutter_inappwebview: { callHandler: (h: string) => Promise<unknown> } }).flutter_inappwebview = {
        callHandler: (h: string) => {
          if (h === 'getNativeAuthSession') {
            return Promise.resolve({
              uid: 'google_user_123',
              displayName: 'Franco Berardi',
              email: 'franco@tennisstats.app',
              photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
            });
          }
          return Promise.resolve(null);
        }
      };
    });

    await page.goto('/');

    const menuBtn = page.getByRole('button', { name: /Menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('Franco Berardi');
    await expect(drawer).toContainText('franco@tennisstats.app');
    const avatarImg = drawer.locator('img[alt="Profile"]');
    await expect(avatarImg).toBeVisible();
    await expect(avatarImg).toHaveAttribute('src', 'https://lh3.googleusercontent.com/a/default-user=s96-c');

    await expect(drawer.getByRole('link', { name: /Estadísticas de Partidos/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Torneos/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Kit Bag/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /Rivales & Scouting/i })).toBeVisible();
    await expect(drawer.getByRole('button', { name: /Configuración & Health Connect/i })).toBeVisible();
    await expect(drawer.getByRole('button', { name: /Cerrar Sesión/i })).toBeVisible();
  });

  test('should respect --safe-area-top CSS variable on header', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--safe-area-top', '36px');
    });

    const headerPaddingTop = await page.locator('header').evaluate((el) => {
      return window.getComputedStyle(el).paddingTop;
    });
    expect(headerPaddingTop).toBe('36px');
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
