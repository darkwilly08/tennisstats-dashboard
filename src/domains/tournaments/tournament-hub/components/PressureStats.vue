<template>
  <div class="glass-panel p-6 rounded-2xl h-full flex flex-col">
    <h3 class="font-semibold text-lg flex items-center gap-2 mb-6 text-slate-800 dark:text-white">
      <span class="material-icons-round text-emerald-500">psychology</span>
      Pressure Performance
    </h3>
    
    <div class="space-y-6 flex-1 flex flex-col justify-center">
      <!-- BP Saved -->
      <div>
        <div class="flex justify-between items-end mb-2">
          <div>
            <div class="text-sm font-medium text-slate-600 dark:text-slate-300">Break Points Saved</div>
            <div class="text-xs text-slate-400 mt-0.5">Tour avg: {{ stats.tournamentAvgBPSaved }}%</div>
          </div>
          <div class="text-2xl font-display font-bold text-emerald-500">{{ stats.breakPointsSavedPct }}<span class="text-sm text-slate-400 font-normal">%</span></div>
        </div>
        <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative">
          <!-- Tour average marker -->
          <div class="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" :style="`left: ${stats.tournamentAvgBPSaved}%`"></div>
          <div class="bg-emerald-500 h-full rounded-full transition-all duration-1000" :style="`width: ${stats.breakPointsSavedPct}%`"></div>
        </div>
      </div>
      
      <!-- TB Win % -->
      <div>
        <div class="flex justify-between items-end mb-2">
          <div>
            <div class="text-sm font-medium text-slate-600 dark:text-slate-300">Tiebreaks Won</div>
            <div class="text-xs text-slate-400 mt-0.5">Your avg: {{ stats.historicalAvgTBWin }}%</div>
          </div>
          <div class="text-2xl font-display font-bold text-amber-500">{{ stats.tiebreakWinPct }}<span class="text-sm text-slate-400 font-normal">%</span></div>
        </div>
        <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative">
           <!-- History marker -->
           <div class="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" :style="`left: ${stats.historicalAvgTBWin}%`"></div>
          <div class="bg-amber-500 h-full rounded-full transition-all duration-1000" :style="`width: ${stats.tiebreakWinPct}%`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TournamentPressureStats } from '../types';

defineProps<{
  stats: TournamentPressureStats
}>();
</script>
