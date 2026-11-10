<template>
  <BottomSheet
    :isOpen="isOpen"
    :title="t('matchDetail.title', 'Detalles del Partido')"
    :subtitle="t('matchDetail.subtitle', 'Métricas físicas y edición de datos')"
    icon="sports_tennis"
    @close="emit('close')"
  >
    <div v-if="match" class="space-y-5">
      <!-- Result and Date Banner -->
      <div 
        class="p-4 rounded-2xl flex items-center justify-between gap-3 border shadow-sm"
        :class="match.win 
          ? 'bg-primary-container text-on-primary-container border-primary/20' 
          : 'bg-secondary-container text-on-secondary-container border-secondary/20'"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-surface/30 flex items-center justify-center font-bold text-lg">
            {{ match.win ? '🏆' : '🎾' }}
          </div>
          <div>
            <div class="font-bold text-sm sm:text-base">
              {{ match.win ? t('matchDetail.win', 'Victoria') : t('matchDetail.loss', 'Derrota') }} vs {{ form.rival || 'Rival' }}
            </div>
            <div class="text-xs opacity-80">
              {{ formattedDate }} • {{ formattedDuration }}
            </div>
          </div>
        </div>

        <div class="font-display font-bold text-base sm:text-lg">
          {{ formattedScore }}
        </div>
      </div>

      <!-- Set-by-Set Breakdown Badges -->
      <div v-if="match.sets && match.sets.length > 0" class="space-y-2">
        <label class="m3-label">{{ t('matchDetail.setsBreakdown', 'Desglose por Set') }}</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div 
            v-for="s in match.sets" 
            :key="s.id"
            class="p-2.5 rounded-xl bg-surface-variant border border-outline flex items-center justify-between text-xs"
          >
            <span class="text-on-surface-variant font-semibold">Set {{ s.id }}:</span>
            <span class="font-bold font-display text-on-surface">
              {{ s.me }}-{{ s.rival }}
              <span v-if="s.tiebreak" class="text-[10px] text-primary">({{ s.tiebreak.him }})</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Physiological & Physical Metrics Grid -->
      <div class="space-y-2">
        <label class="m3-label">{{ t('matchDetail.physicalMetrics', 'Métricas Físicas (Wear OS)') }}</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="p-3 rounded-xl bg-surface-variant border border-outline text-center">
            <span class="material-icons-round text-amber-500 text-lg">local_fire_department</span>
            <div class="font-display font-bold text-base text-on-surface">
              {{ match.health_metrics?.active_calories || 0 }}
            </div>
            <div class="text-[10px] text-on-surface-variant font-medium uppercase">{{ t('matchDetail.calories', 'Calorías') }}</div>
          </div>

          <div class="p-3 rounded-xl bg-surface-variant border border-outline text-center">
            <span class="material-icons-round text-rose-500 text-lg">favorite</span>
            <div class="font-display font-bold text-base text-on-surface">
              {{ match.health_metrics?.heart_rate?.avg || 0 }} <span class="text-xs font-normal">bpm</span>
            </div>
            <div class="text-[10px] text-on-surface-variant font-medium uppercase">{{ t('matchDetail.avgHr', 'FC Prom') }} ({{ t('matchDetail.maxHr', 'Max') }} {{ match.health_metrics?.heart_rate?.max || 0 }})</div>
          </div>

          <div class="p-3 rounded-xl bg-surface-variant border border-outline text-center">
            <span class="material-icons-round text-primary text-lg">directions_walk</span>
            <div class="font-display font-bold text-base text-on-surface">
              {{ ((match.health_metrics?.total_steps || 0) * 0.8 / 1000).toFixed(1) }} <span class="text-xs font-normal">km</span>
            </div>
            <div class="text-[10px] text-on-surface-variant font-medium uppercase">{{ t('matchDetail.distance', 'Distancia') }}</div>
          </div>

          <div class="p-3 rounded-xl bg-surface-variant border border-outline text-center">
            <span class="material-icons-round text-sky-500 text-lg">bolt</span>
            <div class="font-display font-bold text-base text-on-surface">
              {{ match.me_breaks || 0 }}/{{ match.me_break_points || 0 }}
            </div>
            <div class="text-[10px] text-on-surface-variant font-medium uppercase">{{ t('matchDetail.breaksWon', 'Quiebres Ganados') }}</div>
          </div>
        </div>
      </div>

      <!-- Editable Match Properties Form -->
      <form @submit.prevent="handleSave" class="space-y-4 pt-2 border-t border-outline-variant">
        <!-- Rival Name -->
        <div>
          <label class="m3-label">{{ t('matchDetail.rival', 'Nombre del Rival') }} *</label>
          <input
            v-model="form.rival"
            type="text"
            required
            :placeholder="t('matchDetail.rivalPlaceholder', 'Ej: Carlos Alcaraz, Marian')"
            class="m3-input"
          />
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

        <!-- Clasificación: Amistoso vs Torneo Oficial -->
        <div>
          <label class="m3-label">{{ t('matchDetail.classification', 'Clasificación') }}</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.matchType = 'friendly'"
              class="p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 min-h-[44px]"
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
              class="p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 min-h-[44px]"
              :class="form.matchType === 'tournament' 
                ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
                : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
            >
              <span class="material-icons-round text-base">emoji_events</span>
              <span>{{ t('matchDetail.official', 'Torneo Oficial') }}</span>
            </button>
          </div>
        </div>

        <!-- Torneo Selector (If Torneo Oficial) -->
        <div v-if="form.matchType === 'tournament'" class="space-y-2 p-3.5 rounded-xl bg-surface-variant border border-outline">
          <label class="m3-label mb-1">{{ t('matchDetail.tournament', 'Torneo Asociado') }} *</label>
          <select 
            v-model="form.tournamentId" 
            @change="handleTournamentChanged"
            class="m3-input"
          >
            <option value="">{{ t('matchDetail.selectTournament', 'Selecciona un torneo...') }}</option>
            <option v-for="tItem in userTournaments" :key="tItem.id" :value="tItem.id">
              {{ tItem.name }} ({{ tItem.location }})
            </option>
          </select>
          <p v-if="selectedTournamentLocation" class="text-xs text-primary font-medium flex items-center gap-1 pt-1">
            <span class="material-icons-round text-xs">location_on</span>
            <span>{{ t('matchDetail.inheritedLocation', 'Sede heredada:') }} {{ selectedTournamentLocation }}</span>
          </p>
        </div>

        <!-- Standalone Location Input (Hidden if Torneo Oficial and location is inherited) -->
        <div v-if="form.matchType !== 'tournament' || !selectedTournamentLocation">
          <div class="flex items-center justify-between mb-1.5">
            <label class="m3-label mb-0">{{ t('matchDetail.location', 'Lugar / Club') }}</label>
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
            :placeholder="t('matchDetail.locationPlaceholder', 'Ej: Buenos Aires Lawn Tennis')"
            class="m3-input"
          />
        </div>

        <!-- Superficie -->
        <div>
          <label class="m3-label">{{ t('matchDetail.surface', 'Superficie') }}</label>
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

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
          <button
            type="button"
            @click="emit('close')"
            class="btn-secondary text-sm"
          >
            {{ t('matchDetail.close', 'Cerrar') }}
          </button>
          <button
            type="submit"
            :disabled="saving || !form.rival.trim()"
            class="btn-primary text-sm disabled:opacity-50"
          >
            <span v-if="saving" class="material-icons-round animate-spin text-sm mr-1">refresh</span>
            <span>{{ t('matchDetail.save', 'Guardar Cambios') }}</span>
          </button>
        </div>
      </form>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { MatchPayload } from '../../_shared/types';
