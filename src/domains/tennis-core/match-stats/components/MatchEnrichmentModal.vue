<template>
  <BottomSheet
    :isOpen="isOpen"
    :title="t('matchDetail.enrichTitle', 'Completar Detalles del Partido')"
    :subtitle="t('matchDetail.enrichSubtitle', 'Registrado desde tu reloj Wear OS')"
    icon="edit_note"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      
      <!-- Clasificación: Torneo Oficial vs Partido Amistoso -->
      <div>
        <label class="m3-label">
          {{ t('matchDetail.classification', 'Clasificación del Partido') }} *
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="form.matchType = 'friendly'"
            class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
            :class="form.matchType === 'friendly' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            <span class="material-icons-round text-base">handshake</span>
            <span>{{ t('matchDetail.friendly', 'Partido Amistoso') }}</span>
          </button>
          <button
            type="button"
            @click="form.matchType = 'tournament'"
            class="flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
            :class="form.matchType === 'tournament' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            <span class="material-icons-round text-base">emoji_events</span>
            <span>{{ t('matchDetail.official', 'Torneo Oficial') }}</span>
          </button>
        </div>
      </div>

      <!-- Torneo (Visible if Torneo Oficial is selected) -->
      <div v-if="form.matchType === 'tournament'" class="space-y-2 p-4 rounded-xl bg-surface-variant border border-outline-variant">
        <div class="flex items-center justify-between">
          <label class="m3-label mb-0">
            {{ t('matchDetail.tournament', 'Torneo Asociado') }} *
          </label>
          <button 
            type="button"
            @click="showInlineCreateTournament = !showInlineCreateTournament"
            class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span class="material-icons-round text-sm" v-if="!showInlineCreateTournament">add</span>
            <span>{{ showInlineCreateTournament ? t('matchDetail.backToList', 'Volver al listado') : t('matchDetail.newTournament', 'Nuevo Torneo') }}</span>
          </button>
        </div>

        <div v-if="!showInlineCreateTournament">
          <select
            v-model="form.tournamentId"
            @change="handleTournamentSelected"
            class="m3-input"
          >
            <option value="">{{ t('matchDetail.selectTournament', 'Selecciona un torneo...') }}</option>
            <option v-for="tItem in userTournaments" :key="tItem.id" :value="tItem.id">
              {{ tItem.name }} ({{ tItem.location }})
            </option>
          </select>
          <p v-if="userTournaments.length === 0" class="text-xs text-on-surface-variant mt-1.5">
            {{ t('matchDetail.noTournamentsPrompt', 'No tienes torneos registrados. Haz clic en "Nuevo Torneo" arriba para crear uno.') }}
          </p>
        </div>

        <div v-else class="space-y-2 pt-1">
          <input 
            v-model="inlineTournamentName"
            type="text" 
            :placeholder="t('matchDetail.newTournamentNamePlaceholder', 'Nombre del nuevo torneo...')"
            class="m3-input"
          />
          <input 
            v-model="inlineTournamentLocation"
            type="text" 
            :placeholder="t('matchDetail.newTournamentLocationPlaceholder', 'Club / Lugar del torneo...')"
            class="m3-input"
          />
          <button 
            type="button"
            @click="handleCreateInlineTournament"
            :disabled="!inlineTournamentName || !inlineTournamentLocation"
            class="btn-primary w-full text-xs disabled:opacity-50 min-h-[40px]"
          >
            {{ t('matchDetail.saveAndAssociate', 'Guardar Torneo y Asociar') }}
          </button>
        </div>
      </div>

      <!-- Rival Input with Autocomplete Suggestions -->
      <div>
        <label class="m3-label">
          {{ t('matchDetail.rival', 'Nombre del Rival') }} *
        </label>
        <input 
          v-model="form.rival"
          type="text" 
          required
          :placeholder="t('matchDetail.rivalPlaceholder', 'Ej: Carlos Alcaraz, Marian, J. Rodriguez')"
          class="m3-input"
        />

        <!-- Autocomplete Suggestions -->
        <div v-if="rivalSuggestions.length > 0" class="flex flex-wrap items-center gap-1.5 mt-2">
          <span class="text-[11px] text-on-surface-variant">{{ t('matchDetail.suggestions', 'Sugerencias:') }}</span>
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

      <!-- Lugar / Club with Geolocation (Hidden when Official Tournament is selected and tournament has location) -->
      <div v-if="form.matchType !== 'tournament' || !selectedTournamentLocation">
        <div class="flex items-center justify-between mb-1.5">
          <label class="m3-label mb-0">
            {{ t('matchDetail.location', 'Lugar / Club') }}
          </label>
          <button 
            type="button"
            @click="requestLocation"
            :disabled="locating"
            class="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span class="material-icons-round text-xs" :class="{ 'animate-spin': locating }">my_location</span>
            <span>{{ t('matchDetail.useLocation', '📍 Usar ubicación actual') }}</span>
          </button>
        </div>
        <input 
          v-model="form.location"
          type="text" 
          :placeholder="t('matchDetail.locationPlaceholder', 'Ej: Buenos Aires Lawn Tennis Club')"
          class="m3-input"
        />
      </div>

      <!-- Superficie -->
      <div>
        <label class="m3-label">
          {{ t('matchDetail.surface', 'Superficie') }}
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="form.surface = 'Clay'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
            :class="form.surface === 'Clay' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('matchDetail.clay', 'Polvo de ladrillo') }}
          </button>
          <button
            type="button"
            @click="form.surface = 'Hard'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
            :class="form.surface === 'Hard' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('matchDetail.hard', 'Cemento / Rápida') }}
          </button>
          <button
            type="button"
            @click="form.surface = 'Grass'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
            :class="form.surface === 'Grass' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            {{ t('matchDetail.grass', 'Césped') }}
          </button>
        </div>
      </div>

      <!-- Submit & Cancel Buttons (Full width stacked on mobile) -->
      <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-outline-variant w-full">
        <button 
          type="button"
          @click="$emit('close')"
          class="btn-secondary text-sm w-full sm:w-auto"
        >
          {{ t('matchDetail.cancel', 'Cancelar') }}
        </button>
        <button 
          type="submit"
          :disabled="saving || !form.rival.trim()"
          class="btn-primary text-sm disabled:opacity-50 w-full sm:w-auto"
        >
          <span v-if="saving" class="material-icons-round animate-spin text-sm mr-1">refresh</span>
          <span>{{ t('matchDetail.saveDetails', 'Guardar Detalles') }}</span>
        </button>
      </div>

    </form>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { MatchPayload } from '../../_shared/types';
