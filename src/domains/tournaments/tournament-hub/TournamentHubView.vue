<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" v-if="!loading">
      
      <!-- Top Actions Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold">Torneos & Competiciones</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Administra tus cuadros, sedes y estadísticas oficiales.</p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-alt hover:bg-primary text-white font-semibold text-sm shadow-md transition-all min-h-[44px]"
        >
          <span class="material-icons-round text-lg">add</span>
          <span>+ Crear Torneo</span>
        </button>
      </div>

      <!-- If Tournaments Exist -->
      <div v-if="tournaments.length > 0" class="space-y-6">
        
        <!-- Tournament Selector Pills (if more than 1) -->
        <div v-if="tournaments.length > 1" class="flex items-center gap-2 overflow-x-auto pb-2">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Tus torneos:</span>
          <button
            v-for="t in tournaments"
            :key="t.id"
            @click="selectTournament(t)"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 min-h-[36px]"
            :class="activeTournament?.id === t.id 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'bg-white dark:bg-card-dark text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'"
          >
            {{ t.name }}
          </button>
        </div>

        <!-- Active Tournament Header -->
        <div v-if="activeTournament">
          <TournamentHeader :tournament="activeTournament" class="mb-6" />
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <!-- Sidebar: Upcoming match & Weather widget -->
            <div class="lg:col-span-1 flex flex-col gap-6">
              <UpcomingMatches :match="nextMatch" />
              <PressureStats :stats="pressureStats!" v-if="pressureStats" />
              <div class="h-48">
                <WeatherWidget />
              </div>
            </div>
            
            <!-- Bracket or Bracket Empty State -->
            <div class="lg:col-span-2">
              <BracketVisualization v-if="bracketMatches.length > 0" :matches="bracketMatches" />
              <div v-else class="glass-panel p-8 rounded-2xl text-center space-y-3">
                <span class="material-icons-round text-5xl text-amber-500/50">account_tree</span>
                <h3 class="text-base font-semibold">Cuadro en Espera</h3>
                <p class="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Los cruces de este torneo se generarán a medida que registres tus partidos asociados desde el reloj.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clean Empty State if No Tournaments -->
      <div v-else class="glass-panel text-center py-16 px-6 rounded-2xl space-y-4 max-w-xl mx-auto border border-dashed border-slate-300 dark:border-slate-700">
        <div class="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
          <span class="material-icons-round text-3xl">emoji_events</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">No tienes torneos registrados aún</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Crea tu primer torneo para asociar tus partidos oficiales, registrar superficies y seguir tu progresión competitiva.
        </p>
        <button 
          @click="showCreateModal = true"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-alt hover:bg-primary text-white rounded-xl font-semibold shadow-md transition-all min-h-[44px]"
        >
          <span class="material-icons-round text-lg">add</span>
          <span>+ Crear Torneo</span>
        </button>
      </div>

    </main>

    <!-- Loading Spinner -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-slate-500">
      <span class="material-icons-round animate-spin text-4xl">refresh</span>
    </div>

    <!-- Create Tournament Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="showCreateModal = false" />
      
      <div class="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg p-6 space-y-5 z-10">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-amber-500 text-2xl">emoji_events</span>
            <h3 class="text-lg font-bold">Crear Nuevo Torneo</h3>
          </div>
          <button 
            @click="showCreateModal = false"
            class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span class="material-icons-round">close</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Nombre del Torneo *
            </label>
            <input 
              v-model="form.name"
              type="text" 
              required
              placeholder="Ej: Abierto Primavera 2026"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
            />
          </div>

          <!-- Lugar / Club -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Club / Lugar *
            </label>
            <input 
              v-model="form.location"
              type="text" 
              required
              placeholder="Ej: Tenis Club Buenos Aires"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
            />
          </div>

          <!-- Superficie -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Superficie *
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="form.surface = 'Clay'"
                class="px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Clay' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold' 
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
              >
                Polvo de ladrillo
              </button>
              <button
                type="button"
                @click="form.surface = 'Hard'"
                class="px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Hard' 
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
              >
                Rápida (Cemento)
              </button>
              <button
                type="button"
                @click="form.surface = 'Grass'"
                class="px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Grass' 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
              >
                Césped
              </button>
            </div>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Categoría (Opcional)
            </label>
            <input 
              v-model="form.category"
              type="text" 
              placeholder="Ej: Cuarta, Libre, Senior +35"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
            />
          </div>

          <!-- Estado -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Estado inicial
            </label>
            <select
              v-model="form.status"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
            >
              <option value="active">Activo (En curso)</option>
              <option value="upcoming">Próximo</option>
              <option value="completed">Finalizado</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700/60">
            <button 
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-alt hover:bg-primary text-white shadow-md disabled:opacity-50 transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span v-if="saving" class="material-icons-round animate-spin text-sm">refresh</span>
              <span>Guardar Torneo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTournament } from './composables/useTournament';
import TournamentHeader from './components/TournamentHeader.vue';
import BracketVisualization from './components/BracketVisualization.vue';
import UpcomingMatches from './components/UpcomingMatches.vue';
import PressureStats from './components/PressureStats.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import { auth } from '@/shared/services/firebase';

const {
  tournaments,
  activeTournament,
  bracketMatches,
  pressureStats,
  nextMatch,
  loading,
  selectTournament,
  createTournament
} = useTournament();

const showCreateModal = ref(false);
const saving = ref(false);

const form = ref({
  name: '',
  location: '',
  surface: 'Clay' as 'Clay' | 'Hard' | 'Grass',
  category: '',
  status: 'active' as 'active' | 'upcoming' | 'completed'
});

const handleSubmit = async () => {
  if (!form.value.name || !form.value.location) return;
  saving.value = true;
  try {
    await createTournament({
      userId: auth.currentUser?.uid || 'guest_user',
      name: form.value.name.trim(),
      location: form.value.location.trim(),
      surface: form.value.surface,
      category: form.value.category?.trim() || undefined,
      status: form.value.status,
      startDate: Date.now()
    });

    // Reset form and close
    form.value = {
      name: '',
      location: '',
      surface: 'Clay',
      category: '',
      status: 'active'
    };
    showCreateModal.value = false;
  } catch (err) {
    console.error('Error creating tournament:', err);
    alert('Error al crear el torneo. Por favor, intenta de nuevo.');
  } finally {
    saving.value = false;
  }
};
</script>
