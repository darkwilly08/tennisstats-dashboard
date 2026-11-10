import { test, expect } from '@playwright/test';

test.describe('Web Dashboard Masterclass Features', () => {
  test.beforeEach(async ({ page }) => {
    // Inject test matches and tournaments
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
        },
        {
          id: 'tourney_master_series',
          userId: 'test_user',
          name: 'Copa Master Series',
          location: 'Buenos Aires',
          surface: 'Hard',
          status: 'upcoming',
          startDate: Date.now() + 86400000,
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
          me_breaks: 4,
          me_break_points: 6,
          me_points_won: 55,
          him_points_won: 42,
          enriched: true,
          health_metrics: {
            active_calories: 620,
            total_steps: 4100,
            heart_rate: { avg: 145, max: 178 },
          },
          sets: [
            { id: 1, me: 6, rival: 4, is_complete: true },
            { id: 2, me: 7, rival: 6, tiebreak: { him: 5 }, is_complete: true }
          ]
        },
        {
          id: 'match_2',
          userId: 'test_user',
          idt: Date.now() - 86400000,
          fdt: Date.now() - 82800000,
          rival: 'Rafael Nadal',
          win: false,
          matchType: 'friendly',
          location: 'Court Philippe-Chatrier',
          surface: 'Clay',
          me_breaks: 1,
          me_break_points: 3,
          me_points_won: 38,
          him_points_won: 52,
          enriched: true,
          health_metrics: {
            active_calories: 510,
            total_steps: 3200,
            heart_rate: { avg: 152, max: 184 },
          },
          sets: [
            { id: 1, me: 3, rival: 6, is_complete: true },
            { id: 2, me: 4, rival: 6, is_complete: true }
          ]
        }
      ];
    });
  });

  test('should render dark mode inputs with #1E293B surface-variant and #F8FAFC text', async ({ page }) => {
    await page.goto('/tournament');

    // Ensure dark mode is active
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    // Open create tournament sheet
    const createBtn = page.getByRole('button', { name: /Crear Torneo/i }).first();
    await createBtn.click();

    const nameInput = page.getByPlaceholder(/Abierto Primavera/i);
    await expect(nameInput).toBeVisible();

    const styles = await nameInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        bg: computed.backgroundColor,
        color: computed.color,
      };
    });

    // Dark mode input: rgb(30, 41, 59) is #1E293B, rgb(248, 250, 252) is #F8FAFC
    expect(styles.bg).toBe('rgb(30, 41, 59)');
    expect(styles.color).toBe('rgb(248, 250, 252)');
  });

  test('should display native-feeling bottom sheet on mobile viewports (<640px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/tournament');

    const createBtn = page.getByRole('button', { name: /Crear Torneo/i }).first();
    await createBtn.click();

    // Verify modal has bottom sheet structure and drag handle pill
    const dragHandle = page.locator('.w-12.h-1\\.5.bg-outline-variant.rounded-full');
    await expect(dragHandle).toBeVisible();

    // Cancel / close sheet
    await page.getByRole('button', { name: /Cancelar/i }).click();
    await expect(dragHandle).not.toBeVisible();
  });

  test('should tap on match row and open MatchDetailSheet with physical metrics and edit options', async ({ page }) => {
    await page.goto('/');

    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Click the first match row
    const firstRow = page.locator('tbody tr').first();
    await firstRow.click();

    // Verify MatchDetailSheet opens
    await expect(page.getByRole('heading', { name: /Detalles del Partido/i })).toBeVisible();
    await expect(page.getByText(/Calorías/i)).toBeVisible();
    await expect(page.getByText(/FC Prom/i)).toBeVisible();
    await expect(page.getByText(/Distancia/i)).toBeVisible();

    // Verify set scores breakdown
    await expect(page.getByText(/Set 1:/i)).toBeVisible();
    await expect(page.getByText(/Set 2:/i)).toBeVisible();

    // Edit rival name
    const rivalInput = page.getByPlaceholder(/Carlos Alcaraz, Marian/i);
    await expect(rivalInput).toBeVisible();
    await rivalInput.fill('Novak Djokovic (Edited)');

    // Save changes
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Verify sheet closed
    await expect(page.getByRole('heading', { name: /Detalles del Partido/i })).not.toBeVisible();

    // Verify snackbar appears with success message
    const snackbar = page.locator('[role="alert"]');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toContainText(/Partido actualizado con éxito/i);

    // Verify row now shows updated rival
    await expect(table).toContainText('Novak Djokovic (Edited)');
  });

  test('should navigate to fullscreen Configuración view at /settings', async ({ page }) => {
    await page.goto('/');

    // Click settings icon in header
    const settingsBtn = page.getByRole('button', { name: /Ajustes & Servicios/i });
    await settingsBtn.click();

    // URL should be /settings
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.locator('header')).toContainText(/CONFIGURACIÓN/i);

    // Verify Theme controls
    await expect(page.getByText(/Apariencia del Tema/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Modo Claro/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Modo Oscuro/i })).toBeVisible();

    // Verify Language controls (i18n)
    await expect(page.getByText(/Idioma \/ Language/i)).toBeVisible();
    const englishBtn = page.getByRole('button', { name: /English/i });
    await expect(englishBtn).toBeVisible();
    await englishBtn.click();

    // Toast notification for language change
    await expect(page.locator('[role="alert"]')).toContainText(/Language changed to English/i);

    // Verify Health Connect section
    await expect(page.getByText(/Health Connect & Wear OS/i)).toBeVisible();
    await expect(page.getByText(/Conectado/i)).toBeVisible();

    // Verify Version
    await expect(page.getByText(/v1.4.0/i)).toBeVisible();
  });

  test('should filter matches using UnifiedFilterBar', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/Buscar por rival/i);
    await expect(searchInput).toBeVisible();

    // Filter by search query "Djokovic"
    await searchInput.fill('Djokovic');
    await expect(page.locator('table')).toContainText('Novak Djokovic');
    await expect(page.locator('table')).not.toContainText('Rafael Nadal');

    // Clear search
    await searchInput.fill('');

    // Filter by "Victorias" chip
    await page.getByRole('button', { name: /Victorias/i }).click();
    await expect(page.locator('table')).toContainText('Novak Djokovic');
    await expect(page.locator('table')).not.toContainText('Rafael Nadal');

    // Filter by "Derrotas" chip
    await page.getByRole('button', { name: /Derrotas/i }).click();
    await expect(page.locator('table')).toContainText('Rafael Nadal');
    await expect(page.locator('table')).not.toContainText('Novak Djokovic');
  });

  test('should render sleek Crear Torneo button without duplicate plus icon and display tournament matches', async ({ page }) => {
    await page.goto('/tournament');

    const createBtn = page.getByRole('button', { name: /Crear Torneo/i }).first();
    await expect(createBtn).toBeVisible();
    await expect(createBtn).not.toContainText('+ Crear Torneo');

    // Verify search filter in TournamentHub
    await expect(page.getByPlaceholder(/Buscar torneo por nombre o club/i)).toBeVisible();

    // Verify tournament matches are displayed
    await expect(page.getByRole('heading', { name: /Partidos Oficiales Jugados/i })).toBeVisible();
    await expect(page.locator('body')).toContainText('vs Novak Djokovic');
  });

  test('should update global stats, KPIs, and active filter tags when filtering', async ({ page }) => {
    await page.goto('/');

    // Initially 2 matches recorded
    const overviewCard = page.locator('.glass-panel').first();
    await expect(overviewCard).toContainText('2');

    // Filter by "Victorias"
    await page.getByRole('button', { name: /Victorias/i }).click();

    // Verify Active Filter Tag is displayed
    const filterTag = page.getByText(/Resultado: Victorias/i);
    await expect(filterTag).toBeVisible();

    // Overview KPIs should now recompute to 1 match
    await expect(overviewCard).toContainText('1');

    // Table should only show Novak Djokovic
    await expect(page.locator('table')).toContainText('Novak Djokovic');
    await expect(page.locator('table')).not.toContainText('Rafael Nadal');

    // Remove the filter tag using the ✕ button
    const removeTagBtn = page.getByRole('button', { name: /Quitar filtro/i });
    await expect(removeTagBtn).toBeVisible();
    await removeTagBtn.click();

    // Overview KPIs should return to 2 matches
    await expect(overviewCard).toContainText('2');
    await expect(page.locator('table')).toContainText('Rafael Nadal');
  });

  test('should open FilterSheet, apply multi-criteria filters, and clear all', async ({ page }) => {
    await page.goto('/');

    // Open advanced filter sheet
    const filtersBtn = page.getByRole('button', { name: /Filtros/i }).first();
    await expect(filtersBtn).toBeVisible();
    await filtersBtn.click();

    // Verify FilterSheet opens
    await expect(page.getByRole('heading', { name: /Filtros de Partidos/i })).toBeVisible();

    // Select surface "Polvo de ladrillo"
    const clayChip = page.getByRole('button', { name: /Polvo de ladrillo/i }).first();
    await clayChip.click();

    // Apply filters
    const applyBtn = page.getByRole('button', { name: /Aplicar Filtros/i });
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // Verify FilterSheet closed
    await expect(page.getByRole('heading', { name: /Filtros de Partidos/i })).not.toBeVisible();

    // Verify surface tag is rendered
    await expect(page.getByText(/Superficie: Polvo de ladrillo/i)).toBeVisible();

    // Clear all filters via "Limpiar filtros"
    const clearAllBtn = page.getByRole('button', { name: /Limpiar filtros/i });
    await expect(clearAllBtn).toBeVisible();
    await clearAllBtn.click();

    // Verify tag is dismissed
    await expect(page.getByText(/Superficie: Polvo de ladrillo/i)).not.toBeVisible();
  });

  test('should switch active tournament in TournamentHubView using the M3 selector', async ({ page }) => {
    await page.goto('/tournament');

    // Verify initial active tournament
    await expect(page.locator('body')).toContainText('Torneo Abierto Club Central');

    // Switch to Copa Master Series using the M3 tournament chip
    const masterSeriesChip = page.getByRole('button', { name: /Copa Master Series/i });
    await expect(masterSeriesChip).toBeVisible();
    await masterSeriesChip.click();

    // Verify active tournament switched
    await expect(page.locator('body')).toContainText('Copa Master Series');
  });
});
