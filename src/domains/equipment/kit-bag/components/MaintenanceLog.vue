<template>
  <div class="glass-panel p-6 rounded-2xl relative overflow-hidden h-full">
    <div class="relative z-10 leading-none">
      <h2 class="text-xl font-display font-semibold mb-6 flex items-center gap-2">
        <span class="material-icons-round text-amber-500">history</span>
        Maintenance Log
      </h2>
      
      <div class="relative border-l-2 border-gray-200 dark:border-slate-700 ml-3 pl-6 space-y-6">
        <div v-for="log in logs" :key="log.id" class="relative group">
          <div class="absolute -left-[31px] bg-white dark:bg-card-dark p-1 rounded-full border-2 border-gray-200 dark:border-slate-700 shadow-sm group-hover:border-primary-alt transition-colors">
            <span class="material-icons-round text-xs" :class="getLogIconClass(log.type)">
              {{ getLogIcon(log.type) }}
            </span>
          </div>
          
          <div class="text-xs text-slate-400 font-medium mb-1 tracking-wider">{{ new Date(log.date).toLocaleDateString() }}</div>
          <h4 class="font-bold text-sm text-slate-800 dark:text-white">{{ getLogTitle(log.type) }}</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1" v-if="log.notes">{{ log.notes }}</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaintenanceLogEntry } from '../types';

defineProps<{
  logs: MaintenanceLogEntry[]
}>();

const getLogIcon = (type: string) => {
  const map: Record<string, string> = {
    restring: 'straighten',
    overgrip: 'pan_tool',
    new_gear: 'inventory_2',
    repair: 'build'
  };
  return map[type] || 'history';
};

const getLogIconClass = (type: string) => {
  const map: Record<string, string> = {
    restring: 'text-amber-500',
    overgrip: 'text-indigo-500',
    new_gear: 'text-emerald-500',
    repair: 'text-rose-500'
  };
  return map[type] || 'text-slate-500';
};

const getLogTitle = (type: string) => {
  const map: Record<string, string> = {
    restring: 'Racquet Restrung',
    overgrip: 'Overgrip Changed',
    new_gear: 'New Gear Added',
    repair: 'Gear Repaired'
  };
  return map[type] || 'Maintenance Event';
};
</script>
