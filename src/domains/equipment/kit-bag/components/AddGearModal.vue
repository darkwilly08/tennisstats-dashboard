<template>
  <BottomSheet
    :isOpen="isOpen"
    title="Agregar Equipamiento"
    subtitle="Registra tu raqueta o cuerda para control de desgaste"
    icon="sports_tennis"
    @close="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="m3-label">Tipo de Equipo *</label>
        <div class="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            @click="gearType = 'racquet'"
            class="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center justify-center gap-2 min-h-[44px]"
            :class="gearType === 'racquet' 
              ? 'bg-primary text-on-primary border-primary font-bold shadow-sm' 
              : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
          >
            <span class="material-icons-round text-base">sports_tennis</span>
            <span>Raqueta</span>
          </button>
          <button
            type="button"
            @click="gearType = 'shoes'"
            class="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center justify-center gap-2 min-h-[44px]"
            :class="gearType === 'shoes' 
              ? 'bg-primary text-on-primary border-primary font-bold shadow-sm' 
              : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
          >
            <span class="material-icons-round text-base">directions_run</span>
            <span>Zapatillas</span>
          </button>
        </div>
      </div>

      <div v-if="gearType === 'racquet'" class="space-y-3">
        <div>
          <label class="m3-label">Modelo de Raqueta *</label>
          <input
            v-model="racquetForm.name"
            type="text"
            required
            placeholder="Ej: Pure Aero 98, Wilson Blade"
            class="m3-input"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="m3-label">Marca *</label>
            <input
              v-model="racquetForm.brand"
              type="text"
              required
              placeholder="Ej: Babolat, Wilson"
              class="m3-input"
            />
          </div>
          <div>
            <label class="m3-label">Rol</label>
            <select v-model="racquetForm.role" class="m3-input">
              <option value="primary">Principal</option>
              <option value="backup">Suplente</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="m3-label">Cuerda</label>
            <input
              v-model="racquetForm.stringName"
              type="text"
              placeholder="Ej: RPM Blast 17g"
              class="m3-input"
            />
          </div>
          <div>
            <label class="m3-label">Tensión (lbs)</label>
            <input
              v-model="racquetForm.tension"
              type="number"
              placeholder="Ej: 52"
              class="m3-input"
            />
          </div>
        </div>
      </div>

      <div v-else class="space-y-3">
        <div>
          <label class="m3-label">Modelo de Calzado *</label>
          <input
            v-model="shoeForm.model"
            type="text"
            required
            placeholder="Ej: Court FF 3, Gel Resolution"
            class="m3-input"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="m3-label">Marca *</label>
            <input
              v-model="shoeForm.brand"
              type="text"
              required
              placeholder="Ej: Asics, Nike"
              class="m3-input"
            />
          </div>
          <div>
            <label class="m3-label">Superficie</label>
            <select v-model="shoeForm.surface" class="m3-input">
              <option value="Clay">Polvo de ladrillo</option>
              <option value="Hard Court">Cemento</option>
              <option value="All Court">Todas</option>
            </select>
          </div>
        </div>
      </div>

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
          class="btn-primary text-sm"
        >
          Guardar Equipo
        </button>
      </div>
    </form>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BottomSheet from '@/shared/components/BottomSheet.vue';
import { useSnackbar } from '@/shared/composables/useSnackbar';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const snackbar = useSnackbar();
const gearType = ref<'racquet' | 'shoes'>('racquet');

const racquetForm = ref({
  name: '',
  brand: '',
  role: 'primary',
  stringName: '',
  tension: 52,
});

const shoeForm = ref({
  model: '',
  brand: '',
  surface: 'Clay',
});

const handleSubmit = () => {
  snackbar.success('Equipo registrado correctamente');
  emit('close');
};
</script>
