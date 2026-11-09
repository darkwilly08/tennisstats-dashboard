<template>
  <div class="bg-background text-on-surface min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" v-if="!loading">
      
      <!-- Top Actions Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold text-on-surface">Torneos & Competiciones</h2>
          <p class="text-xs sm:text-sm text-on-surface-variant">Administra tus cuadros, sedes y estadísticas oficiales.</p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center min-h-[44px] text-sm"
        >
          <span class="material-icons-round text-lg mr-2">add</span>
          <span>Crear Torneo</span>
        </button>
      </div>

      <!-- If Tournaments Exist -->
      <div v-if="tournaments.length > 0" class="space-y-6">
        
        <!-- Tournament Selector Pills (if more than 1) -->
        <div v-if="tournaments.length > 1" class="flex items-center gap-2 overflow-x-auto pb-2">
          <span class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mr-1">Tus torneos:</span>
          <button
            v-for="t in tournaments"
            :key="t.id"
            @click="selectTournament(t)"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 min-h-[40px]"
            :class="activeTournament?.id === t.id 
              ? 'bg-primary text-on-primary shadow-sm' 
              : 'bg-surface text-on-surface border border-outline hover:bg-surface-variant'"
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
              <div v-else class="glass-panel bg-surface text-on-surface p-8 rounded-2xl text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span class="material-icons-round text-2xl">account_tree</span>
                </div>
                <h3 class="text-base font-bold text-on-surface">Cuadro en Espera</h3>
                <p class="text-xs sm:text-sm text-on-surface-variant max-w-sm mx-auto">
                  Los cruces de este torneo se generarán a medida que registres tus partidos asociados desde el reloj.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clean Empty State if No Tournaments -->
      <div v-else class="glass-panel bg-surface text-on-surface text-center py-16 px-6 rounded-2xl space-y-4 max-w-xl mx-auto border border-outline">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
          <span class="material-icons-round text-3xl">emoji_events</span>
        </div>
        <h3 class="text-xl font-bold text-on-surface">No tienes torneos registrados aún</h3>
        <p class="text-sm text-on-surface-variant">
          Crea tu primer torneo para asociar tus partidos oficiales, registrar superficies y seguir tu progresión competitiva.
        </p>
        <div class="flex justify-center pt-2">
          <button 
            @click="showCreateModal = true"
            class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center min-h-[44px]"
          >
            <span class="material-icons-round text-lg mr-2">add</span>
            <span>Crear Torneo</span>
          </button>
        </div>
      </div>

    </main>

    <!-- Loading Spinner -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>

    <!-- Create Tournament Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="showCreateModal = false" />
      
      <div class="relative bg-surface text-on-surface rounded-2xl shadow-2xl border border-outline w-full max-w-lg p-6 space-y-5 z-10">
        <div class="flex items-center justify-between border-b border-outline-variant pb-3">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-primary text-2xl">emoji_events</span>
            <h3 class="text-lg font-bold text-on-surface">Crear Nuevo Torneo</h3>
          </div>
          <button 
            @click="showCreateModal = false"
            aria-label="Cerrar"
            class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span class="material-icons-round">close</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Nombre del Torneo *
            </label>
            <input 
              v-model="form.name"
              type="text" 
              required
              placeholder="Ej: Abierto Primavera 2026"
              class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <!-- Lugar / Club -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Club / Lugar *
            </label>
            <input 
              v-model="form.location"
              type="text" 
              required
              placeholder="Ej: Tenis Club Buenos Aires"
              class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <!-- Superficie -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Superficie *
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="form.surface = 'Clay'"
                class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Clay' 
                  ? 'border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                  : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
              >
                Polvo de ladrillo
              </button>
              <button
                type="button"
                @click="form.surface = 'Hard'"
                class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Hard' 
                  ? 'border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                  : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
              >
                Rápida (Cemento)
              </button>
              <button
                type="button"
                @click="form.surface = 'Grass'"
                class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
                :class="form.surface === 'Grass' 
                  ? 'border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                  : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
              >
                Césped
              </button>
            </div>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Categoría (Opcional)
            </label>
            <input 
              v-model="form.category"
              type="text" 
              placeholder="Ej: Cuarta, Libre, Senior +35"
              class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <!-- Estado -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Estado inicial
            </label>
            <select
              v-model="form.status"
              class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="active">Activo (En curso)</option>
              <option value="upcoming">Próximo</option>
              <option value="completed">Finalizado</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
            <button 
              type="button"
              @click="showCreateModal = false"
              class="bg-surface border border-outline text-on-surface hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium px-5 py-2.5 rounded-xl text-sm min-h-[44px]"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-sm disabled:opacity-50 min-h-[44px]"
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
import { getActiveSessionUser } from '@/shared/services/firebase';

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
      userId: getActiveSessionUser()?.uid || 'guest_user',
      name: form.value.name.trim(),
      location: form.value.location.trim(),
      surface: form.value.surface,
      category: form.value.category?.trim() || undefined,
      status: form.value.status,
      startDate: Date.now()
    });

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
