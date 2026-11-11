<template>
  <div class="bg-background text-on-surface font-sans transition-colors duration-200 min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" v-if="!loading">

      <!-- Post-Match Enrichment Notification Banner -->
      <div 
        v-if="pendingEnrichmentMatch"
        class="glass-panel bg-surface text-on-surface p-4 sm:p-5 rounded-2xl border-l-4 border-l-primary flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <span class="material-icons-round text-2xl">sports_tennis</span>
          </div>
          <div>
            <h4 class="font-bold text-sm sm:text-base text-on-surface">
              🎾 ¡Tenés un partido pendiente de completar! (Rival: {{ pendingEnrichmentMatch.rival || 'opponent' }})
            </h4>
            <p class="text-xs text-on-surface-variant mt-0.5">
              Partido del {{ formatPendingMatchDate(pendingEnrichmentMatch.idt) }} • Score: {{ formatPendingMatchScore(pendingEnrichmentMatch) }} • Asigna el rival real, club y superficie para tus estadísticas.
            </p>
          </div>
        </div>
        <button 
          @click="showEnrichmentModal = true"
          class="btn-primary shrink-0 text-xs sm:text-sm"
        >
          {{ t('analytics.completeDetails', 'Completar Detalles') }}
        </button>
      </div>

      <!-- Rich Empty State & Quick Actions Card if No Matches -->
      <div 
        v-if="matches.length === 0" 
        class="glass-panel bg-surface text-on-surface p-6 sm:p-8 rounded-2xl space-y-6 border border-outline"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-icons-round text-3xl">watch</span>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-bold text-on-surface">{{ t('analytics.noMatches', 'No hay partidos registrados aún') }}</h3>
              <p class="text-xs sm:text-sm text-on-surface-variant max-w-xl mt-0.5">
                {{ !isAuthenticated && !isWebView 
                     ? t('auth.loginPrompt', 'Inicia sesión con Google para sincronizar tus partidos y estadísticas') 
                     : t('analytics.noMatchesDesc', 'Inicia un partido desde tu reloj Wear OS. Tus golpes, frecuencia cardíaca, calorías y puntos se sincronizarán aquí automáticamente.') }}
              </p>
            </div>
          </div>

          <!-- Desktop Google Sign-in Action when unauthenticated -->
          <div v-if="!isAuthenticated && !isWebView" class="shrink-0">
            <button
              type="button"
              @click="handleGoogleSignIn"
              :disabled="isLoggingIn"
              class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-all text-xs sm:text-sm font-semibold shadow-sm min-h-[44px] disabled:opacity-60"
            >
              <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>{{ isLoggingIn ? t('auth.loggingIn', 'Iniciando sesión...') : t('auth.loginWithGoogle', 'Iniciar sesión con Google') }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Actions Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 border-t border-outline-variant">
          <div class="p-4 rounded-xl bg-surface-variant border border-outline-variant flex flex-col justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">watch</span>
              <span class="font-semibold text-sm text-on-surface">{{ t('analytics.startOnWearOS', 'Comenzar Partido en Wear OS') }}</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              {{ t('analytics.startOnWearOSDesc', 'Abre la app en tu reloj antes de entrar a la cancha para registrar cada punto y tus métricas físicas.') }}
            </p>
          </div>

          <router-link 
            to="/tournament"
            class="p-4 rounded-xl bg-surface-variant border border-outline-variant hover:border-primary transition-colors flex flex-col justify-between gap-3 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="material-icons-round text-primary text-xl">emoji_events</span>
                <span class="font-semibold text-sm text-on-surface">{{ t('analytics.createTournament', 'Crear Torneo') }}</span>
              </div>
              <span class="material-icons-round text-on-surface-variant group-hover:text-primary text-sm">arrow_forward</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              {{ t('analytics.createTournamentDesc', 'Organiza tus campeonatos, superficies y sedes para asociar tus próximos partidos oficiales.') }}
            </p>
          </router-link>

          <a 
            href="#recent-matches-section"
            class="p-4 rounded-xl bg-surface-variant border border-outline-variant hover:border-primary transition-colors flex flex-col justify-between gap-3 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="material-icons-round text-primary text-xl">history</span>
                <span class="font-semibold text-sm text-on-surface">{{ t('analytics.viewHistory', 'Ver Historial') }}</span>
              </div>
              <span class="material-icons-round text-on-surface-variant group-hover:text-primary text-sm">arrow_downward</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              {{ t('analytics.viewHistoryDesc', 'Explora la tabla de resultados, desglose de puntos de quiebre y evolución por rival.') }}
            </p>
          </a>
        </div>
      </div>

      <!-- Unified Filter Bar controlling the entire dashboard (Argon High) -->
      <UnifiedFilterBar
        v-if="matches.length > 0"
        v-model:searchQuery="searchQuery"
        v-model:activeFilter="activeFilter"
        v-model:filters="filters"
        :chips="filterChips"
        :placeholder="t('analytics.searchPlaceholder', 'Buscar por rival, torneo o club...')"
        :totalCount="filteredMatches.length"
        :availableTournaments="userTournaments"
        @openFilters="showFilterSheet = true"
        @clearAll="handleClearAllFilters"
      />
      
      <!-- Analytics Dashboard Grid & Visualizations (Fully Reactive to Filters) -->
      <OverviewCards :overview="filteredOverview" />
      <HealthDataCards :data="filteredPhysiological" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpponentChart :chartData="filteredOpponentChartData" />
        <TrendChart :matches="filteredMatches" />
      </div>

      <PointBreakdownCards :data="filteredPointBreakdown" />

      <!-- Recent Matches Section -->
      <div id="recent-matches-section" class="space-y-4">
        <MatchResultsTable 
          :matches="filteredRecentMatches"
          @select="handleSelectMatchRow"
        />
      </div>

    </main>

    <!-- Loading Spinner (Initial load only) -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>

    <!-- Advanced Filter Bottom Sheet -->
    <FilterSheet
      :isOpen="showFilterSheet"
      v-model:filters="filters"
      :availableTournaments="userTournaments"
      :availableRivals="previousRivals"
      @close="showFilterSheet = false"
      @apply="handleFiltersApplied"
    />

    <!-- Post-Match Enrichment Modal (Bottom Sheet) -->
    <MatchEnrichmentModal 
      v-if="pendingEnrichmentMatch"
      :isOpen="showEnrichmentModal"
      :match="pendingEnrichmentMatch"
      :previousRivals="previousRivals"
      @close="showEnrichmentModal = false"
      @enriched="handleMatchEnriched"
    />

    <!-- Tap-to-Edit Match Detail Sheet -->
    <MatchDetailSheet
      :isOpen="showDetailSheet"
      :match="selectedMatchForDetail"
      :previousRivals="previousRivals"
      @close="showDetailSheet = false"
      @updated="handleDetailUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMatchStats } from './composables/useMatchStats';
import { MatchStatsService, formatMatchDate } from './services/matchStatsService';
import OverviewCards from './components/OverviewCards.vue';
import HealthDataCards from './components/HealthDataCards.vue';
import MatchResultsTable from './components/MatchResultsTable.vue';
import PointBreakdownCards from './components/PointBreakdownCards.vue';
import OpponentChart from './components/OpponentChart.vue';
import TrendChart from './components/TrendChart.vue';
import MatchEnrichmentModal from './components/MatchEnrichmentModal.vue';
import MatchDetailSheet from './components/MatchDetailSheet.vue';
import FilterSheet from '@/shared/components/FilterSheet.vue';
import UnifiedFilterBar, { type FilterChip } from '@/shared/components/UnifiedFilterBar.vue';
import { TournamentService, type Tournament } from '@/domains/tournaments/tournament-hub';
import {
  type FilterState,
  createDefaultFilterState
} from '@/shared/types/filters';
import { useI18n } from '@/shared/i18n';
import { useAuth } from '@/shared/composables/useAuth';
import { useSnackbar } from '@/shared/composables/useSnackbar';
import type { MatchPayload } from '../_shared/types';

const { t } = useI18n();
const snackbar = useSnackbar();
const { isAuthenticated, isWebView, isLoggingIn, loginWithGoogle } = useAuth();

const handleGoogleSignIn = async () => {
  try {
    const success = await loginWithGoogle();
    if (success) {
      snackbar.success(t('auth.loginSuccess', 'Sesión iniciada con éxito'));
    }
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
      snackbar.error(t('auth.loginError', 'Error al iniciar sesión con Google'));
    }
  }
};

