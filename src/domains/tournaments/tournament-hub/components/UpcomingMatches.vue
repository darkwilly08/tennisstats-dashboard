<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border-t-4 border-t-primary relative overflow-hidden group">
    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <span class="material-icons-round text-8xl text-primary">sports_tennis</span>
    </div>
    
    <div class="relative z-10 h-full flex flex-col">
      <h3 class="font-semibold text-lg flex items-center gap-2 mb-2 text-on-surface">
        <span class="material-icons-round text-primary">notification_important</span>
        Next Match
      </h3>
      
      <div v-if="match" class="flex-1 flex flex-col justify-center">
        <div class="text-center mb-6">
          <div class="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold tracking-wider mb-2">
            {{ match.round }}
          </div>
          <h4 class="text-2xl font-display font-bold text-on-surface">vs {{ match.opponent || 'TBD' }}</h4>
          <p class="text-sm text-on-surface-variant mt-1">Seed {{ match.opponentSeed || 'Unseeded' }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-center border-t border-b border-outline-variant py-4 mb-6">
          <div>
            <div class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Time</div>
            <div class="font-semibold text-on-surface flex items-center justify-center gap-1">
              <span class="material-icons-round text-sm text-primary">schedule</span>
              {{ match.scheduledTime ? new Date(match.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD' }}
            </div>
            <div class="text-xs text-primary font-bold mt-1" v-if="match.status === 'live'">LIVE NOW</div>
          </div>
          <div class="border-l border-outline-variant">
            <div class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Court</div>
            <div class="font-semibold text-on-surface flex items-center justify-center gap-1">
              <span class="material-icons-round text-sm text-primary">map</span>
              {{ match.court || 'Court 1' }}
            </div>
          </div>
        </div>
        
        <button class="w-full bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 min-h-[44px]">
          <span class="material-icons-round">play_arrow</span>
          <span>Start Tracking</span>
        </button>
      </div>
      <div v-else class="flex-1 flex items-center justify-center text-on-surface-variant text-sm py-6">
        No upcoming matches.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BracketMatch } from '../types';

defineProps<{
  match: BracketMatch | null
}>();
</script>
