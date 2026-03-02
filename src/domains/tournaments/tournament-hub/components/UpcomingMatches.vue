<template>
  <div class="glass-panel p-6 rounded-2xl border-t-4 border-t-rose-500 relative overflow-hidden group">
    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <span class="material-icons-round text-8xl text-rose-500">local_fire_department</span>
    </div>
    
    <div class="relative z-10 h-full flex flex-col">
      <h3 class="font-semibold text-lg flex items-center gap-2 mb-2">
        <span class="material-icons-round text-rose-500">notification_important</span>
        Next Match
      </h3>
      
      <div v-if="match" class="flex-1 flex flex-col justify-center">
        <div class="text-center mb-6">
          <div class="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 text-xs font-bold tracking-wider mb-2">
            {{ match.round }}
          </div>
          <h4 class="text-2xl font-display font-bold text-slate-800 dark:text-white">vs {{ match.opponent || 'TBD' }}</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Seed {{ match.opponentSeed || 'Unseeded' }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-center border-t border-b border-gray-100 dark:border-slate-700 py-4 mb-6">
          <div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</div>
            <div class="font-medium text-slate-800 dark:text-white flex items-center justify-center gap-1">
              <span class="material-icons-round text-sm text-primary-alt">schedule</span>
              {{ match.scheduledTime ? new Date(match.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD' }}
            </div>
            <div class="text-xs text-rose-500 font-bold mt-1" v-if="match.status === 'live'">LIVE NOW</div>
          </div>
          <div class="border-l border-gray-100 dark:border-slate-700">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Court</div>
            <div class="font-medium text-slate-800 dark:text-white flex items-center justify-center gap-1">
              <span class="material-icons-round text-sm text-emerald-500">map</span>
              Court 1
            </div>
          </div>
        </div>
        
        <button class="w-full py-3 rounded-xl font-bold bg-primary-alt text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:bg-primary transition-all flex justify-center items-center gap-2">
          <span class="material-icons-round">play_arrow</span>
          Start Tracking
        </button>
      </div>
      <div v-else class="flex-1 flex items-center justify-center text-slate-500">
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
