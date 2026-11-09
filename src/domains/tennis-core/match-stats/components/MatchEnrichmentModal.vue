<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="$emit('close')" />

    <div class="relative bg-surface text-on-surface rounded-2xl shadow-2xl border border-outline w-full max-w-lg p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-outline-variant pb-3">
        <div class="flex items-center gap-2.5">
          <span class="material-icons-round text-primary text-2xl">edit_note</span>
          <div>
            <h3 class="text-lg font-bold text-on-surface">Completar Detalles del Partido</h3>
            <p class="text-xs text-on-surface-variant">Registrado desde tu reloj Wear OS</p>
          </div>
        </div>
        <button 
          @click="$emit('close')"
          aria-label="Cerrar"
          class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <span class="material-icons-round">close</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Clasificación: Torneo Oficial vs Partido Amistoso -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
            Clasificación del Partido *
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.matchType = 'friendly'"
              class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
              :class="form.matchType === 'friendly' 
                ? 'border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
            >
              <span class="material-icons-round text-base">handshake</span>
              <span>Partido Amistoso</span>
            </button>
            <button
              type="button"
              @click="form.matchType = 'tournament'"
              class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
              :class="form.matchType === 'tournament' 
                ? 'border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
            >
              <span class="material-icons-round text-base">emoji_events</span>
              <span>Torneo Oficial</span>
            </button>
          </div>
        </div>

        <!-- Torneo (Visible if Torneo Oficial is selected) -->
        <div v-if="form.matchType === 'tournament'" class="space-y-2 p-4 rounded-xl bg-surface-variant/60 border border-outline-variant">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface">
              Torneo Asociado *
            </label>
            <button 
              type="button"
              @click="showInlineCreateTournament = !showInlineCreateTournament"
              class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span class="material-icons-round text-sm" v-if="!showInlineCreateTournament">add</span>
              <span>{{ showInlineCreateTournament ? 'Volver al listado' : 'Nuevo Torneo' }}</span>
            </button>
          </div>

          <div v-if="!showInlineCreateTournament">
            <select
              v-model="form.tournamentId"
              class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Selecciona un torneo...</option>
              <option v-for="t in userTournaments" :key="t.id" :value="t.id">
                {{ t.name }} ({{ t.location }})
              </option>
            </select>
            <p v-if="userTournaments.length === 0" class="text-xs text-on-surface-variant mt-1.5">
              No tienes torneos registrados. Haz clic en "Nuevo Torneo" arriba para crear uno.
            </p>
          </div>

          <div v-else class="space-y-2 pt-1">
            <input 
              v-model="inlineTournamentName"
              type="text" 
              placeholder="Nombre del nuevo torneo..."
              class="w-full px-3 py-2 rounded-lg border border-outline bg-surface text-on-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none"
            />
            <input 
              v-model="inlineTournamentLocation"
              type="text" 
              placeholder="Club / Lugar del torneo..."
              class="w-full px-3 py-2 rounded-lg border border-outline bg-surface text-on-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none"
            />
            <button 
              type="button"
              @click="handleCreateInlineTournament"
              :disabled="!inlineTournamentName || !inlineTournamentLocation"
              class="w-full bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-4 py-2 rounded-xl shadow-sm flex items-center justify-center text-xs disabled:opacity-50 min-h-[40px]"
            >
              Guardar Torneo y Asociar
            </button>
          </div>
        </div>

        <!-- Rival Input with Autocomplete Suggestions -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
            Nombre del Rival *
          </label>
          <input 
            v-model="form.rival"
            type="text" 
            required
            placeholder="Ej: Carlos Alcaraz, Marian, J. Rodriguez"
            class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
          />

          <!-- Autocomplete Suggestions -->
          <div v-if="rivalSuggestions.length > 0" class="flex flex-wrap items-center gap-1.5 mt-2">
            <span class="text-[11px] text-on-surface-variant">Sugerencias:</span>
            <button
              v-for="sug in rivalSuggestions"
              :key="sug"
              type="button"
              @click="form.rival = sug"
              class="px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container hover:opacity-90 text-xs font-semibold border border-outline transition-all"
            >
              {{ sug }}
            </button>
          </div>
        </div>

        <!-- Lugar / Club with Geolocation -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Lugar / Club
            </label>
            <button 
              type="button"
              @click="requestLocation"
              :disabled="locating"
              class="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <span class="material-icons-round text-xs" :class="{ 'animate-spin': locating }">my_location</span>
              <span>📍 Usar ubicación actual</span>
            </button>
          </div>
          <input 
            v-model="form.location"
            type="text" 
            placeholder="Ej: Buenos Aires Lawn Tennis Club"
            class="w-full px-3.5 py-2.5 rounded-lg border border-outline bg-surface-variant/50 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <!-- Superficie -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
            Superficie
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
              Cemento / Rápida
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

        <!-- Submit & Cancel Buttons -->
        <div class="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
          <button 
            type="button"
            @click="$emit('close')"
            class="bg-surface border border-outline text-on-surface hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium px-5 py-2.5 rounded-xl text-sm min-h-[44px]"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="saving || !form.rival.trim()"
            class="bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-sm disabled:opacity-50 min-h-[44px]"
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
import { getActiveSessionUser } from '@/shared/services/firebase';

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
      userId: getActiveSessionUser()?.uid || 'guest_user',
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
