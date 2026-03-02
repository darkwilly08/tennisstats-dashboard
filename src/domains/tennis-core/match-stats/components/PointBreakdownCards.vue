<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="lg:col-span-4">
      <h2 class="text-xl font-display font-semibold flex items-center gap-2">
        <span class="material-icons-round text-primary-alt">analytics</span>
        Point Outcome Breakdowns
      </h2>
    </div>
    
    <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Break Points Won</h4>
      <div class="relative w-32 h-32 mt-4">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-emerald-500 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.breakPoints.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold">{{ data.breakPoints.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-emerald-500 text-sm">thumb_up</span> {{ data.breakPoints.won }}</div>
        <div class="flex items-center gap-1 font-medium text-slate-500">Total: {{ data.breakPoints.total }}</div>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Break Points Saved</h4>
      <div class="relative w-32 h-32 mt-4">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-blue-500 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.savedBreakPoints.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold">{{ data.savedBreakPoints.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-blue-500 text-sm">shield</span> {{ data.savedBreakPoints.saved }}</div>
        <div class="flex items-center gap-1 font-medium text-slate-500">Total: {{ data.savedBreakPoints.total }}</div>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Points on Serve</h4>
      <div class="relative w-32 h-32 mt-4">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-amber-500 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.pointsServing.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold">{{ data.pointsServing.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-amber-500 text-sm">sports_tennis</span> {{ data.pointsServing.won }}</div>
        <div class="flex items-center gap-1 font-medium text-slate-500">Total: {{ data.pointsServing.total }}</div>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
      <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Points Receiving</h4>
      <div class="relative w-32 h-32 mt-4">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
          <circle class="text-purple-500 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-linecap="round" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * data.pointsReceiving.percentage) / 100"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-2xl font-bold">{{ data.pointsReceiving.percentage }}%</span>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between px-4 text-sm">
        <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-purple-500 text-sm">call_received</span> {{ data.pointsReceiving.won }}</div>
        <div class="flex items-center gap-1 font-medium text-slate-500">Total: {{ data.pointsReceiving.total }}</div>
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
