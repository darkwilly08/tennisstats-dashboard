<template>
  <div class="space-y-3">
    <!-- Top Row: Search Input + Advanced Filters Button + Count -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <!-- Search Input with M3 Tokens -->
      <div class="relative flex-1">
        <span class="material-icons-round absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
          search
        </span>
        <input
          :value="searchQuery"
          @input="onSearchInput"
          type="text"
          :placeholder="placeholderText"
          class="w-full pl-10 pr-9 py-2.5 rounded-xl border border-outline bg-surface-variant text-on-surface placeholder:text-on-surface-variant text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-colors"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="clearSearch"
          aria-label="Limpiar búsqueda"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors rounded-full"
        >
          <span class="material-icons-round text-base">close</span>
        </button>
      </div>

      <!-- Advanced Filter Sheet Button (Argon High Pattern) -->
      <button
        v-if="showAdvancedButton"
        type="button"
        @click="emit('openFilters')"
        aria-label="Filtros avanzados"
        class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shrink-0 min-h-[42px]"
        :class="activeFilterCount > 0
          ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
          : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
      >
        <span class="material-icons-round text-base">tune</span>
        <span>{{ t('filters.button', 'Filtros') }}</span>
        <span 
          v-if="activeFilterCount > 0"
          class="px-1.5 py-0.2 rounded-full text-[11px] bg-white/25 font-bold"
        >
          {{ activeFilterCount }}
        </span>
      </button>

      <!-- Quick Reset / Total Count (if provided) -->
      <div v-if="totalCount !== undefined" class="hidden sm:flex items-center text-xs text-on-surface-variant font-medium shrink-0">
        <span>{{ totalCount }} {{ t('analytics.matchesCount', 'partidos') }}</span>
      </div>
    </div>

    <!-- Filter Chips Pill Bar (Horizontal Scroll on Mobile) -->
    <div v-if="chips && chips.length > 0" class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="chip in chips"
        :key="chip.value"
        type="button"
        @click="selectFilter(chip.value)"
        class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 min-h-[32px] border"
        :class="activeFilter === chip.value
          ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
          : 'bg-surface-variant text-on-surface border-outline-variant hover:border-outline hover:text-on-surface'"
      >
        <span>{{ chip.label }}</span>
        <span 
          v-if="chip.count !== undefined" 
          class="px-1.5 py-0.2 rounded-full text-[10px]"
          :class="activeFilter === chip.value ? 'bg-black/20 text-on-primary' : 'bg-surface text-on-surface-variant'"
        >
          {{ chip.count }}
        </span>
      </button>
    </div>

    <!-- Active Filter Tags Row (Individual Dismiss + Clear All) -->
    <div v-if="activeFilterTags.length > 0" class="flex flex-wrap items-center gap-2 pt-1">
      <span class="text-xs text-on-surface-variant font-medium shrink-0">
        Filtros activos:
      </span>

      <span
        v-for="tag in activeFilterTags"
        :key="tag.id"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-secondary-container text-on-secondary-container border border-outline font-medium animate-fadeIn"
      >
        <span>{{ tag.label }}</span>
        <button
          type="button"
          @click="removeTag(tag)"
          :aria-label="`Quitar filtro ${tag.label}`"
          class="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
        >
          <span class="material-icons-round text-xs">close</span>
        </button>
      </span>

      <!-- Clear All Filters Button -->
      <button
        type="button"
        @click="clearAllFilters"
        class="text-xs text-primary hover:underline font-semibold ml-1 flex items-center gap-1"
      >
        <span>{{ t('filters.clearAll', 'Limpiar filtros') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/shared/i18n';
import {
  type FilterState,
  type MatchOutcome,
  type MatchClassification,
  countActiveFilters
} from '@/shared/types/filters';

export interface FilterChip {
  label: string;
  value: string;
  count?: number;
}

interface FilterTag {
  id: string;
  type: 'outcome' | 'matchType' | 'surface' | 'tournament' | 'rival' | 'datePreset' | 'search' | 'tiebreak' | 'comeback' | 'bagel' | 'setsCount';
  value: any;
  label: string;
}

const props = withDefaults(defineProps<{
  searchQuery?: string;
  activeFilter?: string;
  placeholder?: string;
  chips?: FilterChip[];
  totalCount?: number;
  filters?: FilterState;
  showAdvancedButton?: boolean;
  availableTournaments?: { id: string; name: string }[];
}>(), {
  searchQuery: '',
  activeFilter: 'all',
  placeholder: 'Buscar...',
  chips: () => [],
  showAdvancedButton: true,
  availableTournaments: () => [],
});

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'update:activeFilter', val: string): void;
  (e: 'update:filters', val: FilterState): void;
  (e: 'change', query: string, filter: string): void;
  (e: 'openFilters'): void;
  (e: 'clearAll'): void;
}>();

