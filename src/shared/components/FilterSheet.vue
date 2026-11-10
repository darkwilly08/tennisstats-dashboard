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
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
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

      <!-- 4. Duración en Sets -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.durationSection', 'Duración en Sets') }}</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            @click="draft.setsCount = 'all'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.setsCount === 'all'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.all', 'Todos') }}
          </button>
          <button
            type="button"
            @click="draft.setsCount = '2'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.setsCount === '2'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.sets2', '2 sets') }}
          </button>
          <button
            type="button"
            @click="draft.setsCount = '3'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.setsCount === '3'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.sets3', '3 sets') }}
          </button>
          <button
            type="button"
            @click="draft.setsCount = '5'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.setsCount === '5'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.sets5', '5 sets') }}
          </button>
        </div>
      </div>

      <!-- 5. Key Tennis Switches / Dinámica de Partido (Stitch mockup) -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.tennisDynamicsSection', 'Dinámica de Partido') }}</label>
        <div class="rounded-2xl border border-outline bg-surface-variant/30 divide-y divide-outline-variant p-1">
          <!-- Switch 1: Con Tiebreak -->
          <div 
            class="p-3 flex items-center justify-between gap-3 cursor-pointer select-none rounded-xl hover:bg-surface-variant/50 transition-colors"
            @click="draft.withTiebreak = !draft.withTiebreak"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="material-icons-round text-primary text-xl shrink-0">timer</span>
              <div class="min-w-0">
                <div class="text-xs font-bold text-on-surface truncate">{{ t('filters.tiebreak', 'Partidos con Tiebreak') }}</div>
                <div class="text-[11px] text-on-surface-variant truncate">{{ t('filters.tiebreakDesc', 'Definidos en desempate o con tiebreak en set') }}</div>
              </div>
            </div>
            <div 
              class="w-11 h-6 rounded-full transition-colors flex items-center p-0.5 shrink-0"
              :class="draft.withTiebreak ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'"
            >
              <div class="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                <span v-if="draft.withTiebreak" class="material-icons-round text-primary text-[13px] font-bold">check</span>
              </div>
            </div>
          </div>

          <!-- Switch 2: Remontadas / Set Decisivo -->
          <div 
            class="p-3 flex items-center justify-between gap-3 cursor-pointer select-none rounded-xl hover:bg-surface-variant/50 transition-colors"
            @click="draft.comebackOnly = !draft.comebackOnly"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="material-icons-round text-primary text-xl shrink-0">trending_up</span>
              <div class="min-w-0">
                <div class="text-xs font-bold text-on-surface truncate">{{ t('filters.comeback', 'Remontadas / Set Decisivo') }}</div>
                <div class="text-[11px] text-on-surface-variant truncate">{{ t('filters.comebackDesc', 'Ganó habiendo perdido el 1er set') }}</div>
              </div>
            </div>
            <div 
              class="w-11 h-6 rounded-full transition-colors flex items-center p-0.5 shrink-0"
              :class="draft.comebackOnly ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'"
            >
              <div class="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                <span v-if="draft.comebackOnly" class="material-icons-round text-primary text-[13px] font-bold">check</span>
              </div>
            </div>
          </div>

          <!-- Switch 3: Sets en Blanco 6-0 -->
          <div 
            class="p-3 flex items-center justify-between gap-3 cursor-pointer select-none rounded-xl hover:bg-surface-variant/50 transition-colors"
            @click="draft.withBagel = !draft.withBagel"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="material-icons-round text-primary text-xl shrink-0">check_circle</span>
              <div class="min-w-0">
                <div class="text-xs font-bold text-on-surface truncate">{{ t('filters.bagel', 'Sets en blanco (6-0 / Bagels)') }}</div>
                <div class="text-[11px] text-on-surface-variant truncate">{{ t('filters.bagelDesc', 'Partidos con al menos un set a cero') }}</div>
              </div>
            </div>
            <div 
              class="w-11 h-6 rounded-full transition-colors flex items-center p-0.5 shrink-0"
              :class="draft.withBagel ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'"
            >
              <div class="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                <span v-if="draft.withBagel" class="material-icons-round text-primary text-[13px] font-bold">check</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Tournament / Torneo -->
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

      <!-- 7. Rival / Oponente -->
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

      <!-- 8. Period / Período -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('filters.periodSection', 'Período') }}</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
            @click="draft.datePreset = '3m'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === '3m'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.last3Months', 'Últimos 3 meses') }}
          </button>
          <button
            type="button"
            @click="draft.datePreset = '6m'"
            class="px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[38px]"
            :class="draft.datePreset === '6m'
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm'
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('filters.last6Months', 'Últimos 6 meses') }}
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

      <!-- Sheet Footer Actions: Full-width stacked on mobile -->
      <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-outline-variant w-full">
        <button
          type="button"
          @click="resetDraft"
          class="btn-secondary text-xs sm:text-sm w-full sm:w-auto"
        >
          {{ t('filters.clear', 'Limpiar') }}
        </button>
        <button
          type="button"
          @click="applyFilters"
          class="btn-primary text-xs sm:text-sm font-bold w-full sm:w-auto min-w-[140px]"
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
  { label: t('filters.indoor', 'Indoor / Cubierta'), value: 'Indoor' },
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
