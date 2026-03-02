<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
    <header class="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-gray-200 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="p-2 bg-emerald-500 rounded-lg text-white shadow-glow">
            <span class="material-icons-round">work</span>
          </div>
          <div>
            <h1 class="font-display text-2xl font-semibold tracking-wide uppercase">Kit Bag</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Equipment & Maintenance</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-alt text-white shadow-sm hover:bg-primary transition-colors">
            <span class="material-icons-round text-sm">add</span>
            <span class="text-sm font-medium">Add Gear</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8" v-if="!loading">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Racquets Section -->
        <div class="lg:col-span-2 space-y-6">
          <h2 class="text-xl font-display font-semibold flex items-center gap-2">
            <span class="material-icons-round text-emerald-500">sports_tennis</span>
            Racquets
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RacquetCard 
              v-for="racquet in racquets" 
              :key="racquet.id" 
              :racquet="racquet" 
            />
          </div>
        </div>
        
        <!-- Sidebar: Footwear & Maintenance -->
        <div class="space-y-8">
          <FootwearSection :shoes="shoes" />
          <MaintenanceLog :logs="logs" />
        </div>
      </div>
    </main>
    <div v-else class="max-w-7xl mx-auto px-6 py-12 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-3xl">refresh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKitBag } from './composables/useKitBag';
import RacquetCard from './components/RacquetCard.vue';
import FootwearSection from './components/FootwearSection.vue';
import MaintenanceLog from './components/MaintenanceLog.vue';

const { racquets, shoes, logs, loading } = useKitBag();
</script>
