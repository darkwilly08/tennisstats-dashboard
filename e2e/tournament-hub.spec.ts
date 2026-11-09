import { test, expect } from '@playwright/test';

test.describe('Tournament Hub Management', () => {
  test('should render tournament hub view with clean Crear Torneo button without duplicate plus symbols', async ({ page }) => {
    await page.goto('/tournament');

    await expect(page.getByRole('heading', { name: /TOURNAMENT HUB/i })).toBeVisible();
    const createBtn = page.getByRole('button', { name: /Crear Torneo/i }).first();
    await expect(createBtn).toBeVisible();
    await expect(createBtn).not.toContainText('+ Crear Torneo');
  });

  test('should open and close create tournament modal', async ({ page }) => {
    await page.goto('/tournament');

    await page.getByRole('button', { name: /Crear Torneo/i }).first().click();

    await expect(page.getByRole('heading', { name: /Crear Nuevo Torneo/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Abierto Primavera/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Tenis Club/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Polvo de ladrillo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Rápida/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Césped/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Guardar Torneo/i })).toBeVisible();

    await page.getByRole('button', { name: /Cancelar/i }).click();
    await expect(page.getByRole('heading', { name: /Crear Nuevo Torneo/i })).not.toBeVisible();
  });
});
