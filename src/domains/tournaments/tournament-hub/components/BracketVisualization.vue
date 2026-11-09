<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden h-full">
    <div class="absolute top-0 right-0 p-4 opacity-5">
      <span class="material-icons-round text-9xl text-on-surface">account_tree</span>
    </div>
    
    <div class="relative z-10">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-semibold text-lg flex items-center gap-2 text-on-surface">
          <span class="material-icons-round text-primary">account_tree</span>
          Tournament Bracket
        </h3>
        <button class="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Full Draw</button>
      </div>
      
      <div class="relative border-l-2 border-outline ml-4 pl-6 space-y-8 py-2">
        <div v-for="match in matches" :key="match.id" class="relative">
          <div class="absolute top-1/2 -left-[26px] w-[24px] h-0.5 bg-outline"></div>
          <div class="absolute top-1/2 -left-[30px] w-2.5 h-2.5 rounded-full transform -translate-y-1/2" 
               :class="getNodeColorClass(match)">
          </div>
          
          <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">{{ match.round }}</div>
          
          <div class="bg-surface-variant/60 border border-outline-variant rounded-xl p-3.5 shadow-sm hover:border-primary transition-colors">
            <div class="flex justify-between items-center mb-2">
              <div class="font-semibold text-sm flex items-center gap-2 text-on-surface">
                <span class="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">Y</span>
                <span>You</span>
              </div>
              <div v-if="match.result === 'win'" class="text-xs font-bold text-primary">
                <span class="material-icons-round text-[16px] align-text-bottom">check_circle</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="font-medium text-sm flex items-center gap-2 text-on-surface-variant">
                <span class="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold">{{ match.opponentSeed ? match.opponentSeed : '-' }}</span>
                <span>{{ match.opponent || 'TBD' }}</span>
              </div>
            </div>
            
            <div class="mt-3 pt-2 border-t border-outline-variant flex justify-between items-center text-xs">
              <span class="font-display font-semibold px-2.5 py-0.5 rounded-md" 
                    :class="match.result === 'win' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'">
                {{ match.score || 'Upcoming' }}
              </span>
              <span v-if="match.status === 'live'" class="text-primary font-bold animate-pulse flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span> LIVE
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
  if (match.status === 'live') return 'bg-primary animate-pulse';
  if (match.result === 'win') return 'bg-primary';
  return 'bg-outline';
};
</script>
