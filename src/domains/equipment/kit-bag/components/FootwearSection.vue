<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden h-full">
    <div class="absolute top-0 right-0 p-4 opacity-10">
      <span class="material-icons-round text-8xl text-indigo-500">directions_run</span>
    </div>

    <div class="relative z-10">
      <h2 class="text-xl font-display font-semibold mb-6 flex items-center gap-2">
        <span class="material-icons-round text-indigo-500">ice_skating</span>
        Footwear Track
      </h2>
      
      <div v-for="shoe in shoes" :key="shoe.id" class="flex gap-4 items-center mb-4 last:mb-0 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-slate-700/40 transition-colors">
        <div class="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex-shrink-0">
          <template v-if="shoe.imageUrl">
            <img :src="shoe.imageUrl" :alt="shoe.model" class="w-full h-full object-cover object-center" />
          </template>
          <template v-else>
            <div class="w-full h-full flex items-center justify-center text-slate-400">
              <span class="material-icons-round text-2xl">ice_skating</span>
            </div>
          </template>
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ shoe.brand }}</span>
            <span v-if="shoe.status === 'active'" class="w-2 h-2 rounded-full bg-emerald-500 shadow-glow" title="Active Flow"></span>
            <span v-else class="w-2 h-2 rounded-full bg-slate-400" title="Retired"></span>
          </div>
          <h4 class="font-bold text-slate-800 dark:text-white truncate text-sm">{{ shoe.model }}</h4>
          <p class="text-xs text-slate-500 mt-0.5">{{ shoe.surface }}</p>
        </div>
        
        <div class="text-right">
          <div class="text-lg font-display font-bold text-indigo-500">{{ shoe.distanceCoveredKm }}</div>
          <div class="text-[10px] text-slate-400 font-medium">km run</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shoe } from '../types';

defineProps<{
  shoes: Shoe[]
}>();
</script>
