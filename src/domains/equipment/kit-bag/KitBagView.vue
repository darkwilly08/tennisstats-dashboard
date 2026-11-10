<template>
  <div class="bg-background text-on-surface min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8" v-if="!loading">
      
      <!-- Top Actions Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold text-on-surface">The Kit Bag</h2>
          <p class="text-xs sm:text-sm text-on-surface-variant">Control de raquetas, cuerdas, tensión y desgaste de calzado.</p>
        </div>
        <button 
          @click="showAddGearModal = true"
          class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center min-h-[44px] text-sm"
        >
          <span class="material-icons-round text-lg mr-2">add</span>
          <span>Agregar Equipo</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Racquets Section -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-display font-semibold flex items-center gap-2 text-on-surface">
              <span class="material-icons-round text-primary">sports_tennis</span>
              Raquetas
            </h2>
            <span class="text-xs font-medium text-on-surface-variant">{{ racquets.length }} raqueta(s)</span>
          </div>
          
          <div v-if="racquets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RacquetCard 
              v-for="racquet in racquets" 
              :key="racquet.id" 
              :racquet="racquet" 
            />
          </div>
          <div v-else class="glass-panel bg-surface text-on-surface p-8 rounded-2xl text-center space-y-3 border border-outline">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
              <span class="material-icons-round text-2xl">sports_tennis</span>
            </div>
            <h3 class="text-base font-bold text-on-surface">Sin Raquetas Registradas</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant max-w-sm mx-auto">
              Registra tu raqueta principal para vincular el encordado y horas de juego acumuladas con los datos del reloj Wear OS.
            </p>
          </div>
        </div>
        
        <!-- Sidebar: Footwear & Maintenance Log -->
        <div class="space-y-8">
          <FootwearSection :shoes="shoes" />
          <MaintenanceLog :logs="logs" />
        </div>
      </div>
    </main>

    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>

    <!-- Add Gear Bottom Sheet Modal -->
    <AddGearModal
      :isOpen="showAddGearModal"
      @close="showAddGearModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useKitBag } from './composables/useKitBag';
import RacquetCard from './components/RacquetCard.vue';
import FootwearSection from './components/FootwearSection.vue';
import MaintenanceLog from './components/MaintenanceLog.vue';
import AddGearModal from './components/AddGearModal.vue';

const { racquets, shoes, logs, loading } = useKitBag();
const showAddGearModal = ref(false);
</script>
