<template>
  <div class="glass-panel rounded-2xl overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 flex justify-between items-center">
      <h3 class="font-semibold text-lg">Recent Match Results</h3>
      <button class="text-sm text-primary-alt hover:underline">View All</button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-slate-500 dark:text-slate-400 uppercase bg-gray-50 dark:bg-slate-800/50">
          <tr>
            <th class="px-6 py-3" scope="col">Result</th>
            <th class="px-6 py-3" scope="col">Score</th>
            <th class="px-6 py-3" scope="col">Date</th>
            <th class="px-6 py-3" scope="col">Opponent</th>
            <th class="px-6 py-3" scope="col">Duration</th>
            <th class="px-6 py-3 text-center" scope="col">Breaks</th>
            <th class="px-6 py-3 text-center" scope="col">Points W|L</th>
            <th class="px-6 py-3" scope="col"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-slate-700/50">
          <tr v-for="match in matches" :key="match.id" class="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
            <td class="px-6 py-4">
              <div v-if="match.won" class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                <span class="material-icons-round text-sm">thumb_up</span>
              </div>
              <div v-else class="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md">
                <span class="material-icons-round text-sm">thumb_down</span>
              </div>
            </td>
            <td class="px-6 py-4 font-display font-medium">
              <span class="px-2 py-0.5 rounded text-xs text-white" :class="match.won ? 'bg-emerald-500' : 'bg-rose-500'">{{ match.score }}</span>
            </td>
            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ match.date }}</td>
            <td class="px-6 py-4 font-medium">{{ match.rival }}</td>
            <td class="px-6 py-4">{{ match.durationString }}</td>
            <td class="px-6 py-4 text-center">{{ match.meBreaks }}/{{ match.himBreaks }}</td>
            <td class="px-6 py-4 text-center">{{ match.mePointsWon }}|{{ match.himPointsWon }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-slate-400 hover:text-primary-alt transition-colors">
                <span class="material-icons-round text-base">visibility</span>
              </button>
            </td>
          </tr>
          <tr v-if="matches.length === 0">
            <td colspan="8" class="px-6 py-8 text-center text-slate-500">
              No matches found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MatchRow } from '../types';

defineProps<{
  matches: MatchRow[]
}>();
</script>
