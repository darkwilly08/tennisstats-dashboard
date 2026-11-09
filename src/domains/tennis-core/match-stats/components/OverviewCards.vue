<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    <!-- Matches Card -->
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
        <span class="material-icons-round text-6xl text-primary">sports_tennis</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Matches</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold text-on-surface">{{ overview.totalMatches }}</span>
          <span class="ml-2 text-sm text-primary font-semibold">Ratio {{ overview.winRatio }}%</span>
        </div>
        <div class="mt-4 flex gap-4 text-sm">
          <div class="flex items-center gap-1 text-primary font-medium">
            <span class="material-icons-round text-base">thumb_up</span> {{ overview.won }} Won
          </div>
          <div class="flex items-center gap-1 text-on-surface-variant font-medium">
            <span class="material-icons-round text-base">thumb_down</span> {{ overview.lost }} Lost
          </div>
        </div>
      </div>
    </div>

    <!-- Time on Court Card -->
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
        <span class="material-icons-round text-6xl text-primary">schedule</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Time on Court</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold text-on-surface">
            {{ Math.floor(overview.totalTimeOnCourtMs / (1000 * 60 * 60)) }}<span class="text-xl font-normal ml-1 text-on-surface-variant">hr</span>
          </span>
        </div>
        <div class="mt-4 text-sm text-on-surface-variant">
          Longest match: <span class="text-on-surface font-semibold">{{ Math.floor(overview.longestMatchMs / (1000 * 60 * 60)) }}:{{ String(Math.floor((overview.longestMatchMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0') }} hr</span>
        </div>
        <div class="w-full bg-surface-variant h-1.5 mt-3 rounded-full overflow-hidden">
          <div class="bg-primary h-full rounded-full" :style="`width: ${overview.totalMatches > 0 ? 75 : 0}%`"></div>
        </div>
      </div>
    </div>

    <!-- Tie Breaks Card -->
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
        <span class="material-icons-round text-6xl text-primary">sports_score</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Tie Breaks</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold text-on-surface">{{ overview.tiebreaks.total }}</span>
          <span class="ml-2 text-sm text-primary font-semibold">Ratio {{ overview.tiebreaks.ratio }}%</span>
        </div>
        <div class="mt-4 flex gap-4 text-sm">
          <div class="flex items-center gap-1 text-on-surface font-medium">
            <span class="material-icons-round text-base text-primary">emoji_events</span> {{ overview.tiebreaks.won }} Won
          </div>
          <div class="flex items-center gap-1 text-on-surface-variant font-medium">
            {{ overview.tiebreaks.lost }} Lost
          </div>
        </div>
      </div>
    </div>

    <!-- Best Set Streak Card -->
    <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
        <span class="material-icons-round text-6xl text-primary">local_fire_department</span>
      </div>
      <div class="relative z-10">
        <p class="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Best Set Streak</p>
        <div class="flex items-baseline mt-2">
          <span class="text-4xl font-display font-bold text-on-surface">{{ overview.bestSetStreak }}</span>
          <span class="ml-2 text-sm text-on-surface-variant font-medium">Sets</span>
        </div>
        <div class="mt-4 text-sm text-on-surface-variant flex items-center gap-2">
          <span class="material-icons-round text-base text-primary">bolt</span>
          Current Streak: <span class="font-bold text-on-surface">{{ overview.currentStreak }}</span>
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
