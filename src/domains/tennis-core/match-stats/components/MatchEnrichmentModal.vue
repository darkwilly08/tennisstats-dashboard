<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="$emit('close')" />

    <div class="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2.5">
          <span class="material-icons-round text-primary-alt text-2xl">edit_note</span>
          <div>
            <h3 class="text-lg font-bold">Completar Detalles del Partido</h3>
            <p class="text-xs text-slate-500">Registrado desde tu reloj Wear OS</p>
          </div>
        </div>
        <button 
          @click="$emit('close')"
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <span class="material-icons-round">close</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Clasificación: Torneo Oficial vs Partido Amistoso -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
            Clasificación del Partido *
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.matchType = 'friendly'"
              class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
              :class="form.matchType === 'friendly' 
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
            >
              <span class="material-icons-round text-base">handshake</span>
              <span>Partido Amistoso</span>
            </button>
            <button
              type="button"
              @click="form.matchType = 'tournament'"
              class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
              :class="form.matchType === 'tournament' 
                ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold' 
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
            >
              <span class="material-icons-round text-base">emoji_events</span>
              <span>Torneo Oficial</span>
            </button>
          </div>
        </div>

        <!-- Torneo (Visible if Torneo Oficial is selected) -->
        <div v-if="form.matchType === 'tournament'" class="space-y-2 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Torneo Asociado *
            </label>
            <button 
              type="button"
              @click="showInlineCreateTournament = !showInlineCreateTournament"
              class="text-xs text-primary-alt hover:underline font-medium"
            >
              {{ showInlineCreateTournament ? 'Volver al listado' : '+ Nuevo Torneo' }}
            </button>
          </div>

          <div v-if="!showInlineCreateTournament">
            <select
              v-model="form.tournamentId"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">Selecciona un torneo...</option>
              <option v-for="t in userTournaments" :key="t.id" :value="t.id">
                {{ t.name }} ({{ t.location }})
              </option>
            </select>
            <p v-if="userTournaments.length === 0" class="text-xs text-amber-600 dark:text-amber-400 mt-1">
              No tienes torneos registrados. Haz clic en "+ Nuevo Torneo" arriba para crear uno.
            </p>
          </div>

          <div v-else class="space-y-2 pt-1">
            <input 
              v-model="inlineTournamentName"
              type="text" 
              placeholder="Nombre del nuevo torneo..."
              class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-1 focus:ring-amber-500"
            />
            <input 
              v-model="inlineTournamentLocation"
              type="text" 
              placeholder="Club / Lugar del torneo..."
              class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-1 focus:ring-amber-500"
            />
            <button 
              type="button"
              @click="handleCreateInlineTournament"
              :disabled="!inlineTournamentName || !inlineTournamentLocation"
              class="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold disabled:opacity-50 transition-colors"
            >
              Guardar Torneo y Asociar
            </button>
          </div>
        </div>

        <!-- Rival Input with Autocomplete Suggestions -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Nombre del Rival *
          </label>
          <input 
            v-model="form.rival"
            type="text" 
            required
            placeholder="Ej: Carlos Alcaraz, Marian, J. Rodriguez"
            class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
          />

          <!-- Autocomplete Suggestions -->
          <div v-if="rivalSuggestions.length > 0" class="flex flex-wrap items-center gap-1.5 mt-2">
            <span class="text-[11px] text-slate-400">Sugerencias:</span>
            <button
              v-for="sug in rivalSuggestions"
              :key="sug"
              type="button"
              @click="form.rival = sug"
              class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-primary-alt/20 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {{ sug }}
            </button>
          </div>
        </div>

        <!-- Lugar / Club with Geolocation -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Lugar / Club
            </label>
            <button 
              type="button"
              @click="requestLocation"
              :disabled="locating"
              class="text-xs text-primary-alt hover:underline flex items-center gap-1 font-medium"
            >
              <span class="material-icons-round text-xs" :class="{ 'animate-spin': locating }">my_location</span>
              <span>📍 Usar ubicación actual</span>
            </button>
          </div>
          <input 
            v-model="form.location"
            type="text" 
            placeholder="Ej: Buenos Aires Lawn Tennis Club"
            class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-alt outline-none"
          />
        </div>

        <!-- Superficie -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Superficie
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
              Cemento / Rápida
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

        <!-- Submit & Cancel Buttons -->
        <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700/60">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="saving || !form.rival.trim()"
            class="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-alt hover:bg-primary text-white shadow-md disabled:opacity-50 transition-all flex items-center gap-2 min-h-[44px]"
          >
            <span v-if="saving" class="material-icons-round animate-spin text-sm">refresh</span>
            <span>Guardar Detalles</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { MatchPayload } from '../../_shared/types';