import { MatchStatsService } from '../services/matchStatsService';
import { TournamentService, type Tournament } from '@/domains/tournaments/tournament-hub';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useSnackbar } from '@/shared/composables/useSnackbar';
import { useMatchStatsStore } from '../stores/matchStore';
import { useI18n } from '@/shared/i18n';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  match: MatchPayload | null;
  previousRivals?: string[];
}>(), {
  previousRivals: () => [],
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated', data: Partial<MatchPayload>): void;
}>();

const { t } = useI18n();
const snackbar = useSnackbar();
const { updateEnrichedMatch } = useMatchStatsStore();

const saving = ref(false);
const locating = ref(false);
const userTournaments = ref<Tournament[]>([]);

const form = ref({
  rival: '',
  matchType: 'friendly' as 'tournament' | 'friendly',
  tournamentId: '',
  location: '',
  surface: 'Clay' as 'Clay' | 'Hard' | 'Grass',
});

const syncFormData = () => {
  if (props.match) {
    form.value = {
      rival: props.match.rival?.toLowerCase() === 'opponent' ? '' : (props.match.rival || ''),
      matchType: (props.match.matchType || 'friendly') as 'tournament' | 'friendly',
      tournamentId: props.match.tournamentId || '',
      location: props.match.location || '',
      surface: (props.match.surface || 'Clay') as 'Clay' | 'Hard' | 'Grass',
    };
  }
};