const showEnrichmentModal = ref(false);
const showDetailSheet = ref(false);
const showFilterSheet = ref(false);
const selectedMatchId = ref<string | null>(null);

const searchQuery = ref('');
const activeFilter = ref('all');
const filters = ref<FilterState>(createDefaultFilterState());
const userTournaments = ref<Tournament[]>([]);

const {
  matches,
  loading,
  pendingEnrichmentMatch,
  previousRivals,
  updateEnrichedMatch
} = useMatchStats();

onMounted(async () => {
  try {
    userTournaments.value = await TournamentService.getTournaments();
  } catch (err) {
    console.warn('Could not load user tournaments in MatchStatsView:', err);
  }
});

const filterChips = computed<FilterChip[]>(() => [
  { label: t('analytics.filterAll', 'Todos'), value: 'all', count: matches.value.length },
  { label: t('analytics.filterWins', 'Victorias'), value: 'wins', count: matches.value.filter(m => m.win).length },
  { label: t('analytics.filterLosses', 'Derrotas'), value: 'losses', count: matches.value.filter(m => !m.win).length },
  { label: t('analytics.filterTournament', 'Oficiales'), value: 'tournament', count: matches.value.filter(m => m.matchType === 'tournament').length },
  { label: t('analytics.filterFriendly', 'Amistosos'), value: 'friendly', count: matches.value.filter(m => m.matchType !== 'tournament').length },
]);

