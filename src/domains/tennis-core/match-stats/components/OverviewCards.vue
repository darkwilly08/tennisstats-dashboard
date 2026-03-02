<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span class="material-icons-round text-6xl text-slate-400 dark:text-white">sports_tennis</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Matches</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold">{{ overview.totalMatches }}</span>
          <span class="ml-2 text-sm text-emerald-500 font-medium">Ratio {{ overview.winRatio }}%</span>
        </div>
        <div class="mt-4 flex gap-4 text-sm">
          <div class="flex items-center gap-1 text-emerald-500">
            <span class="material-icons-round text-base">thumb_up</span> {{ overview.won }} Won
          </div>
          <div class="flex items-center gap-1 text-rose-500">
            <span class="material-icons-round text-base">thumb_down</span> {{ overview.lost }} Lost
          </div>
        </div>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span class="material-icons-round text-6xl text-slate-400 dark:text-white">schedule</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time on Court</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold">{{ Math.floor(overview.totalTimeOnCourtMs / (1000 * 60 * 60)) }}<span class="text-xl font-normal ml-1 text-slate-400">hr</span></span>
        </div>
        <div class="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Longest match: <span class="text-slate-800 dark:text-white font-medium">{{ Math.floor(overview.longestMatchMs / (1000 * 60 * 60)) }}:{{ String(Math.floor((overview.longestMatchMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0') }} hr</span>
        </div>
        <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
          <div class="bg-primary-alt h-full rounded-full" style="width: 75%"></div>
        </div>
      </div>
    </div>

    <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span class="material-icons-round text-6xl text-slate-400 dark:text-white">sports_score</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tie Breaks</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold">{{ overview.tiebreaks.total }}</span>
          <span class="ml-2 text-sm text-amber-500 font-medium">Ratio {{ overview.tiebreaks.ratio }}%</span>
        </div>
        <div class="mt-4 flex gap-4 text-sm">
          <div class="flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <span class="material-icons-round text-base">emoji_events</span> {{ overview.tiebreaks.won }} Won
          </div>
          <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            {{ overview.tiebreaks.lost }} Lost
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700 p-6 rounded-2xl relative overflow-hidden text-white shadow-lg">
      <div class="absolute top-0 right-0 p-4 opacity-20">
        <span class="material-icons-round text-6xl text-white">local_fire_department</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-orange-100 uppercase tracking-wider">Best Set Streak</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold">{{ overview.bestSetStreak }}</span>
          <span class="ml-2 text-sm text-orange-100 font-medium">Sets</span>
        </div>
        <div class="mt-4 text-sm text-orange-100 flex items-center gap-2">
          <span class="material-icons-round text-base animate-pulse">bolt</span>
          Current Streak: <span class="font-bold">{{ overview.currentStreak }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OverviewStats } from '../types';

defineProps<{
  overview: OverviewStats
}>();
</script>