watch(() => props.match, syncFormData, { immediate: true });

onMounted(async () => {
  try {
    userTournaments.value = await TournamentService.getTournaments();
  } catch (err) {
    console.warn('Could not load tournaments in MatchDetailSheet:', err);
  }
});

const selectedTournamentLocation = computed(() => {
  if (form.value.matchType !== 'tournament' || !form.value.tournamentId) return '';
  const tItem = userTournaments.value.find(item => item.id === form.value.tournamentId);
  return typeof tItem?.location === 'string' ? tItem.location : '';
});

const handleTournamentChanged = () => {
  if (selectedTournamentLocation.value) {
    form.value.location = selectedTournamentLocation.value;
  }
};

const rivalSuggestions = computed(() => {
  const query = form.value.rival.toLowerCase().trim();
  if (!query) return props.previousRivals.slice(0, 5);
  return props.previousRivals
    .filter(r => r.toLowerCase().includes(query) && r.toLowerCase() !== query)
    .slice(0, 5);
});

const formattedDate = computed(() => {
  if (!props.match?.idt) return '';
  return new Date(props.match.idt).toLocaleDateString();
});

const formattedDuration = computed(() => {
  if (!props.match?.idt || !props.match?.fdt) return '';
  const durationMs = props.match.fdt - props.match.idt;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
});

const formattedScore = computed(() => {
  if (props.match?.sets && props.match.sets.length > 0) {
    return props.match.sets
      .map(s => {
        let str = `${s.me}-${s.rival}`;
        if (s.tiebreak) str += `(${s.tiebreak.him})`;
        return str;
      })
      .join(' ');
  }
  return props.match?.win ? '6-4 6-3' : '4-6 3-6';
});

const requestLocation = async () => {
  locating.value = true;
  try {
    if (window.flutter_inappwebview?.callHandler) {
      try {
        const nativeLocation = await window.flutter_inappwebview.callHandler('getNativeLocation');
        if (nativeLocation) {
          form.value.location = typeof nativeLocation === 'string' ? nativeLocation : (nativeLocation as any).name || '';
          return;
        }
      } catch (e) {
        console.warn('Native getNativeLocation failed:', e);
      }
    }

    if ('geolocation' in navigator) {
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            form.value.location = `Club (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
            resolve();
          },
          (err) => {
            console.warn('Geolocation failed:', err);
            snackbar.info('No se pudo obtener la ubicación automáticamente.');
            resolve();
          },
          { timeout: 6000 }
        );
      });
    }
  } finally {
    locating.value = false;
  }
};

const handleSave = async () => {
  if (!props.match?.id || !form.value.rival.trim()) return;
  saving.value = true;
  try {
    const finalLocation = form.value.matchType === 'tournament' && selectedTournamentLocation.value
      ? selectedTournamentLocation.value
      : form.value.location.trim();

    const updatedData: Partial<MatchPayload> = {
      rival: form.value.rival.trim(),
      matchType: form.value.matchType,
      surface: form.value.surface,
      enriched: true,
    };
    if (finalLocation) {
      updatedData.location = finalLocation;
    }
    if (form.value.matchType === 'tournament' && form.value.tournamentId) {
      updatedData.tournamentId = form.value.tournamentId;
    }

    try {
      await MatchStatsService.updateMatchEnrichment(props.match.id, {
        rival: updatedData.rival!,
        location: updatedData.location,
        surface: updatedData.surface,
        matchType: updatedData.matchType!,
        tournamentId: updatedData.tournamentId,
      });
    } catch (err) {
      console.warn('Firestore update failed (offline mode):', err);
    }

    updateEnrichedMatch(props.match.id, updatedData);
    emit('updated', updatedData);
    snackbar.success(t('matchDetail.saveSuccess', 'Partido actualizado con éxito'));
    emit('close');
  } catch (e) {
    console.error('Failed to update match:', e);
    snackbar.error(t('matchDetail.error', 'Error al actualizar el partido'));
  } finally {
    saving.value = false;
  }
};
</script>