import { MatchStatsService } from '../services/matchStatsService';
import { TournamentService, type Tournament } from '@/domains/tournaments/tournament-hub';
import { auth } from '@/shared/services/firebase';

const props = defineProps<{
  match: MatchPayload;
  previousRivals: string[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'enriched', data: Partial<MatchPayload>): void;
}>();

const saving = ref(false);
const locating = ref(false);
const userTournaments = ref<Tournament[]>([]);
const showInlineCreateTournament = ref(false);
const inlineTournamentName = ref('');
const inlineTournamentLocation = ref('');

const form = ref({
  rival: props.match.rival?.toLowerCase() === 'opponent' ? '' : (props.match.rival || ''),
  matchType: (props.match.matchType || 'friendly') as 'tournament' | 'friendly',
  tournamentId: props.match.tournamentId || '',
  location: props.match.location || '',
  surface: (props.match.surface || 'Clay') as 'Clay' | 'Hard' | 'Grass'
});

onMounted(async () => {
  try {
    userTournaments.value = await TournamentService.getTournaments();
  } catch (err) {
    console.warn('Could not load tournaments:', err);
  }
});

const rivalSuggestions = computed(() => {
  const query = form.value.rival.toLowerCase().trim();
  if (!query) return props.previousRivals.slice(0, 5);
  return props.previousRivals
    .filter(r => r.toLowerCase().includes(query) && r.toLowerCase() !== query)
    .slice(0, 5);
});

const handleCreateInlineTournament = async () => {
  if (!inlineTournamentName.value || !inlineTournamentLocation.value) return;
  try {
    const newId = await TournamentService.createTournament({
      userId: auth.currentUser?.uid || 'guest_user',
      name: inlineTournamentName.value.trim(),
      location: inlineTournamentLocation.value.trim(),
      surface: form.value.surface,
      status: 'active'
    });
    userTournaments.value = await TournamentService.getTournaments();
    form.value.tournamentId = newId;
    showInlineCreateTournament.value = false;
  } catch (e) {
    console.error('Failed to create inline tournament:', e);
  }
};

const requestLocation = async () => {
  locating.value = true;
  try {
    // 1. Try Flutter WebView native bridge
    if (window.flutter_inappwebview?.callHandler) {
      try {
        const nativeLocation = await window.flutter_inappwebview.callHandler('getNativeLocation');
        if (nativeLocation) {
          if (typeof nativeLocation === 'string') {
            form.value.location = nativeLocation;
            return;
          } else if (typeof nativeLocation === 'object' && 'name' in (nativeLocation as any)) {
            form.value.location = (nativeLocation as any).name;
            return;
          }
        }
      } catch (e) {
        console.warn('Native getNativeLocation failed, trying browser geolocation:', e);
      }
    }

    // 2. Browser Geolocation fallback
    if ('geolocation' in navigator) {
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              if (res.ok) {
                const data = await res.json();
                const place = data.address?.club || data.address?.sports_centre || data.address?.suburb || data.address?.city || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
                form.value.location = place;
                resolve();
                return;
              }
            } catch {
              // fallback to coords
            }
            form.value.location = `Club (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
            resolve();
          },
          (err) => {
            console.warn('Geolocation denied or failed:', err);
            alert('No se pudo obtener la ubicación automáticamente. Ingrésala manualmente.');
            resolve();
          },
          { timeout: 7000 }
        );
      });
    } else {
      alert('La geolocalización no está disponible en este dispositivo.');
    }
  } finally {
    locating.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.rival.trim()) return;
  saving.value = true;
  try {
    const updatedData: Partial<MatchPayload> = {
      rival: form.value.rival.trim(),
      matchType: form.value.matchType,
      tournamentId: form.value.matchType === 'tournament' ? form.value.tournamentId : undefined,
      location: form.value.location.trim() || undefined,
      surface: form.value.surface,
      enriched: true
    };

    if (props.match.id) {
      try {
        await MatchStatsService.updateMatchEnrichment(props.match.id, {
          rival: updatedData.rival!,
          location: updatedData.location,
          surface: updatedData.surface,
          matchType: updatedData.matchType!,
          tournamentId: updatedData.tournamentId
        });
      } catch (err) {
        console.warn('[MatchEnrichmentModal] Firestore update failed (offline or mock doc):', err);
      }
    }

    emit('enriched', updatedData);
    emit('close');
  } catch (e) {
    console.error('Failed to save match enrichment:', e);
    alert('Error al guardar los detalles del partido. Intenta de nuevo.');
  } finally {
    saving.value = false;
  }
};
</script>
