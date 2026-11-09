<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl h-full flex flex-col">
    <h3 class="font-semibold text-lg flex items-center gap-2 mb-6 text-on-surface">
      <span class="material-icons-round text-primary">psychology</span>
      Pressure Performance
    </h3>
    
    <div class="space-y-6 flex-1 flex flex-col justify-center">
      <div>
        <div class="flex justify-between items-end mb-2">
          <div>
            <div class="text-sm font-semibold text-on-surface">Break Points Saved</div>
            <div class="text-xs text-on-surface-variant mt-0.5">Tour avg: {{ stats.tournamentAvgBPSaved }}%</div>
          </div>
          <div class="text-2xl font-display font-bold text-primary">{{ stats.breakPointsSavedPct }}<span class="text-sm text-on-surface-variant font-normal">%</span></div>
        </div>
        <div class="w-full bg-surface-variant h-2 rounded-full overflow-hidden relative">
          <div class="absolute top-0 bottom-0 w-0.5 bg-outline z-10" :style="`left: ${stats.tournamentAvgBPSaved}%`"></div>
          <div class="bg-primary h-full rounded-full transition-all duration-1000" :style="`width: ${stats.breakPointsSavedPct}%`"></div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between items-end mb-2">
          <div>
            <div class="text-sm font-semibold text-on-surface">Tiebreaks Won</div>
            <div class="text-xs text-on-surface-variant mt-0.5">Your avg: {{ stats.historicalAvgTBWin }}%</div>
          </div>
          <div class="text-2xl font-display font-bold text-primary">{{ stats.tiebreakWinPct }}<span class="text-sm text-on-surface-variant font-normal">%</span></div>
        </div>
        <div class="w-full bg-surface-variant h-2 rounded-full overflow-hidden relative">
          <div class="absolute top-0 bottom-0 w-0.5 bg-outline z-10" :style="`left: ${stats.historicalAvgTBWin}%`"></div>
          <div class="bg-primary h-full rounded-full transition-all duration-1000" :style="`width: ${stats.tiebreakWinPct}%`"></div>
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
