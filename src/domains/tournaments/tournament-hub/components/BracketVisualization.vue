<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden h-full">
    <div class="absolute top-0 right-0 p-4 opacity-5">
      <span class="material-icons-round text-9xl text-slate-800 dark:text-white">account_tree</span>
    </div>
    
    <div class="relative z-10">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-semibold text-lg flex items-center gap-2">
          <span class="material-icons-round text-primary-alt">account_tree</span>
          Tournament Bracket
        </h3>
        <button class="text-xs font-bold text-primary-alt hover:underline uppercase tracking-wider">Full Draw</button>
      </div>
      
      <div class="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-6 space-y-8 py-2">
        
        <div v-for="match in matches" :key="match.id" class="relative">
          <!-- Connection line -->
          <div class="absolute top-1/2 -left-[26px] w-[24px] h-0.5 bg-slate-200 dark:bg-slate-700"></div>
          
          <!-- Node dot -->
          <div class="absolute top-1/2 -left-[30px] w-2.5 h-2.5 rounded-full transform -translate-y-1/2" 
               :class="getNodeColorClass(match)">
          </div>
          
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{{ match.round }}</div>
          
          <div class="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-3 shadow-sm hover:border-primary-alt dark:hover:border-primary-alt transition-colors">
            <div class="flex justify-between items-center mb-2">
              <div class="font-medium text-sm flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold" title="You">Y</span>
                <span>You</span>
              </div>
              <div v-if="match.result === 'win'" class="text-xs font-bold text-emerald-500">
                <span class="material-icons-round text-[14px] align-text-bottom">check_circle</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="font-medium text-sm flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span class="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">{{ match.opponentSeed ? match.opponentSeed : '-' }}</span>
                <span>{{ match.opponent || 'TBD' }}</span>
              </div>
            </div>
            
            <div class="mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center text-xs">
              <span class="font-display font-medium px-2 py-0.5 rounded" 
                    :class="match.result === 'win' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'">
                {{ match.score || 'Upcoming' }}
              </span>
              <span v-if="match.status === 'live'" class="text-rose-500 font-bold animate-pulse flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BracketMatch } from '../types';

defineProps<{
  matches: BracketMatch[]
}>();

const getNodeColorClass = (match: BracketMatch) => {
  if (match.status === 'live') return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse';
  if (match.result === 'win') return 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]';
  if (match.result === 'loss') return 'bg-rose-500';
  return 'bg-slate-300 dark:bg-slate-600';
};
</script>
