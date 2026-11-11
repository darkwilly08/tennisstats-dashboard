<template>
  <teleport to="body">
    <transition name="bottom-sheet" :duration="{ enter: 280, leave: 220 }">
      <div 
        v-if="isOpen" 
        class="bottom-sheet-wrapper fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <!-- Backdrop (Clean high-performance dark overlay without heavy GPU blur) -->
        <div 
          class="bottom-sheet-backdrop fixed inset-0 bg-slate-950/60" 
          @click="emit('close')" 
        />

        <!-- Sheet / Dialog Panel -->
        <div 
          class="bottom-sheet-panel relative w-full bg-surface text-on-surface rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-outline p-6 space-y-5 z-10 max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
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
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
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

// Prevent background body scrolling when bottom sheet is active, avoiding layout shift
watch(() => props.isOpen, (open) => {
  if (typeof document !== 'undefined') {
    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
}, { immediate: true });

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
});
</script>

<style scoped>
/* Wrapper / Backdrop fade */
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}
.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}

/* Panel hardware-accelerated slide */
.bottom-sheet-panel {
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Mobile: Pure bottom slide */
.bottom-sheet-enter-active .bottom-sheet-panel {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.bottom-sheet-leave-active .bottom-sheet-panel {
  transition: transform 0.22s cubic-bezier(0.4, 0, 1, 1);
}
.bottom-sheet-enter-from .bottom-sheet-panel,
.bottom-sheet-leave-to .bottom-sheet-panel {
  transform: translate3d(0, 100%, 0);
}

/* Desktop: subtle scale + translate */
@media (min-width: 640px) {
  .bottom-sheet-enter-active .bottom-sheet-panel {
    transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.26s ease-out;
  }
  .bottom-sheet-leave-active .bottom-sheet-panel {
    transition: transform 0.2s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease-in;
  }
  .bottom-sheet-enter-from .bottom-sheet-panel,
  .bottom-sheet-leave-to .bottom-sheet-panel {
    transform: translate3d(0, 14px, 0) scale(0.97);
    opacity: 0;
  }
}
</style>
