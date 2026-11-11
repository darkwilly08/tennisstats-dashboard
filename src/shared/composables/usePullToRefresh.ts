import { ref } from 'vue';

export type RefreshHandler = () => Promise<void> | void;

const activeHandler = ref<RefreshHandler | null>(null);

export function usePullToRefresh() {
  const registerRefreshHandler = (handler: RefreshHandler) => {
    activeHandler.value = handler;
  };

  const unregisterRefreshHandler = (handler?: RefreshHandler) => {
    if (!handler || activeHandler.value === handler) {
      activeHandler.value = null;
    }
  };

  return {
    registerRefreshHandler,
    unregisterRefreshHandler,
    activeHandler
  };
}
