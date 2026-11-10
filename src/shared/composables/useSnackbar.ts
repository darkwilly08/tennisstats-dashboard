import { ref, computed } from 'vue';

export type SnackbarType = 'success' | 'error' | 'info';

export interface SnackbarMessage {
  id: number;
  message: string;
  type: SnackbarType;
  duration: number;
}

const currentSnackbar = ref<SnackbarMessage | null>(null);
let dismissTimer: ReturnType<typeof setTimeout> | null = null;
let nextId = 1;

export function useSnackbar() {
  const show = (message: string, type: SnackbarType = 'info', duration = 4000) => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }

    const item: SnackbarMessage = {
      id: nextId++,
      message,
      type,
      duration,
    };

    currentSnackbar.value = item;

    if (duration > 0) {
      dismissTimer = setTimeout(() => {
        if (currentSnackbar.value?.id === item.id) {
          currentSnackbar.value = null;
        }
      }, duration);
    }
  };

  const success = (message: string, duration = 4000) => {
    show(message, 'success', duration);
  };

  const error = (message: string, duration = 5000) => {
    show(message, 'error', duration);
  };

  const info = (message: string, duration = 4000) => {
    show(message, 'info', duration);
  };

  const dismiss = () => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }
    currentSnackbar.value = null;
  };

  return {
    current: computed(() => currentSnackbar.value),
    show,
    success,
    error,
    info,
    dismiss,
  };
}