/**
 * Filtered matches based on ALL criteria:
 * text search, outcome, classification, surfaces, tournaments, rivals, and date presets.
 */
const filteredMatches = computed(() => {
  let list = matches.value;

  // 1. Text Search (Rival, Tournament ID, Location, Score)
  const q = (filters.value.searchQuery || searchQuery.value).trim().toLowerCase();
  if (q) {
    list = list.filter(m => {
      const rival = (m.rival || '').toLowerCase();
      const loc = (m.location || '').toLowerCase();
      const tourney = (m.tournamentId || '').toLowerCase();
      const score = m.sets ? m.sets.map(s => `${s.me}-${s.rival}`).join(' ') : (m.win ? '6-4 6-3' : '4-6 3-6');
      return rival.includes(q) || loc.includes(q) || tourney.includes(q) || score.includes(q);
    });
  }

  // 2. Outcome (Wins, Losses)
  const outcome = filters.value.outcome !== 'all' 
    ? filters.value.outcome 
    : (activeFilter.value === 'wins' ? 'wins' : activeFilter.value === 'losses' ? 'losses' : 'all');
  if (outcome === 'wins') {
    list = list.filter(m => m.win);
  } else if (outcome === 'losses') {
    list = list.filter(m => !m.win);
  }

  // 3. Classification (Official/Tournament, Friendly)
  const matchType = filters.value.matchType !== 'all'
    ? filters.value.matchType
    : (activeFilter.value === 'tournament' ? 'tournament' : activeFilter.value === 'friendly' ? 'friendly' : 'all');
  if (matchType === 'tournament') {
    list = list.filter(m => m.matchType === 'tournament');
  } else if (matchType === 'friendly') {
    list = list.filter(m => m.matchType !== 'tournament');
  }

  // 4. Surfaces (Multi-select)
  if (filters.value.surfaces && filters.value.surfaces.length > 0) {
    list = list.filter(m => m.surface && filters.value.surfaces.includes(m.surface));
  }

  // 5. Tournaments (Multi-select)
  if (filters.value.tournaments && filters.value.tournaments.length > 0) {
    list = list.filter(m => m.tournamentId && filters.value.tournaments.includes(m.tournamentId));
  }

  // 6. Rivals (Multi-select)
  if (filters.value.rivals && filters.value.rivals.length > 0) {
    list = list.filter(m => m.rival && filters.value.rivals.some(r => r.toLowerCase() === m.rival?.toLowerCase()));
  }

  // 7. Date Preset
  if (filters.value.datePreset && filters.value.datePreset !== 'all') {
    const now = Date.now();
    if (filters.value.datePreset === '7d') {
      const minDate = now - 7 * 86400000;
      list = list.filter(m => m.idt >= minDate);
    } else if (filters.value.datePreset === '30d') {
      const minDate = now - 30 * 86400000;
      list = list.filter(m => m.idt >= minDate);
    } else if (filters.value.datePreset === '3m') {
      const minDate = now - 90 * 86400000;
      list = list.filter(m => m.idt >= minDate);
    } else if (filters.value.datePreset === '6m') {
      const minDate = now - 180 * 86400000;
      list = list.filter(m => m.idt >= minDate);
    } else if (filters.value.datePreset === 'year') {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      list = list.filter(m => m.idt >= startOfYear);
    }
  }

  // 8. Duration in Sets
  if (filters.value.setsCount && filters.value.setsCount !== 'all') {
    const targetSets = parseInt(filters.value.setsCount, 10);
    list = list.filter(m => (m.sets?.length || 0) === targetSets);
  }

  // 9. Key Tennis Switches
  if (filters.value.withTiebreak) {
    list = list.filter(m => m.tiebreak === true || (m.sets || []).some(s => s.tiebreak != null || s.me === 7 || s.rival === 7));
  }

  if (filters.value.comebackOnly) {
    list = list.filter(m => {
      if (!m.win || !m.sets || m.sets.length < 2) return false;
      const firstSet = m.sets[0];
      return Boolean(firstSet && typeof firstSet.rival === 'number' && typeof firstSet.me === 'number' && firstSet.rival > firstSet.me);
    });
  }

  if (filters.value.withBagel) {
    list = list.filter(m => {
      if (!m.sets) return false;
      return m.sets.some(s => (s.me === 6 && s.rival === 0) || (s.rival === 6 && s.me === 0));
    });
  }

  return list;
});

