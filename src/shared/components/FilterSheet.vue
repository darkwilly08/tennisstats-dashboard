<template>
  <BottomSheet
    :isOpen="isOpen"
    :title="t('filters.title', 'Filtros de Partidos')"
    :subtitle="t('filters.subtitle', 'Filtra por resultado, superficie, torneo, rival o período')"
    icon="tune"
    @close="emit('close')"
  >
    <div class="space-y-5">
      <!-- Quick Reset Header Action -->
      <div class="flex items-center justify-between pb-2 border-b border-outline-variant">
        <span class="text-xs text-on-surface-variant font-medium">
          {{ draftActiveCount > 0 ? `${draftActiveCount} filtros seleccionados` : 'Sin filtros avanzados' }}
        </span>
        <button
          v-if="draftActiveCount > 0"
          type="button"
          @click="resetDraft"
          class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
        >
          <span class="material-icons-round text-sm">restart_alt</span>
          <span>{{ t('filters.clear', 'Limpiar') }}</span>
        </button>
      </div>

      <!-- 1. Outcome / Resultado -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.outcomeSection', 'Resultado') }}</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="draft.outcome = 'all'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.outcome === 'all'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.all', 'Todos') }}
          </button>
          <button
            type="button"
            @click="draft.outcome = 'wins'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.outcome === 'wins'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.wins', 'Victorias') }}
          </button>
          <button
            type="button"
            @click="draft.outcome = 'losses'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.outcome === 'losses'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.losses', 'Derrotas') }}
          </button>
        </div>
      </div>

      <!-- 2. Classification / Clasificación -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.classificationSection', 'Clasificación') }}</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="draft.matchType = 'all'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.matchType === 'all'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.all', 'Todos') }}
          </button>
          <button
            type="button"
            @click="draft.matchType = 'tournament'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.matchType === 'tournament'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.official', 'Oficiales') }}
          </button>
          <button
            type="button"
            @click="draft.matchType = 'friendly'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px]"
            :class="draft.matchType === 'friendly'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.friendly', 'Amistosos') }}
          </button>
        </div>
      </div>

      <!-- 3. Surfaces / Superficie (Multi-select) -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.surfaceSection', 'Superficie') }}</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="surf in surfaceOptions"
            :key="surf.value"
            type="button"
            @click="toggleSurface(surf.value)"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[40px] flex items-center justify-center gap-1.5"
            :class="draft.surfaces.includes(surf.value)
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            <span>{{ surf.label }}</span>
            <span v-if="draft.surfaces.includes(surf.value)" class="material-icons-round text-xs">check</span>
          </button>
        </div>
      </div>

      <!-- 4. Tournament / Torneo -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.tournamentSection', 'Torneo') }}</label>
        <div class="relative">
          <input
            v-model="tournamentSearch"
            type="text"
            :placeholder="t('filters.searchTournamentPlaceholder', 'Buscar torneo...')"
            class="m3-input text-xs"
          />
          <span class="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
            search
          </span>
        </div>

        <div v-if="selectableTournaments.length > 0" class="flex flex-wrap gap-1.5 pt-1 max-h-28 overflow-y-auto">
          <button
            v-for="tItem in selectableTournaments"
            :key="tItem.id"
            type="button"
            @click="toggleTournament(tItem.id)"
            class="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1"
            :class="draft.tournaments.includes(tItem.id)
              ? 'bg-primary-container text-on-primary-container border-primary font-bold'
              : 'bg-surface-variant text-on-surface border-outline-variant hover:border-outline'"
          >
            <span>{{ tItem.name }}</span>
            <span v-if="draft.tournaments.includes(tItem.id)" class="material-icons-round text-xs">close</span>
          </button>
        </div>
        <p v-else-if="availableTournaments.length === 0" class="text-xs text-on-surface-variant">
          {{ t('filters.noTournaments', 'Sin torneos registrados') }}
        </p>
      </div>

      <!-- 5. Rival / Oponente -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.rivalSection', 'Rival') }}</label>
        <div class="relative">
          <input
            v-model="rivalSearch"
            type="text"
            :placeholder="t('filters.searchRivalPlaceholder', 'Buscar rival...')"
            class="m3-input text-xs"
          />
          <span class="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
            person_search
          </span>
        </div>

        <div v-if="selectableRivals.length > 0" class="flex flex-wrap gap-1.5 pt-1 max-h-28 overflow-y-auto">
          <button
            v-for="riv in selectableRivals"
            :key="riv"
            type="button"
            @click="toggleRival(riv)"
            class="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1"
            :class="draft.rivals.includes(riv)
              ? 'bg-primary-container text-on-primary-container border-primary font-bold'
              : 'bg-surface-variant text-on-surface border-outline-variant hover:border-outline'"
          >
            <span>{{ riv }}</span>
            <span v-if="draft.rivals.includes(riv)" class="material-icons-round text-xs">close</span>
          </button>
        </div>
        <p v-else-if="availableRivals.length === 0" class="text-xs text-on-surface-variant">
          {{ t('filters.noRivals', 'Sin rivales registrados') }}
        </p>
      </div>

      <!-- 6. Period / Período -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.periodSection', 'Período') }}</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            @click="draft.datePreset = 'all'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === 'all'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.allTime', 'Todo el tiempo') }}
          </button>
          <button
            type="button"
            @click="draft.datePreset = '7d'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === '7d'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.last7Days', 'Últimos 7 días') }}
          </button>
          <button
            type="button"
            @click="draft.datePreset = '30d'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === '30d'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.last30Days', 'Últimos 30 días') }}
          </button>
          <button
            type="button"
            @click="draft.datePreset = 'year'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === 'year'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.thisYear', 'Este año') }}
          </button>
        </div>
      </div>

      <!-- Sheet Footer Actions -->
      <div class="flex items-center justify-between gap-3 pt-3 border-t border-outline-variant">
        <button
          type="button"
          @click="resetDraft"
          class="btn-secondary text-xs sm:text-sm"
        >
          {{ t('filters.clear', 'Limpiar') }}
        </button>
        <button
          type="button"
          @click="applyFilters"
          class="btn-primary text-xs sm:text-sm font-bold min-w-[140px]"
        >
          {{ t('filters.apply', 'Aplicar Filtros') }}
          <span v-if="draftActiveCount > 0" class="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
            {{ draftActiveCount }}
          </span>
        </button>
      </div>

    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useI18n } from '@/shared/i18n';
