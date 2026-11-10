import { test, expect } from '@playwright/test';

test.describe('Desktop Google Auth & WebView Differentiation Flow', () => {
  test('should display Google Sign-In on desktop when unauthenticated and NOT show Cerrar Sesión', async ({ page }) => {
    await page.goto('/');

    // 1. Header should show "Iniciar Sesión" on desktop when unauthenticated
    const headerLoginBtn = page.locator('header').getByRole('button', { name: /Iniciar sesión con Google|Iniciar Sesión/i });
    await expect(headerLoginBtn).toBeVisible();

    // 2. Open drawer - should show "Invitado" and Google login option, NOT "Cerrar Sesión"
    const menuBtn = page.getByRole('button', { name: /Menu/i });
    await menuBtn.click();

    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText(/Invitado/i);
    await expect(drawer).toContainText(/Sin sesión activa/i);

    // "Cerrar Sesión" must NOT be visible when not authenticated
    await expect(drawer.getByRole('button', { name: /Cerrar Sesión/i })).not.toBeVisible();

    // Drawer should have Google Sign-In button
    const drawerLoginBtn = drawer.getByRole('button', { name: /Iniciar sesión con Google/i });
    await expect(drawerLoginBtn).toBeVisible();
  });

  test('should display Google Sign-In in empty state on desktop', async ({ page }) => {
    await page.goto('/');

    // When matches are empty on desktop, there should be a direct Google Sign-in action
    const emptyStateLoginBtn = page.locator('main').getByRole('button', { name: /Iniciar sesión con Google/i });
    await expect(emptyStateLoginBtn).toBeVisible();
  });

  test('should display Account section in Settings with Guest status on desktop', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.getByRole('heading', { name: /Cuenta & Sesión/i })).toBeVisible();
    await expect(page.getByText(/Invitado/i).first()).toBeVisible();
    await expect(page.locator('main').getByRole('button', { name: /Iniciar sesión con Google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Cerrar Sesión/i })).not.toBeVisible();
  });

  test('should detect mobile WebView environment and not show desktop Google Sign-In', async ({ page }) => {
    // Inject mock flutter_inappwebview
    await page.addInitScript(() => {
      (window as unknown as { flutter_inappwebview: { callHandler: (h: string) => Promise<unknown> } }).flutter_inappwebview = {
        callHandler: (h: string) => {
          if (h === 'getNativeAuthSession') {
            return Promise.resolve(null); // No session
          }
          return Promise.resolve(null);
        }
      };
    });

    await page.goto('/');

    // In WebView, desktop web Google popup button should not be displayed in header
    const headerLoginBtn = page.locator('header').getByRole('button', { name: /Iniciar sesión con Google|Iniciar Sesión/i });
    await expect(headerLoginBtn).not.toBeVisible();

    // Open drawer
    await page.getByRole('button', { name: /Menu/i }).click();
    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();

    // In WebView without session, "Cerrar Sesión" must NOT be visible
    await expect(drawer.getByRole('button', { name: /Cerrar Sesión/i })).not.toBeVisible();

    // Notice that session is managed by mobile app
    await expect(drawer).toContainText(/Sesión administrada por la app móvil/i);
  });

  test('should render user profile and Cerrar Sesión when authenticated via native session', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { flutter_inappwebview: { callHandler: (h: string) => Promise<unknown> } }).flutter_inappwebview = {
        callHandler: (h: string) => {
          if (h === 'getNativeAuthSession') {
            return Promise.resolve({
              uid: 'player_franco_123',
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

    // Open drawer
    await page.getByRole('button', { name: /Menu/i }).click();
    const drawer = page.locator('aside');
    await expect(drawer).toBeVisible();

    // Should display authenticated user name & email
    await expect(drawer).toContainText('Franco Berardi');
    await expect(drawer).toContainText('franco@tennisstats.app');

    // "Cerrar Sesión" should be visible when authenticated
    const logoutBtn = drawer.getByRole('button', { name: /Cerrar Sesión/i });
    await expect(logoutBtn).toBeVisible();

    // Click logout
    await logoutBtn.click();

    // Drawer closes. Reopen to check unauthenticated state
    await page.getByRole('button', { name: /Menu/i }).click();
    await expect(drawer).toContainText(/Invitado/i);
    await expect(drawer.getByRole('button', { name: /Cerrar Sesión/i })).not.toBeVisible();
  });
});
