import { test, expect } from '@playwright/test';

test.describe('Tennis Filters & BottomSheet Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    // Inject test matches and tournaments so UnifiedFilterBar is rendered
    await page.addInitScript(() => {
      (window as unknown as { __test_tournaments: unknown[] }).__test_tournaments = [
        {
          id: 'tourney_club_open',
          userId: 'test_user',
          name: 'Torneo Abierto Club Central',
          location: 'Club Central',
          surface: 'Clay',
          status: 'active',
          startDate: Date.now() - 604800000,
        }
      ];

      (window as unknown as { __test_matches: unknown[] }).__test_matches = [
        {
          id: 'match_1',
          userId: 'test_user',
          idt: Date.now() - 7200000,
          fdt: Date.now() - 3600000,
          rival: 'Novak Djokovic',
          win: true,
          matchType: 'tournament',
          tournamentId: 'tourney_club_open',
          location: 'Club Central',
          surface: 'Clay',
          tiebreak: true,
          sets: [
            { id: 1, me: 4, rival: 6 },
            { id: 2, me: 7, rival: 6, tiebreak: { me: 7, him: 5 } },
            { id: 3, me: 6, rival: 0 }
          ],
          me_breaks: 4,
          me_break_points: 6,
          me_points_won: 55,
          him_points_won: 42,
          enriched: true,
          health_metrics: {
            active_calories: 520,
            duration_minutes: 85,
            heart_rate: { avg: 145, max: 178 },
            total_steps: 4200,
          }
        }
      ];
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should lock body scroll when BottomSheet is open and unlock on close', async ({ page }) => {
    // Initially body should not have overflow hidden
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(initialOverflow).not.toBe('hidden');

    // Click Filters button to open FilterSheet
    const filtersBtn = page.getByRole('button', { name: /Filtros/i }).first();
    await expect(filtersBtn).toBeVisible();
    await filtersBtn.click();

    // Verify BottomSheet is visible
    const sheetTitle = page.locator('h3:has-text("Filtros de Partidos")');
    await expect(sheetTitle).toBeVisible();

    // Verify body overflow is locked to hidden
    const lockedOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(lockedOverflow).toBe('hidden');

    // Close the sheet via close button or backdrop
    const closeBtn = page.locator('button[aria-label="Cerrar"]').first();
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Verify BottomSheet closes and body overflow is restored
    await expect(sheetTitle).not.toBeVisible();
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('');
  });

  test('should render full-width action buttons on mobile in FilterSheet', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Open FilterSheet
    const filtersBtn = page.getByRole('button', { name: /Filtros/i }).first();
    await expect(filtersBtn).toBeVisible();
    await filtersBtn.click();

    // Verify the Apply Filters button takes full width of container on mobile
    const applyBtn = page.getByRole('button', { name: /Aplicar Filtros/i });
    await expect(applyBtn).toBeVisible();
    
    const applyBtnBox = await applyBtn.boundingBox();
    expect(applyBtnBox).not.toBeNull();
    // On 375px viewport with padding, full width button should be > 280px
    expect(applyBtnBox!.width).toBeGreaterThan(280);

    const clearBtn = page.getByRole('button', { name: 'Limpiar' }).last();
    const clearBtnBox = await clearBtn.boundingBox();
    expect(clearBtnBox).not.toBeNull();
    expect(clearBtnBox!.width).toBeGreaterThan(280);
  });

  test('should display merged tennis dynamic switches (Tiebreak, Remontadas, Bagels 6-0)', async ({ page }) => {
    const filtersBtn = page.getByRole('button', { name: /Filtros/i }).first();
    await expect(filtersBtn).toBeVisible();
    await filtersBtn.click();

    // Verify tennis switches from stitch mockup
    await expect(page.getByText('Partidos con Tiebreak')).toBeVisible();
    await expect(page.getByText('Remontadas / Set Decisivo')).toBeVisible();
    await expect(page.getByText('Sets en blanco (6-0 / Bagels)')).toBeVisible();
    await expect(page.getByText('Indoor / Cubierta')).toBeVisible();

    // Toggle Tiebreak switch
    await page.getByText('Partidos con Tiebreak').click();

    // Apply filters
    await page.getByRole('button', { name: /Aplicar Filtros/i }).click();

    // Verify active filter tag appeared in UnifiedFilterBar
    const tag = page.locator('span:has-text("Tiebreak")').first();
    await expect(tag).toBeVisible();
  });
});
