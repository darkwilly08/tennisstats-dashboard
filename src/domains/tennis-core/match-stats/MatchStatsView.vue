<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
    <header class="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-gray-200 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="p-2 bg-primary-alt rounded-lg text-white shadow-glow">
            <span class="material-icons-round">sports_tennis</span>
          </div>
          <div>
            <h1 class="font-display text-2xl font-semibold tracking-wide uppercase">Match Analytics</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Player: Alex "Ace" Johnson</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark shadow-sm border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <span class="material-icons-round text-primary-alt">filter_list</span>
            <span class="text-sm font-medium">Filters</span>
          </button>
          <button class="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" @click="toggleDarkMode">
            <span class="material-icons-round dark:hidden">dark_mode</span>
            <span class="material-icons-round hidden dark:block">light_mode</span>
          </button>
          <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-alt to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
            AJ
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8" v-if="!loading">
      
      <OverviewCards :overview="overview" />
      <HealthDataCards :data="physiological" />

      <!-- Bubble Chart / HR Timeline (Hardcoded for now as it needs a specific match context) -->
      <!-- We can integrate these once we have a mock for a single detailed match view -->

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpponentChart :chartData="opponentChartData" />
        <TrendChart />
      </div>

      <PointBreakdownCards :data="pointBreakdown" />
      <MatchResultsTable :matches="recentMatches" />

    </main>
    <div v-else class="max-w-7xl mx-auto px-6 py-12 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-3xl">refresh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatchStats } from './composables/useMatchStats';
import OverviewCards from './components/OverviewCards.vue';
import HealthDataCards from './components/HealthDataCards.vue';
import MatchResultsTable from './components/MatchResultsTable.vue';
import PointBreakdownCards from './components/PointBreakdownCards.vue';
import OpponentChart from './components/OpponentChart.vue';
import TrendChart from './components/TrendChart.vue';

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

const {
  loading,
  overview,
  recentMatches,
  physiological,
  pointBreakdown,
  opponentChartData
} = useMatchStats();
</script>
