<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-3">
      <h2 class="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span class="material-icons-round text-rose-500">favorite</span>
        Physiological & Health Data
      </h2>
    </div>
    
    <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">Active Calories</p>
        <h3 class="text-2xl font-bold mt-1">{{ data.activeCalories.toLocaleString() }} <span class="text-sm font-normal text-slate-400">kcal</span></h3>
      </div>
      <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <span class="material-icons-round">local_fire_department</span>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500 flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">Avg Heart Rate</p>
        <h3 class="text-2xl font-bold mt-1">{{ data.avgHeartRate }} <span class="text-sm font-normal text-slate-400">bpm</span></h3>
        <p class="text-xs text-rose-500 mt-1">Max: {{ data.maxHeartRate }} bpm</p>
      </div>
      <div class="h-12 w-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 relative">
        <span class="material-icons-round animate-ping absolute opacity-20">favorite</span>
        <span class="material-icons-round">favorite</span>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">Distance Covered</p>
        <h3 class="text-2xl font-bold mt-1">{{ data.distanceCoveredKm }} <span class="text-sm font-normal text-slate-400">km</span></h3>
      </div>
      <div class="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
        <span class="material-icons-round">directions_run</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhysiologicalData } from '../types';

defineProps<{
  data: PhysiologicalData
}>();
</script>
