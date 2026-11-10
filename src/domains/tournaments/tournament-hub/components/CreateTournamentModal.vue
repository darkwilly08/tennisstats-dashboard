<template>
  <BottomSheet
    :isOpen="isOpen"
    title="Crear Nuevo Torneo"
    subtitle="Registra el cuadro y la superficie de tu competición"
    icon="emoji_events"
    @close="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="m3-label">
          Nombre del Torneo *
        </label>
        <input 
          v-model="form.name"
          type="text" 
          required
          placeholder="Ej: Abierto Primavera 2026"
          class="m3-input"
        />
      </div>

      <!-- Lugar / Club -->
      <div>
        <label class="m3-label">
          Club / Lugar *
        </label>
        <input 
          v-model="form.location"
          type="text" 
          required
          placeholder="Ej: Tenis Club Buenos Aires"
          class="m3-input"
        />
      </div>

      <!-- Superficie -->
      <div>
        <label class="m3-label">
          Superficie *
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
            Polvo de ladrillo
          </button>
          <button
            type="button"
            @click="form.surface = 'Hard'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
            :class="form.surface === 'Hard' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            Rápida (Cemento)
          </button>
          <button
            type="button"
            @click="form.surface = 'Grass'"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]"
            :class="form.surface === 'Grass' 
              ? 'border-primary bg-primary text-on-primary font-bold shadow-sm' 
              : 'border-outline bg-surface text-on-surface hover:bg-surface-variant'"
          >
            Césped
          </button>
        </div>
      </div>

      <!-- Categoría -->
      <div>
        <label class="m3-label">
          Categoría (Opcional)
        </label>
        <input 
          v-model="form.category"
          type="text" 
          placeholder="Ej: Cuarta, Libre, Senior +35"
          class="m3-input"
        />
      </div>

      <!-- Estado -->
      <div>
        <label class="m3-label">
          Estado inicial
        </label>
        <select
          v-model="form.status"
          class="m3-input"
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
          @click="emit('close')"
          class="btn-secondary text-sm"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          :disabled="saving"
          class="btn-primary text-sm disabled:opacity-50"
        >
          <span v-if="saving" class="material-icons-round animate-spin text-sm mr-1">refresh</span>
          <span>Guardar Torneo</span>
        </button>
      </div>
    </form>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useTournamentStore } from '../stores/tournamentStore';
import { getActiveSessionUser } from '@/shared/services/firebase';
import { useSnackbar } from '@/shared/composables/useSnackbar';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { createTournament } = useTournamentStore();
const snackbar = useSnackbar();

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

    snackbar.success('Torneo creado con éxito');

    form.value = {
      name: '',
      location: '',
      surface: 'Clay',
      category: '',
      status: 'active'
    };
    emit('close');
  } catch (err) {
    console.error('Error creating tournament:', err);
    snackbar.error('Error al crear el torneo. Por favor, intenta de nuevo.');
  } finally {
    saving.value = false;
  }
};
</script>
