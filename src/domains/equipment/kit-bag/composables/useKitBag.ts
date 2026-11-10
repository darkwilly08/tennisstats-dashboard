import { useKitBagStore } from '../stores/kitBagStore';

export function useKitBag() {
  const store = useKitBagStore();

  return {
    racquets: store.racquets,
    shoes: store.shoes,
    logs: store.logs,
    loading: store.loading,
    refresh: store.refresh
  };
}