import {
  type FilterState,
  type CourtSurface,
  createDefaultFilterState,
  countActiveFilters
} from '@/shared/types/filters';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  filters: FilterState;
  availableTournaments?: { id: string; name: string }[];
  availableRivals?: string[];
}>(), {
  availableTournaments: () => [],
  availableRivals: () => [],
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'apply', filters: FilterState): void;
  (e: 'update:filters', filters: FilterState): void;
  (e: 'reset'): void;
}>();

const { t } = useI18n();

const tournamentSearch = ref('');
const rivalSearch = ref('');

const draft = ref<FilterState>({
  ...createDefaultFilterState(),
  ...props.filters,
  surfaces: [...(props.filters.surfaces || [])],
  tournaments: [...(props.filters.tournaments || [])],
  rivals: [...(props.filters.rivals || [])],
});

watch(() => props.isOpen, (open) => {
  if (open) {
    draft.value = {
      ...createDefaultFilterState(),
      ...props.filters,
      surfaces: [...(props.filters.surfaces || [])],
      tournaments: [...(props.filters.tournaments || [])],
      rivals: [...(props.filters.rivals || [])],
    };
    tournamentSearch.value = '';
    rivalSearch.value = '';
  }
});

const draftActiveCount = computed(() => countActiveFilters(draft.value));

const surfaceOptions = computed<{ label: string; value: CourtSurface }[]>(() => [
  { label: t('filters.clay', 'Polvo de ladrillo'), value: 'Clay' },
  { label: t('filters.hard', 'Cemento'), value: 'Hard' },
  { label: t('filters.grass', 'Césped'), value: 'Grass' },
]);

const toggleSurface = (s: CourtSurface) => {
  const idx = draft.value.surfaces.indexOf(s);
  if (idx === -1) {
    draft.value.surfaces.push(s);
  } else {
    draft.value.surfaces.splice(idx, 1);
  }
};

const selectableTournaments = computed(() => {
  const q = tournamentSearch.value.trim().toLowerCase();
  if (!q) return props.availableTournaments;
  return props.availableTournaments.filter(tItem => tItem.name.toLowerCase().includes(q));
});

const toggleTournament = (id: string) => {
  const idx = draft.value.tournaments.indexOf(id);
  if (idx === -1) {
    draft.value.tournaments.push(id);
  } else {
    draft.value.tournaments.splice(idx, 1);
  }
};

const selectableRivals = computed(() => {
  const q = rivalSearch.value.trim().toLowerCase();
  if (!q) return props.availableRivals;
  return props.availableRivals.filter(r => r.toLowerCase().includes(q));
});

const toggleRival = (name: string) => {
  const idx = draft.value.rivals.indexOf(name);
  if (idx === -1) {
    draft.value.rivals.push(name);
  } else {
    draft.value.rivals.splice(idx, 1);
  }
};

const resetDraft = () => {
  draft.value = createDefaultFilterState();
};

const applyFilters = () => {
  emit('update:filters', { ...draft.value });
  emit('apply', { ...draft.value });
  emit('close');
};
</script>
