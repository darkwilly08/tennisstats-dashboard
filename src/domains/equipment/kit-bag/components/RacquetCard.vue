<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300 h-full border border-gray-100 dark:border-slate-700/50">
    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <span class="material-icons-round text-8xl text-primary-alt">sports_tennis</span>
    </div>

    <!-- Racquet Header -->
    <div class="relative z-10 flex gap-6">
      <div class="w-32 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex-shrink-0 relative group-hover:shadow-md transition-shadow">
        <template v-if="racquet.imageUrl">
          <img :src="racquet.imageUrl" :alt="racquet.name" class="w-full h-full object-cover object-center" />
        </template>
        <template v-else>
          <div class="w-full h-full flex items-center justify-center text-slate-400">
            <span class="material-icons-round text-4xl">sports_tennis</span>
          </div>
        </template>
        <!-- Status Badge overlay on image -->
        <div class="absolute top-2 left-2">
          <span v-if="racquet.role === 'primary'" class="px-2 py-1 text-[10px] font-bold tracking-wider text-white bg-emerald-500 rounded backdrop-blur-sm shadow-sm">
            Primary
          </span>
          <span v-else-if="racquet.role === 'backup'" class="px-2 py-1 text-[10px] font-bold tracking-wider text-white bg-slate-500 rounded backdrop-blur-sm shadow-sm">
            Backup
          </span>
        </div>
      </div>
      
      <div class="flex-1 min-w-0 pr-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ racquet.brand }}</span>
        </div>
        <h3 class="text-xl font-display font-bold text-slate-800 dark:text-white truncate">{{ racquet.name }}</h3>
        
        <div class="w-full max-w-[200px] mt-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-slate-500 dark:text-slate-400">Restring Health</span>
            <span :class="healthColorClass" class="font-medium">
              {{ Math.max(0, racquet.estimatedLifeHours - racquet.hoursPlayed).toFixed(1) }}h left
            </span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div :class="progressBarColorClass" class="h-full rounded-full transition-all duration-500" :style="`width: ${healthPercentage}%`"></div>
          </div>
          <p class="text-xs text-slate-400 mt-1 flex justify-between">
            <span>{{ racquet.hoursPlayed }}h played</span>
            <span>Est. {{ racquet.estimatedLifeHours }}h</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Racquet Details -->
    <div class="relative z-10 mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700/50">
      <div>
        <span class="text-xs font-medium text-slate-500 block mb-1">Current String Setup</span>
        <div class="font-medium text-slate-800 dark:text-white flex items-center gap-2">
          <span class="material-icons-round text-sm text-primary-alt">line_weight</span>
          <span class="truncate">{{ racquet.stringSetup.name }}</span>
        </div>
        <div class="text-sm font-bold text-slate-600 dark:text-slate-300 mt-0.5 ml-6">
          {{ racquet.stringSetup.tension }} {{ racquet.stringSetup.unit }}
        </div>
      </div>
      
      <div>
        <span class="text-xs font-medium text-slate-500 block mb-1">Last Restring</span>
        <div class="font-medium text-slate-800 dark:text-white flex items-center gap-2">
          <span class="material-icons-round text-sm text-amber-500">build</span>
          {{ new Date(racquet.lastRestringDate).toLocaleDateString() }}
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-6">
          {{ Math.floor((new Date().getTime() - racquet.lastRestringDate) / (1000 * 60 * 60 * 24)) }} days ago
        </div>
      </div>
    </div>
    
    <!-- Action buttons -->
    <div class="relative z-10 mt-6 flex gap-2">
      <button class="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
        <span class="material-icons-round text-sm text-emerald-500">healing</span>
        Log Restring
      </button>
      <button class="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
        <span class="material-icons-round text-sm text-slate-400">edit</span>
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

const healthLevel = computed(() => {
  if (healthPercentage.value > 50) return 'good';
  if (healthPercentage.value > 20) return 'warning';
  return 'critical';
});

const healthColorClass = computed(() => {
  const map = {
    good: 'text-emerald-500',
    warning: 'text-amber-500',
    critical: 'text-rose-500'
  };
  return map[healthLevel.value];
});

const progressBarColorClass = computed(() => {
  const map = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500 scale-y-125 animate-pulse'
  };
  return map[healthLevel.value];
});
</script>
