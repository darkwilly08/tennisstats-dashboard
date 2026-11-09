import { test, expect } from '@playwright/test';

test.describe('Tournament Hub Management', () => {
  test('should render tournament hub view with create tournament button or empty state', async ({ page }) => {
    await page.goto('/tournament');

    await expect(page.getByRole('heading', { name: /TOURNAMENT HUB/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /\+ Crear Torneo/i }).first()).toBeVisible();
  });

  test('should open and close create tournament modal', async ({ page }) => {
    await page.goto('/tournament');

    await page.getByRole('button', { name: /\+ Crear Torneo/i }).first().click();

    // Verify modal elements
    await expect(page.getByRole('heading', { name: /Crear Nuevo Torneo/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Abierto Primavera/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Tenis Club/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Polvo de ladrillo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Rápida/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Césped/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Guardar Torneo/i })).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: /Cancelar/i }).click();
    await expect(page.getByRole('heading', { name: /Crear Nuevo Torneo/i })).not.toBeVisible();
  });
});
