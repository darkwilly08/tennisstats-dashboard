<template>
  <div 
    class="fixed left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-md pointer-events-none transition-all duration-300"
    style="bottom: calc(1.5rem + var(--safe-area-bottom, env(safe-area-inset-bottom, 0px)));"
  >
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-6 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-4 opacity-0 scale-95"
    >
      <div
        v-if="current"
        class="pointer-events-auto bg-surface text-on-surface border border-outline rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-3 backdrop-blur-md"
        :class="{
          'border-l-4 border-l-primary': current.type === 'success',
          'border-l-4 border-l-rose-500': current.type === 'error',
          'border-l-4 border-l-sky-500': current.type === 'info',
        }"
        role="alert"
        aria-live="assertive"
      >
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div 
            class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            :class="{
              'bg-primary-container text-on-primary-container': current.type === 'success',
              'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200': current.type === 'error',
              'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200': current.type === 'info',
            }"
          >
            <span class="material-icons-round text-xl">
              {{ current.type === 'success' ? 'check_circle' : (current.type === 'error' ? 'error' : 'info') }}
            </span>
          </div>
          <p class="text-xs sm:text-sm font-medium text-on-surface leading-snug break-words">
            {{ current.message }}
          </p>
        </div>

        <button
          type="button"
          @click="dismiss"
          aria-label="Cerrar notificación"
          class="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors shrink-0"
        >
          <span class="material-icons-round text-lg">close</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useSnackbar } from '../composables/useSnackbar';

const { current, dismiss } = useSnackbar();
</script>
