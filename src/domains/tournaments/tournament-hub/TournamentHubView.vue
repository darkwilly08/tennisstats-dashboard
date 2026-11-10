<template>
  <div class="bg-background text-on-surface min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" v-if="!loading">
      
      <!-- Top Actions Bar with subtle M3 icon button -->
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold text-on-surface">Torneos & Competiciones</h2>
          <p class="text-xs sm:text-sm text-on-surface-variant">Administra tus cuadros, sedes y estadísticas oficiales.</p>
        </div>

        <button 
          @click="showCreateModal = true"
          aria-label="Crear Torneo"
          title="Crear Torneo"
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-on-primary hover:opacity-90 transition-all shadow-sm flex items-center justify-center shrink-0 min-h-[40px]"
        >
          <span class="material-icons-round text-xl sm:text-2xl">add</span>
          <span class="sr-only">Crear Torneo</span>
        </button>
      </div>

      <!-- Unified Filter Bar across tournaments -->
      <UnifiedFilterBar
        v-if="tournaments.length > 0"
        v-model:searchQuery="tournamentSearch"
        v-model:activeFilter="tournamentFilter"
        :chips="filterChips"
        placeholder="Buscar torneo por nombre o club..."
        :totalCount="filteredTournaments.length"
      />

      <!-- If Tournaments Exist -->
      <div v-if="tournaments.length > 0" class="space-y-6">
        
        <!-- Tournament Selector Pills -->
        <div v-if="filteredTournaments.length > 0" class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mr-1">Tus torneos:</span>
          <button
            v-for="t in filteredTournaments"
            :key="t.id"
            @click="selectTournament(t)"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 min-h-[40px]"
            :class="activeTournament?.id === t.id 
              ? 'bg-primary text-on-primary shadow-sm font-bold' 
              : 'bg-surface text-on-surface border border-outline hover:bg-surface-variant'"
          >
            {{ t.name }}
          </button>
        </div>

        <!-- Active Tournament Content -->
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
            <div class="lg:col-span-2 space-y-6">
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

              <!-- Matches assigned to activeTournament from matches collection -->
              <div class="glass-panel bg-surface text-on-surface rounded-2xl overflow-hidden p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="material-icons-round text-primary text-xl">sports_tennis</span>
                    <h3 class="text-base font-bold text-on-surface">Partidos Oficiales Jugados</h3>
                  </div>
                  <span class="text-xs font-medium text-on-surface-variant">
                    {{ tournamentMatches.length }} partido(s)
                  </span>
                </div>

                <div v-if="tournamentMatches.length > 0" class="divide-y divide-outline-variant">
                  <div 
                    v-for="m in tournamentMatches" 
                    :key="m.id"
                    class="py-3 flex items-center justify-between gap-3 text-sm"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div 
                        class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        :class="m.win ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'"
                      >
                        {{ m.win ? 'V' : 'D' }}
                      </div>
                      <div class="min-w-0">
                        <div class="font-bold text-on-surface truncate">vs {{ m.rival || 'Rival' }}</div>
                        <div class="text-xs text-on-surface-variant">
                          {{ new Date(m.idt).toLocaleDateString() }}
                        </div>
                      </div>
                    </div>

                    <div class="text-right shrink-0">
                      <span 
                        class="px-2.5 py-1 rounded-md text-xs font-bold"
                        :class="m.win ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'"
                      >
                        {{ formatMatchScore(m) }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-else class="text-xs sm:text-sm text-on-surface-variant text-center py-4">
                  Aún no registras partidos para este torneo. Asocia un partido desde la pantalla de estadísticas o registra un partido en tu Wear OS.
                </div>
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

    <!-- Loading Spinner (initial load only) -->
    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>

    <!-- Create Tournament Bottom Sheet Modal -->
    <CreateTournamentModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTournament } from './composables/useTournament';
import TournamentHeader from './components/TournamentHeader.vue';
import BracketVisualization from './components/BracketVisualization.vue';
import UpcomingMatches from './components/UpcomingMatches.vue';
import PressureStats from './components/PressureStats.vue';
import WeatherWidget from './components/WeatherWidget.vue';
import CreateTournamentModal from './components/CreateTournamentModal.vue';
import UnifiedFilterBar, { type FilterChip } from '@/shared/components/UnifiedFilterBar.vue';
import type { MatchPayload } from '@/domains/tennis-core/_shared/types';

const {
  tournaments,
  activeTournament,
  bracketMatches,
  tournamentMatches,
  pressureStats,
  nextMatch,
  loading,
  selectTournament,
} = useTournament();

const showCreateModal = ref(false);
const tournamentSearch = ref('');
const tournamentFilter = ref('all');

const filterChips = computed<FilterChip[]>(() => [
  { label: 'Todos', value: 'all', count: tournaments.value.length },
  { label: 'En Curso', value: 'active', count: tournaments.value.filter(t => t.status === 'active').length },
  { label: 'Próximos', value: 'upcoming', count: tournaments.value.filter(t => t.status === 'upcoming').length },
  { label: 'Finalizados', value: 'completed', count: tournaments.value.filter(t => t.status === 'completed').length },
]);

const filteredTournaments = computed(() => {
  let list = tournaments.value;
  if (tournamentFilter.value !== 'all') {
    list = list.filter(t => t.status === tournamentFilter.value);
  }
  const q = tournamentSearch.value.trim().toLowerCase();
  if (q) {
    list = list.filter(t => {
      const name = t.name.toLowerCase();
      const loc = typeof t.location === 'string' ? t.location.toLowerCase() : '';
      return name.includes(q) || loc.includes(q);
    });
  }
  return list;
});

const formatMatchScore = (m: MatchPayload) => {
  if (m.sets && m.sets.length > 0) {
    return m.sets.map(s => `${s.me}-${s.rival}`).join(' ');
  }
  return m.win ? 'Ganado' : 'Perdido';
};
</script>
