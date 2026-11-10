<template>
  <div class="glass-panel bg-surface text-on-surface rounded-2xl overflow-hidden">
    <div class="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
      <h3 class="font-semibold text-lg text-on-surface">Recent Match Results</h3>
      <span class="text-xs font-medium text-on-surface-variant">{{ matches.length }} match(es)</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-on-surface-variant uppercase bg-surface-variant border-b border-outline-variant">
          <tr>
            <th class="px-6 py-3 font-semibold" scope="col">Result</th>
            <th class="px-6 py-3 font-semibold" scope="col">Score</th>
            <th class="px-6 py-3 font-semibold" scope="col">Date</th>
            <th class="px-6 py-3 font-semibold" scope="col">Opponent</th>
            <th class="px-6 py-3 font-semibold" scope="col">Duration</th>
            <th class="px-6 py-3 font-semibold text-center" scope="col">Breaks</th>
            <th class="px-6 py-3 font-semibold text-center" scope="col">Points W|L</th>
            <th class="px-6 py-3" scope="col"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant">
          <tr 
            v-for="match in matches" 
            :key="match.id" 
            @click="emit('select', match.id)"
            class="bg-surface hover:bg-surface-variant/80 cursor-pointer transition-colors group"
          >
            <td class="px-6 py-4">
              <div v-if="match.won" class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                <span class="material-icons-round text-sm">thumb_up</span>
              </div>
              <div v-else class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                <span class="material-icons-round text-sm">thumb_down</span>
              </div>
            </td>
            <td class="px-6 py-4 font-display font-semibold">
              <span 
                class="px-2.5 py-1 rounded-md text-xs font-bold" 
                :class="match.won ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'"
              >
                {{ match.score }}
              </span>
            </td>
            <td class="px-6 py-4 text-on-surface-variant">{{ match.date }}</td>
            <td class="px-6 py-4 font-semibold text-on-surface group-hover:text-primary transition-colors">
              {{ match.rival }}
            </td>
            <td class="px-6 py-4 text-on-surface">{{ match.durationString }}</td>
            <td class="px-6 py-4 text-center text-on-surface">{{ match.meBreaks }}/{{ match.himBreaks }}</td>
            <td class="px-6 py-4 text-center text-on-surface">{{ match.mePointsWon }}|{{ match.himPointsWon }}</td>
            <td class="px-6 py-4 text-right">
              <button 
                type="button" 
                @click.stop="emit('select', match.id)"
                class="text-on-surface-variant group-hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-variant"
                aria-label="Ver detalles"
              >
                <span class="material-icons-round text-base">edit_note</span>
              </button>
            </td>
          </tr>
          <tr v-if="matches.length === 0">
            <td colspan="8" class="px-6 py-8 text-center text-on-surface-variant">
              No hay partidos registrados aún. Inicia un partido desde tu reloj Wear OS.
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

const emit = defineEmits<{
  (e: 'select', matchId: string): void;
}>();
</script>
