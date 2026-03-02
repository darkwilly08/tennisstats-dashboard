<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
    <header class="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-gray-200 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="p-2 bg-amber-500 rounded-lg text-white shadow-glow">
            <span class="material-icons-round">emoji_events</span>
          </div>
          <div>
            <h1 class="font-display text-2xl font-semibold tracking-wide uppercase">Tournament Hub</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Active Competition</p>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8" v-if="!loading">
      
      <div v-if="activeTournament">
        <TournamentHeader :tournament="activeTournament" class="mb-8" />
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Upcoming Match & Weather -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <div class="flex-1">
              <UpcomingMatches :match="nextMatch" />
            </div>
            <div class="flex-1">
              <PressureStats :stats="pressureStats!" v-if="pressureStats" />
            </div>
            <div class="h-48">
              <WeatherWidget />
            </div>
          </div>
          
          <!-- Bracket -->
          <div class="lg:col-span-2">
            <BracketVisualization :matches="bracketMatches" />
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20">
        <span class="material-icons-round text-6xl text-slate-300 dark:text-slate-700 mb-4 block">event_available</span>
        <h2 class="text-xl font-semibold text-slate-600 dark:text-slate-400">No active tournaments</h2>
        <p class="text-slate-500 mt-2">Subscribe to a new tournament to see the bracket here.</p>
        <button class="px-6 py-3 mt-6 bg-primary-alt text-white rounded-lg font-medium shadow-sm hover:bg-primary transition-colors">
          Browse Tournaments
        </button>
      </div>
    </main>
    <div v-else class="max-w-7xl mx-auto px-6 py-12 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-3xl">refresh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTournament } from './composables/useTournament';
import TournamentHeader from './components/TournamentHeader.vue';
import BracketVisualization from './components/BracketVisualization.vue';
import UpcomingMatches from './components/UpcomingMatches.vue';
import PressureStats from './components/PressureStats.vue';
import WeatherWidget from './components/WeatherWidget.vue';

const {
  activeTournament,
  bracketMatches,
  pressureStats,
  nextMatch,
  loading
} = useTournament();
</script>
