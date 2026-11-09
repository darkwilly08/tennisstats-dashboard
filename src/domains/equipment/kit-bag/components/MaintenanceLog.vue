<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden h-full">
    <div class="relative z-10 space-y-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-lg font-display font-semibold flex items-center gap-2 text-on-surface">
          <span class="material-icons-round text-primary">history</span>
          Historial de Mantenimiento & Encordado
        </h2>
        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-container text-on-primary-container shrink-0">
          Próximamente
        </span>
      </div>

      <!-- Professional Coming Soon Banner Card -->
      <div class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant space-y-3">
        <div class="flex items-start gap-3">
          <span class="material-icons-round text-primary text-2xl mt-0.5">straighten</span>
          <div class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <strong class="font-semibold text-on-surface">Seguimiento Automático de Desgaste:</strong>
            El registro de encordados, tensión en libras/kg y alertas preventivas de fatiga de cuerda se habilitarán en la próxima versión, calibrados automáticamente con las horas jugadas registradas en tu Wear OS.
          </div>
        </div>
      </div>

      <!-- Real Logs if any, or clean empty placeholder -->
      <div v-if="logs.length > 0" class="relative border-l-2 border-outline ml-3 pl-6 space-y-4 pt-2">
        <div v-for="log in logs" :key="log.id" class="relative group">
          <div class="absolute -left-[31px] bg-surface p-1 rounded-full border-2 border-outline shadow-sm">
            <span class="material-icons-round text-xs text-primary">build</span>
          </div>
          <div class="text-[11px] text-on-surface-variant font-medium">{{ new Date(log.date).toLocaleDateString() }}</div>
          <h4 class="font-bold text-xs text-on-surface">{{ log.type }}</h4>
          <p class="text-xs text-on-surface-variant mt-0.5" v-if="log.notes">{{ log.notes }}</p>
        </div>
      </div>
      <div v-else class="text-center py-6 text-on-surface-variant text-xs">
        Sin eventos manuales registrados recientemente.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaintenanceLogEntry } from '../types';

defineProps<{
  logs: MaintenanceLogEntry[]
}>();
</script>