const { t } = useI18n();

const placeholderText = computed(() => props.placeholder);

const activeFilterCount = computed(() => {
  if (props.filters) {
    return countActiveFilters(props.filters);
  }
  return props.activeFilter !== 'all' ? 1 : 0;
});

const activeFilterTags = computed<FilterTag[]>(() => {
  const tags: FilterTag[] = [];
  if (!props.filters) return tags;

  const f = props.filters;

  if (f.outcome && f.outcome !== 'all') {
    const label = f.outcome === 'wins' ? t('filters.wins', 'Victorias') : t('filters.losses', 'Derrotas');
    tags.push({
      id: `outcome_${f.outcome}`,
      type: 'outcome',
      value: f.outcome,
      label: `${t('filters.tagOutcome', 'Resultado')}: ${label}`
    });
  }

  if (f.matchType && f.matchType !== 'all') {
    const label = f.matchType === 'tournament' ? t('filters.official', 'Oficiales') : t('filters.friendly', 'Amistosos');
    tags.push({
      id: `matchType_${f.matchType}`,
      type: 'matchType',
      value: f.matchType,
      label: `${t('filters.tagType', 'Tipo')}: ${label}`
    });
  }

  if (f.surfaces && f.surfaces.length > 0) {
    for (const s of f.surfaces) {
      const surfaceName = s === 'Clay'
        ? t('filters.clay', 'Polvo de ladrillo')
        : s === 'Hard'
          ? t('filters.hard', 'Cemento')
          : s === 'Grass'
            ? t('filters.grass', 'Césped')
            : t('filters.indoor', 'Cubierta / Indoor');
      tags.push({
        id: `surface_${s}`,
        type: 'surface',
        value: s,
        label: `${t('filters.tagSurface', 'Superficie')}: ${surfaceName}`
      });
    }
  }

  if (f.setsCount && f.setsCount !== 'all') {
    tags.push({
      id: `setsCount_${f.setsCount}`,
      type: 'setsCount',
      value: f.setsCount,
      label: `${t('filters.tagSets', 'Sets')}: ${f.setsCount}`
    });
  }

  if (f.withTiebreak) {
    tags.push({
      id: 'switch_tiebreak',
      type: 'tiebreak',
      value: true,
      label: t('filters.tagTiebreak', 'Tiebreak')
    });
  }

  if (f.comebackOnly) {
    tags.push({
      id: 'switch_comeback',
      type: 'comeback',
      value: true,
      label: t('filters.tagComeback', 'Remontada')
    });
  }

  if (f.withBagel) {
    tags.push({
      id: 'switch_bagel',
      type: 'bagel',
      value: true,
      label: t('filters.tagBagel', 'Set 6-0')
    });
  }

  if (f.tournaments && f.tournaments.length > 0) {
    for (const tId of f.tournaments) {
      const found = props.availableTournaments?.find(item => item.id === tId);
      const name = found ? found.name : tId;
      tags.push({
        id: `tournament_${tId}`,
        type: 'tournament',
        value: tId,
        label: `${t('filters.tagTournament', 'Torneo')}: ${name}`
      });
    }
  }

  if (f.rivals && f.rivals.length > 0) {
    for (const r of f.rivals) {
      tags.push({
        id: `rival_${r}`,
        type: 'rival',
        value: r,
        label: `${t('filters.tagRival', 'Rival')}: ${r}`
      });
    }
  }

  if (f.datePreset && f.datePreset !== 'all') {
    let presetLabel: string = f.datePreset;
    if (f.datePreset === '7d') presetLabel = t('filters.last7Days', 'Últimos 7 días');
    else if (f.datePreset === '30d') presetLabel = t('filters.last30Days', 'Últimos 30 días');
    else if (f.datePreset === '3m') presetLabel = t('filters.last3Months', 'Últimos 3 meses');
    else if (f.datePreset === '6m') presetLabel = t('filters.last6Months', 'Últimos 6 meses');
    else if (f.datePreset === 'year') presetLabel = t('filters.thisYear', 'Este año');
    tags.push({
      id: `datePreset_${f.datePreset}`,
      type: 'datePreset',
      value: f.datePreset,
      label: `${t('filters.tagPeriod', 'Período')}: ${presetLabel}`
    });
  }

  return tags;
});

const onSearchInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('update:searchQuery', val);
  emit('change', val, props.activeFilter);
  if (props.filters) {
    emit('update:filters', {
      ...props.filters,
      searchQuery: val
    });
  }
};

const clearSearch = () => {
  emit('update:searchQuery', '');
  emit('change', '', props.activeFilter);
  if (props.filters) {
    emit('update:filters', {
      ...props.filters,
      searchQuery: ''
    });
  }
};

const selectFilter = (val: string) => {
  emit('update:activeFilter', val);
  emit('change', props.searchQuery, val);

  if (props.filters) {
    const updated = { ...props.filters };
    if (val === 'all') {
      updated.outcome = 'all';
      updated.matchType = 'all';
    } else if (val === 'wins' || val === 'losses') {
      updated.outcome = val as MatchOutcome;
      updated.matchType = 'all';
    } else if (val === 'tournament' || val === 'friendly') {
      updated.matchType = val as MatchClassification;
      updated.outcome = 'all';
    }
    emit('update:filters', updated);
  }
};

const removeTag = (tag: FilterTag) => {
  if (!props.filters) return;
  const updated = { ...props.filters };

  if (tag.type === 'outcome') {
    updated.outcome = 'all';
    if (props.activeFilter === tag.value) emit('update:activeFilter', 'all');
  } else if (tag.type === 'matchType') {
    updated.matchType = 'all';
    if (props.activeFilter === tag.value) emit('update:activeFilter', 'all');
  } else if (tag.type === 'surface') {
    updated.surfaces = updated.surfaces.filter(s => s !== tag.value);
  } else if (tag.type === 'tournament') {
    updated.tournaments = updated.tournaments.filter(id => id !== tag.value);
  } else if (tag.type === 'rival') {
    updated.rivals = updated.rivals.filter(r => r !== tag.value);
  } else if (tag.type === 'datePreset') {
    updated.datePreset = 'all';
  } else if (tag.type === 'tiebreak') {
    updated.withTiebreak = false;
  } else if (tag.type === 'comeback') {
    updated.comebackOnly = false;
  } else if (tag.type === 'bagel') {
    updated.withBagel = false;
  } else if (tag.type === 'setsCount') {
    updated.setsCount = 'all';
  }

  emit('update:filters', updated);
};

const clearAllFilters = () => {
  emit('update:searchQuery', '');
  emit('update:activeFilter', 'all');
  if (props.filters) {
    emit('update:filters', {
      searchQuery: '',
      outcome: 'all',
      matchType: 'all',
      surfaces: [],
      tournaments: [],
      rivals: [],
      datePreset: 'all',
      setsCount: 'all',
      withTiebreak: false,
      comebackOnly: false,
      withBagel: false,
      opponentHand: 'all',
      opponentBackhand: 'all',
    });
  }
  emit('clearAll');
};
</script>
