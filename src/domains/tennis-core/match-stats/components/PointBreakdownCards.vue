<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    <div class="sm:col-span-2 lg:col-span-4">
      <h2 class="text-xl font-display font-semibold flex items-center gap-2 text-on-surface">
        <span class="material-icons-round text-primary">analytics</span>
        Point Outcome Breakdowns
      </h2>
    </div>
    
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-semibold text-on-surface-variant absolute top-4 left-6">Break Points Won</h4>
      <div class="relative w-32 h-32 mt-6">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.breakPoints.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold text-on-surface">{{ data.breakPoints.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-semibold text-on-surface"><span class="material-icons-round text-primary text-sm">thumb_up</span> {{ data.breakPoints.won }}</div>
        <div class="flex items-center gap-1 font-medium text-on-surface-variant">Total: {{ data.breakPoints.total }}</div>
      </div>
    </div>

    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-semibold text-on-surface-variant absolute top-4 left-6">Break Points Saved</h4>
      <div class="relative w-32 h-32 mt-6">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.savedBreakPoints.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold text-on-surface">{{ data.savedBreakPoints.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-semibold text-on-surface"><span class="material-icons-round text-primary text-sm">shield</span> {{ data.savedBreakPoints.saved }}</div>
        <div class="flex items-center gap-1 font-medium text-on-surface-variant">Total: {{ data.savedBreakPoints.total }}</div>
      </div>
    </div>

    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-semibold text-on-surface-variant absolute top-4 left-6">Points on Serve</h4>
      <div class="relative w-32 h-32 mt-6">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.pointsServing.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold text-on-surface">{{ data.pointsServing.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-semibold text-on-surface"><span class="material-icons-round text-primary text-sm">sports_tennis</span> {{ data.pointsServing.won }}</div>
        <div class="flex items-center gap-1 font-medium text-on-surface-variant">Total: {{ data.pointsServing.total }}</div>
      </div>
    </div>

    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-semibold text-on-surface-variant absolute top-4 left-6">Points Receiving</h4>
      <div class="relative w-32 h-32 mt-6">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-secondary stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.pointsReceiving.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold text-on-surface">{{ data.pointsReceiving.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-semibold text-on-surface"><span class="material-icons-round text-secondary text-sm">call_received</span> {{ data.pointsReceiving.won }}</div>
        <div class="flex items-center gap-1 font-medium text-on-surface-variant">Total: {{ data.pointsReceiving.total }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PointBreakdownData } from '../types';

defineProps<{
  data: PointBreakdownData
}>();
</script>
