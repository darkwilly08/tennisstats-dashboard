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
              Registrado recientemente desde tu Wear OS. Asigna el rival real, club y superficie para tus estadísticas.
            </p>
          </div>
        </div>
        <button 
          @click="showEnrichmentModal = true"
          class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center shrink-0 min-h-[44px] text-xs sm:text-sm"
        >
          Completar Detalles
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
              <h3 class="text-lg sm:text-xl font-bold text-on-surface">No hay partidos registrados aún</h3>
              <p class="text-xs sm:text-sm text-on-surface-variant max-w-xl mt-0.5">
                Inicia un partido desde tu reloj Wear OS. Tus golpes, frecuencia cardíaca, calorías y puntos se sincronizarán aquí automáticamente.
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Actions Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 border-t border-outline-variant">
          <div class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant flex flex-col justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">watch</span>
              <span class="font-semibold text-sm text-on-surface">Comenzar Partido en Wear OS</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              Abre la app en tu reloj antes de entrar a la cancha para registrar cada punto y tus métricas físicas.
            </p>
          </div>

          <router-link 
            to="/tournament"
            class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant hover:border-primary transition-colors flex flex-col justify-between gap-3 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="material-icons-round text-primary text-xl">emoji_events</span>
                <span class="font-semibold text-sm text-on-surface">Crear Torneo</span>
              </div>
              <span class="material-icons-round text-on-surface-variant group-hover:text-primary text-sm">arrow_forward</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              Organiza tus campeonatos, superficies y sedes para asociar tus próximos partidos oficiales.
            </p>
          </router-link>

          <a 
            href="#recent-matches-section"
            class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant hover:border-primary transition-colors flex flex-col justify-between gap-3 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="material-icons-round text-primary text-xl">history</span>
                <span class="font-semibold text-sm text-on-surface">Ver Historial</span>
              </div>
              <span class="material-icons-round text-on-surface-variant group-hover:text-primary text-sm">arrow_downward</span>
            </div>
            <p class="text-xs text-on-surface-variant">
              Explora la tabla de resultados, desglose de puntos de quiebre y evolución por rival.
            </p>
          </a>
        </div>
      </div>
      
      <!-- Analytics Dashboard Grid & Visualizations -->
      <OverviewCards :overview="overview" />
      <HealthDataCards :data="physiological" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpponentChart :chartData="opponentChartData" />
        <TrendChart />
      </div>

      <PointBreakdownCards :data="pointBreakdown" />
      <div id="recent-matches-section">
        <MatchResultsTable :matches="recentMatches" />
      </div>

    </main>

    <!-- Loading Spinner -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>

    <!-- Post-Match Enrichment Modal -->
    <MatchEnrichmentModal 
      v-if="showEnrichmentModal && pendingEnrichmentMatch"
      :match="pendingEnrichmentMatch"
      :previousRivals="previousRivals"
      @close="showEnrichmentModal = false"
      @enriched="handleMatchEnriched"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMatchStats } from './composables/useMatchStats';
import OverviewCards from './components/OverviewCards.vue';
import HealthDataCards from './components/HealthDataCards.vue';
import MatchResultsTable from './components/MatchResultsTable.vue';
import PointBreakdownCards from './components/PointBreakdownCards.vue';
import OpponentChart from './components/OpponentChart.vue';
import TrendChart from './components/TrendChart.vue';
import MatchEnrichmentModal from './components/MatchEnrichmentModal.vue';
import type { MatchPayload } from '../_shared/types';

const showEnrichmentModal = ref(false);

const {
  matches,
  loading,
  overview,
  recentMatches,
  physiological,
  pointBreakdown,
  opponentChartData,
  pendingEnrichmentMatch,
  previousRivals,
  updateEnrichedMatch
} = useMatchStats();

const handleMatchEnriched = (updatedData: Partial<MatchPayload>) => {
  if (pendingEnrichmentMatch.value?.id) {
    updateEnrichedMatch(pendingEnrichmentMatch.value.id, updatedData);
  }
  showEnrichmentModal.value = false;
};
</script>
