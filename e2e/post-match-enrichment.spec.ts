import { test, expect } from '@playwright/test';

test.describe('Post-Match Enrichment Notification & Modal Flow', () => {
  test('should display alert banner for pending match and allow enrichment', async ({ page }) => {
    // Inject a pending match needing enrichment
    await page.addInitScript(() => {
      (window as unknown as { __test_matches: unknown[] }).__test_matches = [
        {
          id: 'test_match_pending',
          userId: 'test_user',
          idt: Date.now() - 3600000,
          fdt: Date.now() - 1800000,
          rival: 'opponent',
          win: true,
          firstService: true,
          games: 12,
          tiebreak: false,
          supertb: false,
          me_points_won: 40,
          me_breaks: 3,
          me_break_points: 5,
          me_serve_won: 20,
          him_points_won: 25,
          him_breaks: 1,
          him_break_points: 2,
          him_serve_won: 12,
          enriched: false,
          sets: [
            {
              id: 1, idt: 1, me: 6, rival: 3, is_complete: true,
              stats: { me: { breaks: 2, break_points: 3, points_won_serving: 12 }, him: { breaks: 0, break_points: 1, points_won_serving: 6 } }
            }
          ]
        },
        {
          id: 'test_match_completed',
          userId: 'test_user',
          idt: Date.now() - 86400000,
          rival: 'Carlos Alcaraz',
          win: false,
          firstService: false,
          games: 15,
          tiebreak: false,
          supertb: false,
          me_points_won: 30,
          me_breaks: 1,
          me_break_points: 2,
          me_serve_won: 15,
          him_points_won: 45,
          him_breaks: 3,
          him_break_points: 4,
          him_serve_won: 25,
          enriched: true,
          sets: []
        }
      ];
    });

    await page.goto('/');

    // 1. Verify Alert Banner
    const banner = page.locator('text=¡Tenés un partido pendiente de completar!');
    await expect(banner).toBeVisible();

    const completeBtn = page.getByRole('button', { name: /Completar Detalles/i });
    await expect(completeBtn).toBeVisible();
    await completeBtn.click();

    // 2. Verify Modal Elements
    await expect(page.getByRole('heading', { name: /Completar Detalles del Partido/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Partido Amistoso/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Torneo Oficial/i })).toBeVisible();

    // Verify Autocomplete suggestion from previous rivals ("Carlos Alcaraz")
    await expect(page.getByRole('button', { name: 'Carlos Alcaraz' })).toBeVisible();

    // Verify Location button
    await expect(page.getByText(/Usar ubicación actual/i)).toBeVisible();

    // Verify Surface buttons
    await expect(page.getByRole('button', { name: /Polvo de ladrillo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Cemento \/ Rápida/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Césped/i })).toBeVisible();

    // 3. Click suggestion to fill rival
    await page.getByRole('button', { name: 'Carlos Alcaraz' }).click();
    await expect(page.getByPlaceholder(/Carlos Alcaraz, Marian/i)).toHaveValue('Carlos Alcaraz');

    // 4. Fill location
    await page.getByPlaceholder(/Buenos Aires Lawn Tennis/i).fill('Club Náutico San Isidro');

    // 5. Select surface
    await page.getByRole('button', { name: /Cemento \/ Rápida/i }).click();

    // 6. Submit
    await page.getByRole('button', { name: /Guardar Detalles/i }).click();

    // 7. Banner should be dismissed immediately because match is now enriched
    await expect(page.getByRole('heading', { name: /Completar Detalles del Partido/i })).not.toBeVisible();
    await expect(page.locator('text=¡Tenés un partido pendiente de completar!')).not.toBeVisible();
  });
});
