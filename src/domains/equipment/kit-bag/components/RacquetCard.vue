<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 h-full">
    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
      <span class="material-icons-round text-8xl text-primary">sports_tennis</span>
    </div>

    <!-- Racquet Header -->
    <div class="relative z-10 flex gap-6">
      <div class="w-32 h-32 rounded-xl overflow-hidden bg-surface-variant border border-outline flex-shrink-0 relative">
        <template v-if="racquet.imageUrl">
          <img :src="racquet.imageUrl" :alt="racquet.name" class="w-full h-full object-cover object-center" />
        </template>
        <template v-else>
          <div class="w-full h-full flex items-center justify-center text-on-surface-variant">
            <span class="material-icons-round text-4xl">sports_tennis</span>
          </div>
        </template>
        <div class="absolute top-2 left-2">
          <span v-if="racquet.role === 'primary'" class="px-2 py-1 text-[10px] font-bold tracking-wider bg-primary-container text-on-primary-container rounded shadow-sm">
            Primary
          </span>
          <span v-else-if="racquet.role === 'backup'" class="px-2 py-1 text-[10px] font-bold tracking-wider bg-secondary-container text-on-secondary-container rounded shadow-sm">
            Backup
          </span>
        </div>
      </div>
      
      <div class="flex-1 min-w-0 pr-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{{ racquet.brand }}</span>
        </div>
        <h3 class="text-xl font-display font-bold text-on-surface truncate">{{ racquet.name }}</h3>
        
        <div class="w-full max-w-[200px] mt-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-on-surface-variant">Restring Health</span>
            <span class="font-semibold text-primary">
              {{ Math.max(0, racquet.estimatedLifeHours - racquet.hoursPlayed).toFixed(1) }}h left
            </span>
          </div>
          <div class="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
            <div class="bg-primary h-full rounded-full transition-all duration-500" :style="`width: ${healthPercentage}%`"></div>
          </div>
          <p class="text-xs text-on-surface-variant mt-1 flex justify-between">
            <span>{{ racquet.hoursPlayed }}h played</span>
            <span>Est. {{ racquet.estimatedLifeHours }}h</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Racquet Details -->
    <div class="relative z-10 mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant">
      <div>
        <span class="text-xs font-medium text-on-surface-variant block mb-1">Current String Setup</span>
        <div class="font-semibold text-on-surface flex items-center gap-2">
          <span class="material-icons-round text-sm text-primary">line_weight</span>
          <span class="truncate">{{ racquet.stringSetup.name }}</span>
        </div>
        <div class="text-sm font-bold text-on-surface-variant mt-0.5 ml-6">
          {{ racquet.stringSetup.tension }} {{ racquet.stringSetup.unit }}
        </div>
      </div>
      
      <div>
        <span class="text-xs font-medium text-on-surface-variant block mb-1">Last Restring</span>
        <div class="font-semibold text-on-surface flex items-center gap-2">
          <span class="material-icons-round text-sm text-primary">build</span>
          {{ new Date(racquet.lastRestringDate).toLocaleDateString() }}
        </div>
        <div class="text-xs text-on-surface-variant mt-1 ml-6">
          {{ Math.floor((new Date().getTime() - racquet.lastRestringDate) / (1000 * 60 * 60 * 24)) }} days ago
        </div>
      </div>
    </div>
    
    <!-- Action buttons -->
    <div class="relative z-10 mt-6 flex gap-2">
      <button class="flex-1 bg-surface border border-outline text-on-surface hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 min-h-[40px]">
        <span class="material-icons-round text-sm text-primary">healing</span>
        Log Restring
      </button>
      <button class="flex-1 bg-surface border border-outline text-on-surface hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 min-h-[40px]">
        <span class="material-icons-round text-sm text-on-surface-variant">edit</span>
        Edit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Racquet } from '../types';

const props = defineProps<{
  racquet: Racquet
}>();

const healthPercentage = computed(() => {
  const p = 100 - ((props.racquet.hoursPlayed / props.racquet.estimatedLifeHours) * 100);
  return Math.max(0, Math.min(100, p));
});
</script>
