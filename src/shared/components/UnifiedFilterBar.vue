<template>
  <div class="space-y-3">
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

      <!-- Quick Reset / Total Count (if provided) -->
      <div v-if="totalCount !== undefined" class="hidden sm:flex items-center text-xs text-on-surface-variant font-medium shrink-0">
        <span>{{ totalCount }} items</span>
      </div>
    </div>

    <!-- Filter Chips Pill Bar -->
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface FilterChip {
  label: string;
  value: string;
  count?: number;
}

const props = withDefaults(defineProps<{
  searchQuery?: string;
  activeFilter?: string;
  placeholder?: string;
  chips?: FilterChip[];
  totalCount?: number;
}>(), {
  searchQuery: '',
  activeFilter: 'all',
  placeholder: 'Buscar...',
  chips: () => [],
});

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'update:activeFilter', val: string): void;
  (e: 'change', query: string, filter: string): void;
}>();

const placeholderText = computed(() => props.placeholder);

const onSearchInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('update:searchQuery', val);
  emit('change', val, props.activeFilter);
};

const clearSearch = () => {
  emit('update:searchQuery', '');
  emit('change', '', props.activeFilter);
};

const selectFilter = (val: string) => {
  emit('update:activeFilter', val);
  emit('change', props.searchQuery, val);
};
</script>
