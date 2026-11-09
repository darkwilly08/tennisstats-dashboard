<template>
  <div class="bg-background text-on-surface min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8" v-if="!loading">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-display font-bold text-on-surface">Rivales & Scouting Report</h2>
          <p class="text-xs sm:text-sm text-on-surface-variant">
            Historial de enfrentamientos directos y análisis de patrones de juego.
          </p>
        </div>
      </div>

      <!-- Professional AI Tactical Analysis Coming Soon Banner -->
      <div class="glass-panel bg-surface text-on-surface p-6 sm:p-8 rounded-2xl border-l-4 border-l-primary relative overflow-hidden space-y-4">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <span class="material-icons-round text-2xl">psychology</span>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-lg font-bold text-on-surface">Predicciones Tácticas con Inteligencia Artificial</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-container text-on-primary-container">
                Próximamente
              </span>
            </div>
            <p class="text-xs text-on-surface-variant">Motor de análisis predictivo basado en métricas de Wear OS</p>
          </div>
        </div>

        <p class="text-sm text-on-surface-variant max-w-3xl leading-relaxed">
          El módulo de Inteligencia Artificial detectará automáticamente las zonas vulnerables de tus oponentes, eficacia de servicio bajo presión y tendencias en quiebres de saque a partir de las trayectorias y puntos registrados en tu reloj inteligente.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-3.5 rounded-xl bg-surface-variant/60 border border-outline-variant flex items-center gap-3">
            <span class="material-icons-round text-primary text-xl">insights</span>
            <div>
              <div class="text-xs font-semibold text-on-surface">Patrones de Saque</div>
              <div class="text-[11px] text-on-surface-variant">Predicción de direcciones de primer y segundo saque</div>
            </div>
          </div>
          <div class="p-3.5 rounded-xl bg-surface-variant/60 border border-outline-variant flex items-center gap-3">
            <span class="material-icons-round text-primary text-xl">speed</span>
            <div>
              <div class="text-xs font-semibold text-on-surface">Puntos de Presión</div>
              <div class="text-[11px] text-on-surface-variant">Rendimiento en tiebreaks y break points</div>
            </div>
          </div>
          <div class="p-3.5 rounded-xl bg-surface-variant/60 border border-outline-variant flex items-center gap-3">
            <span class="material-icons-round text-primary text-xl">tune</span>
            <div>
              <div class="text-xs font-semibold text-on-surface">Plan Táctico</div>
              <div class="text-[11px] text-on-surface-variant">Estrategias recomendadas por superficie</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Real Rivals & Head to Head Section -->
      <div v-if="rivalsList.length > 0" class="space-y-6">
        <h3 class="text-lg font-bold flex items-center gap-2 text-on-surface">
          <span class="material-icons-round text-primary">groups</span>
          Tus Rivales ({{ rivalsList.length }})
        </h3>

        <!-- Rival Selector Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            v-for="r in rivalsList"
            :key="r.name"
            @click="selectedRivalName = r.name"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 min-h-[44px]"
            :class="selectedRivalName === r.name 
              ? 'bg-primary text-on-primary shadow-sm' 
              : 'bg-surface text-on-surface border border-outline hover:bg-surface-variant'"
          >
            <span>{{ r.name }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full" :class="selectedRivalName === r.name ? 'bg-on-primary/20 text-on-primary' : 'bg-secondary-container text-on-secondary-container'">
              {{ r.won }}-{{ r.lost }}
            </span>
          </button>
        </div>

        <!-- Selected Rival Stats Card -->
        <div v-if="selectedRival" class="glass-panel bg-surface text-on-surface p-6 rounded-2xl space-y-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant pb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg border border-outline">
                {{ selectedRival.name.slice(0, 2).toUpperCase() }}
              </div>
              <div>
                <h4 class="text-xl font-bold text-on-surface">{{ selectedRival.name }}</h4>
                <p class="text-xs text-on-surface-variant">Total de enfrentamientos: {{ selectedRival.total }} partidos</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="text-center px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-bold">
                <div class="text-lg">{{ selectedRival.won }}</div>
                <div class="text-[10px] uppercase tracking-wider">Ganados</div>
              </div>
              <div class="text-center px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-container font-bold">
                <div class="text-lg">{{ selectedRival.lost }}</div>
                <div class="text-[10px] uppercase tracking-wider">Perdidos</div>
              </div>
              <div class="text-center px-4 py-2 rounded-xl bg-surface-variant text-on-surface font-bold border border-outline-variant">
                <div class="text-lg">{{ selectedRival.winRate }}%</div>
                <div class="text-[10px] uppercase tracking-wider text-on-surface-variant">Eficacia</div>
              </div>
            </div>
          </div>

          <!-- Match History against this rival -->
          <div>
            <h5 class="text-sm font-semibold mb-3 text-on-surface">Historial de Partidos con {{ selectedRival.name }}</h5>
            <div class="space-y-2">
              <div 
                v-for="m in selectedRival.matches" 
                :key="m.id || m.idt"
                class="flex items-center justify-between p-3.5 rounded-xl bg-surface-variant/50 border border-outline-variant text-xs sm:text-sm"
              >
                <div class="flex items-center gap-3">
                  <span 
                    class="px-2.5 py-0.5 rounded-md text-xs font-bold"
                    :class="m.win ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'"
                  >
                    {{ m.win ? 'VICTORIA' : 'DERROTA' }}
                  </span>
                  <span class="text-on-surface-variant">{{ new Date(m.idt).toLocaleDateString() }}</span>
                  <span v-if="m.surface" class="px-2 py-0.5 rounded bg-surface border border-outline text-on-surface text-[10px] font-semibold">
                    {{ m.surface }}
                  </span>
                </div>
                <div class="font-bold text-on-surface">
                  {{ m.sets ? m.sets.map(s => `${s.me}-${s.rival}`).join(' ') : 'Sin resultado' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State if No Rivals Recorded -->
      <div v-else class="glass-panel bg-surface text-on-surface text-center py-16 px-6 rounded-2xl space-y-4 max-w-md mx-auto border border-outline">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
          <span class="material-icons-round text-3xl">sports_tennis</span>
        </div>
        <h3 class="text-lg font-bold text-on-surface">Sin rivales registrados aún</h3>
        <p class="text-xs sm:text-sm text-on-surface-variant">
          A medida que completes partidos desde tu reloj Wear OS y asignes rivales en el dashboard, aparecerán aquí para analizar tu historial head-to-head.
        </p>
      </div>

    </main>

    <div v-else class="max-w-7xl mx-auto px-6 py-16 flex justify-center text-on-surface-variant">
      <span class="material-icons-round animate-spin text-4xl text-primary">refresh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { MatchStatsService } from '@/domains/tennis-core/match-stats/services/matchStatsService';
import type { MatchPayload } from '@/domains/tennis-core/_shared/types';
import { getActiveSessionUser, onUserSessionChanged } from '@/shared/services/firebase';

const matches = ref<MatchPayload[]>([]);
const loading = ref(true);
const selectedRivalName = ref<string>('');
let lastUid: string | null = null;

const loadMatches = async (explicitUid?: string) => {
  loading.value = true;
  try {
    const uid = explicitUid || getActiveSessionUser()?.uid || null;
    lastUid = uid;
    matches.value = await MatchStatsService.getMatches(uid || undefined);
    if (rivalsList.value.length > 0 && !selectedRivalName.value) {
      selectedRivalName.value = rivalsList.value[0]?.name || '';
    }
  } catch (err) {
    console.error('Error loading matches for scouting:', err);
  } finally {
    loading.value = false;
  }
};

let unsubSession: (() => void) | null = null;

onMounted(() => {
  loadMatches();
  unsubSession = onUserSessionChanged((user) => {
    if (user && user.uid && user.uid !== lastUid) {
      loadMatches(user.uid);
    }
  });
});

onUnmounted(() => {
  if (unsubSession) {
    unsubSession();
  }
});

interface RivalStat {
  name: string;
  total: number;
  won: number;
  lost: number;
  winRate: number;
  matches: MatchPayload[];
}

const rivalsList = computed<RivalStat[]>(() => {
  const map = new Map<string, MatchPayload[]>();
  for (const m of matches.value) {
    const rival = m.rival?.trim();
    if (!rival || rival.toLowerCase() === 'opponent') continue;
    if (!map.has(rival)) {
      map.set(rival, []);
    }
    map.get(rival)!.push(m);
  }

  const list: RivalStat[] = [];
  for (const [name, rivalMatches] of map.entries()) {
    const won = rivalMatches.filter(m => m.win).length;
    const lost = rivalMatches.length - won;
    list.push({
      name,
      total: rivalMatches.length,
      won,
      lost,
      winRate: Math.round((won / rivalMatches.length) * 100),
      matches: rivalMatches
    });
  }

  return list.sort((a, b) => b.total - a.total);
});

const selectedRival = computed(() => {
  if (!selectedRivalName.value && rivalsList.value.length > 0) {
    return rivalsList.value[0];
  }
  return rivalsList.value.find(r => r.name === selectedRivalName.value) || null;
});
</script>
