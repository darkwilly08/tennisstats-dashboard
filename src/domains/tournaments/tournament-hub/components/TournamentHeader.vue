<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <span class="material-icons-round text-8xl text-amber-500">emoji_events</span>
    </div>

    <div class="relative z-10 flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex-shrink-0 relative">
        <template v-if="tournament.imageUrl">
          <img :src="tournament.imageUrl" :alt="tournament.name" class="w-full h-full object-cover object-center" />
        </template>
        <template v-else>
          <div class="w-full h-full flex items-center justify-center text-slate-400">
            <span class="material-icons-round text-4xl">stadium</span>
          </div>
        </template>
        <div class="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold tracking-wider text-white bg-amber-500 rounded backdrop-blur-sm shadow-sm">
          {{ tournament.category }}
        </div>
      </div>
      
      <div class="flex-1 min-w-0 flex flex-col justify-center">
        <h2 class="text-3xl font-display font-bold text-slate-800 dark:text-white truncate mb-2">{{ tournament.name }}</h2>
        
        <div class="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-1.5">
            <span class="material-icons-round text-sm text-rose-500">location_on</span>
            <span>{{ tournament.location.venue }}, {{ tournament.location.city }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-icons-round text-sm text-emerald-500">calendar_today</span>
            <span>{{ new Date(tournament.dateRange.start).toLocaleDateString() }} - {{ new Date(tournament.dateRange.end).toLocaleDateString() }}</span>
          </div>
          <div class="flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 px-2 py-0.5 rounded text-xs font-semibold">
            {{ tournament.surface }}
          </div>
        </div>
        
        <div class="mt-4 flex gap-3">
          <button class="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors shadow-sm">
            Draws & Schedule
          </button>
          <button class="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-card-dark">
            Tournament Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tournament } from '../types';

defineProps<{
  tournament: Tournament
}>();
</script>
