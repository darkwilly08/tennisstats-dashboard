<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    <div class="sm:col-span-2 lg:col-span-3">
      <h2 class="text-xl font-display font-semibold mb-1 flex items-center gap-2 text-on-surface">
        <span class="material-icons-round text-primary">favorite</span>
        Physiological & Health Data
      </h2>
    </div>
    
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-on-surface-variant">Active Calories</p>
        <h3 class="text-2xl font-bold mt-1 text-on-surface">{{ data.activeCalories.toLocaleString() }} <span class="text-sm font-normal text-on-surface-variant">kcal</span></h3>
      </div>
      <div class="h-12 w-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
        <span class="material-icons-round">local_fire_department</span>
      </div>
    </div>

    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-on-surface-variant">Avg Heart Rate</p>
        <h3 class="text-2xl font-bold mt-1 text-on-surface">{{ data.avgHeartRate }} <span class="text-sm font-normal text-on-surface-variant">bpm</span></h3>
        <p class="text-xs text-primary font-semibold mt-1">Max: {{ data.maxHeartRate }} bpm</p>
      </div>
      <div class="h-12 w-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container relative">
        <span class="material-icons-round">favorite</span>
      </div>
    </div>

    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between sm:col-span-2 lg:col-span-1">
      <div>
        <p class="text-sm font-medium text-on-surface-variant">Distance Covered</p>
        <h3 class="text-2xl font-bold mt-1 text-on-surface">{{ data.distanceCoveredKm }} <span class="text-sm font-normal text-on-surface-variant">km</span></h3>
      </div>
      <div class="h-12 w-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
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
