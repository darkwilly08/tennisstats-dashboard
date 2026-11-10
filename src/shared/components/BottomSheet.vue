<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
          @click="emit('close')" 
        />

        <!-- Sheet / Dialog Panel -->
        <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="translate-y-full sm:translate-y-4 sm:opacity-0 sm:scale-95"
          enter-to-class="translate-y-0 sm:opacity-100 sm:scale-100"
          leave-active-class="transition duration-200 ease-in transform"
          leave-from-class="translate-y-0 sm:opacity-100 sm:scale-100"
          leave-to-class="translate-y-full sm:translate-y-4 sm:opacity-0 sm:scale-95"
        >
          <div 
            v-if="isOpen"
            class="relative w-full bg-surface text-on-surface rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-outline p-6 space-y-5 z-10 max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
            :class="maxWidthClass || 'max-w-lg'"
            style="padding-bottom: calc(1.5rem + var(--safe-area-bottom, env(safe-area-inset-bottom, 0px)));"
          >
            <!-- Mobile Drag Handle Pill -->
            <div class="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-3 sm:hidden" />

            <!-- Optional Built-in Header -->
            <div v-if="title || $slots.header" class="flex items-center justify-between border-b border-outline-variant pb-3">
              <slot name="header">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span v-if="icon" class="material-icons-round text-primary text-2xl shrink-0">{{ icon }}</span>
                  <div class="min-w-0">
                    <h3 class="text-lg font-bold text-on-surface truncate">{{ title }}</h3>
                    <p v-if="subtitle" class="text-xs text-on-surface-variant truncate">{{ subtitle }}</p>
                  </div>
                </div>
              </slot>

              <button 
                type="button"
                @click="emit('close')"
                aria-label="Cerrar"
                class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 ml-2"
              >
                <span class="material-icons-round text-xl">close</span>
              </button>
            </div>

            <!-- Content Slot -->
            <div>
              <slot />
            </div>

            <!-- Optional Footer Slot -->
            <div v-if="$slots.footer" class="pt-3 border-t border-outline-variant">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  icon?: string;
  maxWidthClass?: string;
}>(), {
  title: '',
  subtitle: '',
  icon: '',
  maxWidthClass: 'max-w-lg',
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