/**
 * Global Stats Computed Reactively from filteredMatches
 */
const filteredOverview = computed(() => MatchStatsService.computeOverviewStats(filteredMatches.value));
const filteredPhysiological = computed(() => MatchStatsService.computePhysiologicalData(filteredMatches.value));
const filteredPointBreakdown = computed(() => MatchStatsService.computePointBreakdown(filteredMatches.value));
const filteredRecentMatches = computed(() => MatchStatsService.mapToMatchRows(filteredMatches.value));

const filteredOpponentChartData = computed(() => {
  const oppStats: Record<string, { won: number; lost: number }> = {};
  for (const match of filteredMatches.value) {
    const rivalName = match.rival || 'opponent';
    if (!oppStats[rivalName]) oppStats[rivalName] = { won: 0, lost: 0 };
    if (match.win) oppStats[rivalName]!.won++;
    else oppStats[rivalName]!.lost++;
  }

  const labels = Object.keys(oppStats);
  const wonData = labels.map(l => oppStats[l]!.won);
  const lostData = labels.map(l => oppStats[l]!.lost);

  return {
    labels: labels.length > 0 ? labels : ['Sin partidos'],
    datasets: [
      {
        label: 'Won',
        data: wonData.length > 0 ? wonData : [0],
        backgroundColor: '#006C4C',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Lost',
        data: lostData.length > 0 ? lostData : [0],
        backgroundColor: '#64748B',
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ]
  };
});

const handleClearAllFilters = () => {
  searchQuery.value = '';
  activeFilter.value = 'all';
  filters.value = createDefaultFilterState();
};

const handleFiltersApplied = (applied: FilterState) => {
  if (applied.searchQuery !== undefined) searchQuery.value = applied.searchQuery;
  if (applied.outcome !== 'all') {
    activeFilter.value = applied.outcome;
  } else if (applied.matchType !== 'all') {
    activeFilter.value = applied.matchType;
  }
};

const selectedMatchForDetail = computed(() => {
  if (!selectedMatchId.value) return null;
  return matches.value.find(m => (m.id || `match_${m.idt}`) === selectedMatchId.value) || null;
});

const handleSelectMatchRow = (matchId: string) => {
  selectedMatchId.value = matchId;
  showDetailSheet.value = true;
};

const handleDetailUpdated = (updatedData: Partial<MatchPayload>) => {
  if (selectedMatchId.value) {
    updateEnrichedMatch(selectedMatchId.value, updatedData);
  }
};

const handleMatchEnriched = (updatedData: Partial<MatchPayload>) => {
  if (pendingEnrichmentMatch.value?.id) {
    updateEnrichedMatch(pendingEnrichmentMatch.value.id, updatedData);
  }
  showEnrichmentModal.value = false;
};

const formatPendingMatchDate = (idt?: number) => {
  if (!idt) return '';
  return formatMatchDate(idt);
};

const formatPendingMatchScore = (match: MatchPayload) => {
  if (match.sets && match.sets.length > 0) {
    return match.sets.map(s => `${s.me}-${s.rival}`).join(' ');
  }
  return match.win ? '6-4 6-3' : '4-6 3-6';
};
</script>
