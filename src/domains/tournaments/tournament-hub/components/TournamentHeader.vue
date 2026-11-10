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
        <div class="flex items-center justify-between gap-3 mb-1">
          <div class="flex items-center gap-3 min-w-0">
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-on-surface truncate">{{ tournament.name }}</h2>
            <span 
              class="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
              :class="{
                'bg-primary-container text-on-primary-container': tournament.status === 'active',
                'bg-secondary-container text-on-secondary-container': tournament.status !== 'active'
              }"
            >
              {{ tournament.status === 'active' ? 'En Curso' : (tournament.status === 'upcoming' ? 'Próximo' : 'Finalizado') }}
            </span>
          </div>

          <!-- Tournament Actions (Delete) -->
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              @click="showDeleteConfirm = true"
              aria-label="Eliminar Torneo"
              class="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
              title="Eliminar Torneo"
            >
              <span class="material-icons-round text-xl">delete_outline</span>
            </button>
          </div>
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

    <!-- Delete Confirmation Sheet -->
    <BottomSheet
      :isOpen="showDeleteConfirm"
      title="Eliminar Torneo"
      subtitle="Confirmación de eliminación definitiva"
      icon="warning"
      @close="showDeleteConfirm = false"
    >
      <div class="space-y-4">
        <p class="text-sm text-on-surface leading-relaxed">
          ¿Estás seguro de que deseas eliminar <strong>{{ tournament.name }}</strong>? Esta acción desvinculará los partidos asignados a este torneo.
        </p>

        <div class="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
          <button
            type="button"
            @click="showDeleteConfirm = false"
            class="btn-secondary text-sm"
          >
            Cancelar
          </button>
          <button
            type="button"
            :disabled="deleting"
            @click="handleConfirmDelete"
            class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 min-h-[44px]"
          >
            <span v-if="deleting" class="material-icons-round animate-spin text-sm">refresh</span>
            <span>Eliminar Torneo</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tournament } from '../types';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useTournamentStore } from '../stores/tournamentStore';
import { useSnackbar } from '@/shared/composables/useSnackbar';

const props = defineProps<{
  tournament: Tournament
}>();

const { deleteTournament } = useTournamentStore();
const snackbar = useSnackbar();

const showDeleteConfirm = ref(false);
const deleting = ref(false);

const handleConfirmDelete = async () => {
  if (!props.tournament.id) return;
  deleting.value = true;
  try {
    await deleteTournament(props.tournament.id);
    snackbar.success('Torneo eliminado correctamente');
    showDeleteConfirm.value = false;
  } catch (err) {
    console.error('Failed to delete tournament:', err);
    snackbar.error('Error al eliminar el torneo');
  } finally {
    deleting.value = false;
  }
};

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
