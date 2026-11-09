<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" v-if="!loading">

      <!-- Post-Match Enrichment Notification Banner -->
      <div 
        v-if="pendingEnrichmentMatch"
        class="glass-panel p-4 sm:p-5 rounded-2xl border-l-4 border-l-amber-500 bg-amber-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <span class="material-icons-round text-amber-500 text-3xl">sports_tennis</span>
          <div>
            <h4 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              🎾 ¡Tenés un partido pendiente de completar! (Rival: {{ pendingEnrichmentMatch.rival || 'opponent' }})
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              Registrado recientemente desde tu Wear OS. Asigna el rival real, club y superficie para tus estadísticas.
            </p>
          </div>
        </div>
        <button 
          @click="showEnrichmentModal = true"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all shrink-0 min-h-[44px]"
        >
          Completar Detalles
        </button>
      </div>

      <!-- Empty State if No Matches -->
      <div 
        v-if="matches.length === 0" 
        class="glass-panel p-8 sm:p-12 rounded-2xl text-center space-y-4 border border-dashed border-slate-300 dark:border-slate-700"
      >
        <div class="w-16 h-16 mx-auto rounded-full bg-primary-alt/10 text-primary-alt flex items-center justify-center">
          <span class="material-icons-round text-3xl">watch</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">No hay partidos registrados aún</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Inicia un partido desde tu reloj Wear OS. Tus golpes, frecuencia cardíaca, calorías y puntos se sincronizarán aquí automáticamente.
        </p>
      </div>
      
      <!-- Analytics Dashboard Grid & Visualizations -->
      <OverviewCards :overview="overview" />
      <HealthDataCards :data="physiological" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpponentChart :chartData="opponentChartData" />
        <TrendChart />
      </div>

      <PointBreakdownCards :data="pointBreakdown" />
      <MatchResultsTable :matches="recentMatches" />

    </main>

    <!-- Loading Spinner -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-4xl">refresh</span>
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
