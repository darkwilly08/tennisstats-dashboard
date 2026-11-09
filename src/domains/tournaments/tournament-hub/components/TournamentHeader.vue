<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
      <span class="material-icons-round text-8xl text-primary">emoji_events</span>
    </div>

    <div class="relative z-10 flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-surface-variant border border-outline flex-shrink-0 relative">
        <template v-if="tournament.imageUrl">
          <img :src="tournament.imageUrl" :alt="tournament.name" class="w-full h-full object-cover object-center" />
        </template>
        <template v-else>
          <div class="w-full h-full flex items-center justify-center text-on-surface-variant">
            <span class="material-icons-round text-4xl">stadium</span>
          </div>
        </template>
        <div v-if="tournament.category" class="absolute top-2 left-2 px-2.5 py-1 text-[10px] font-bold tracking-wider bg-primary-container text-on-primary-container rounded shadow-sm">
          {{ tournament.category }}
        </div>
      </div>
      
      <div class="flex-1 min-w-0 flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-1">
          <h2 class="text-2xl sm:text-3xl font-display font-bold text-on-surface truncate">{{ tournament.name }}</h2>
          <span 
            class="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            :class="{
              'bg-primary-container text-on-primary-container': tournament.status === 'active',
              'bg-secondary-container text-on-secondary-container': tournament.status !== 'active'
            }"
          >
            {{ tournament.status === 'active' ? 'En Curso' : (tournament.status === 'upcoming' ? 'Próximo' : 'Finalizado') }}
          </span>
        </div>
        
        <div class="flex flex-wrap gap-4 text-sm text-on-surface-variant mt-2">
          <div class="flex items-center gap-1.5" v-if="locationText">
            <span class="material-icons-round text-sm text-primary">location_on</span>
            <span>{{ locationText }}</span>
          </div>
          <div class="flex items-center gap-1.5" v-if="dateRangeText">
            <span class="material-icons-round text-sm text-primary">calendar_today</span>
            <span>{{ dateRangeText }}</span>
          </div>
          <div class="flex items-center gap-1.5 border border-outline px-2.5 py-0.5 rounded-md text-xs font-semibold text-on-surface">
            {{ surfaceLabel }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Tournament } from '../types';

const props = defineProps<{
  tournament: Tournament
}>();

const locationText = computed(() => {
  if (!props.tournament.location) return '';
  if (typeof props.tournament.location === 'string') return props.tournament.location;
  const loc = props.tournament.location as any;
  return [loc.venue, loc.city].filter(Boolean).join(', ');
});

const surfaceLabel = computed(() => {
  const map: Record<string, string> = {
    Clay: 'Polvo de ladrillo',
    Hard: 'Rápida / Cemento',
    Grass: 'Césped'
  };
  return map[props.tournament.surface] || props.tournament.surface;
});

const dateRangeText = computed(() => {
  if (props.tournament.startDate && props.tournament.endDate) {
    return `${new Date(props.tournament.startDate).toLocaleDateString()} - ${new Date(props.tournament.endDate).toLocaleDateString()}`;
  }
  if (props.tournament.startDate) {
    return `Inicio: ${new Date(props.tournament.startDate).toLocaleDateString()}`;
  }
  return '';
});
</script>
