<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8" v-if="!loading">
      
      <!-- Top Actions Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold">The Kit Bag</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Control de raquetas, cuerdas, tensión y desgaste de calzado.</p>
        </div>
        <button 
          @click="showAddGearNotice = true"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all min-h-[44px]"
        >
          <span class="material-icons-round text-lg">add</span>
          <span>+ Agregar Equipo</span>
        </button>
      </div>

      <!-- Notice when user clicks Add Gear -->
      <div v-if="showAddGearNotice" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start justify-between gap-4">
        <div class="flex items-start gap-3">
          <span class="material-icons-round text-emerald-500 text-2xl">info</span>
          <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <strong class="font-bold text-slate-900 dark:text-white">Sincronización de Equipo:</strong>
            El asistente para calibrar nuevas raquetas y sobregrips estará habilitado en el próximo update. Podrás seleccionar tu raqueta directamente desde la app en tu reloj antes de comenzar a jugar.
          </div>
        </div>
        <button @click="showAddGearNotice = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-white">
          <span class="material-icons-round text-lg">close</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Racquets Section -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-display font-semibold flex items-center gap-2">
              <span class="material-icons-round text-emerald-500">sports_tennis</span>
              Raquetas
            </h2>
            <span class="text-xs text-slate-400">{{ racquets.length }} raqueta(s)</span>
          </div>
          
          <div v-if="racquets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RacquetCard 
              v-for="racquet in racquets" 
              :key="racquet.id" 
              :racquet="racquet" 
            />
          </div>
          <div v-else class="glass-panel p-8 rounded-2xl text-center space-y-3 border border-dashed border-slate-300 dark:border-slate-700">
            <div class="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <span class="material-icons-round text-2xl">sports_tennis</span>
            </div>
            <h3 class="text-base font-semibold">Sin Raquetas Registradas</h3>
            <p class="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Registra tu raqueta principal para vincular el encordado y horas de juego acumuladas con los datos del reloj Wear OS.
            </p>
          </div>
        </div>
        
        <!-- Sidebar: Footwear & Maintenance Log (Coming Soon) -->
        <div class="space-y-8">
          <FootwearSection :shoes="shoes" />
          <MaintenanceLog :logs="logs" />
        </div>
      </div>
    </main>

    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-4xl">refresh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useKitBag } from './composables/useKitBag';
import RacquetCard from './components/RacquetCard.vue';
import FootwearSection from './components/FootwearSection.vue';
import MaintenanceLog from './components/MaintenanceLog.vue';

const { racquets, shoes, logs, loading } = useKitBag();
const showAddGearNotice = ref(false);
</script>