import { MatchStatsService } from '../services/matchStatsService';
import { TournamentService, type Tournament } from '@/domains/tournaments/tournament-hub';
import { getActiveSessionUser } from '@/shared/services/firebase';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useSnackbar } from '@/shared/composables/useSnackbar';
import { useI18n } from '@/shared/i18n';

const props = withDefaults(defineProps<{
  match: MatchPayload;
  previousRivals: string[];
  isOpen?: boolean;
}>(), {
  isOpen: true
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'enriched', data: Partial<MatchPayload>): void;
}>();

const { t } = useI18n();
const snackbar = useSnackbar();
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

const selectedTournamentLocation = computed(() => {
  if (form.value.matchType !== 'tournament' || !form.value.tournamentId) return '';
  const tItem = userTournaments.value.find(item => item.id === form.value.tournamentId);
  return typeof tItem?.location === 'string' ? tItem.location : '';
});

const handleTournamentSelected = () => {
  if (selectedTournamentLocation.value) {
    form.value.location = selectedTournamentLocation.value;
  }
};

onMounted(async () => {
  try {
    userTournaments.value = await TournamentService.getTournaments();
    if (form.value.tournamentId && selectedTournamentLocation.value) {
      form.value.location = selectedTournamentLocation.value;
    }
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
    form.value.location = inlineTournamentLocation.value.trim();
    showInlineCreateTournament.value = false;
    snackbar.success('Torneo creado y asociado');
  } catch (e) {
    console.error('Failed to create inline tournament:', e);
    snackbar.error('Error al crear torneo');
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
            snackbar.info('No se pudo obtener la ubicación automáticamente. Ingrésala manualmente.');
            resolve();
          },
          { timeout: 7000 }
        );
      });
    } else {
      snackbar.info('La geolocalización no está disponible en este dispositivo.');
    }
  } finally {
    locating.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.rival.trim()) return;
  saving.value = true;
  try {
    const finalLocation = form.value.matchType === 'tournament' && selectedTournamentLocation.value
      ? selectedTournamentLocation.value
      : form.value.location.trim();

    const updatedData: Partial<MatchPayload> = {
      rival: form.value.rival.trim(),
      matchType: form.value.matchType,
      surface: form.value.surface,
      enriched: true
    };
    if (finalLocation) {
      updatedData.location = finalLocation;
    }
    if (form.value.matchType === 'tournament' && form.value.tournamentId) {
      updatedData.tournamentId = form.value.tournamentId;
    }

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
    snackbar.success(t('matchDetail.enrichSuccess', 'Detalles del partido guardados con éxito'));
    emit('close');
  } catch (e) {
    console.error('Failed to save match enrichment:', e);
    snackbar.error('Error al guardar los detalles del partido. Intenta de nuevo.');
  } finally {
    saving.value = false;
  }
};
</script>
