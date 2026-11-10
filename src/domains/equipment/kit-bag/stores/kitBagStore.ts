import { ref } from 'vue';
import { KitBagService } from '../services/kitBagService';
import type { Racquet, Shoe, MaintenanceLogEntry } from '../../_shared/types';

const racquets = ref<Racquet[]>([]);
const shoes = ref<Shoe[]>([]);
const logs = ref<MaintenanceLogEntry[]>([]);
const isLoaded = ref(false);
const loading = ref(false);

const fetchData = async (force = false) => {
  if (isLoaded.value && !force) {
    // Silent background revalidation
    try {
      const [r, s, l] = await Promise.all([
        KitBagService.getRacquets(),
        KitBagService.getShoes(),
        KitBagService.getMaintenanceLogs()
      ]);
      racquets.value = r;
      shoes.value = s;
      logs.value = l;
    } catch (e) {
      console.warn('[kitBagStore] Silent background revalidation failed:', e);
    }
    return;
  }

  loading.value = true;
  try {
    const [r, s, l] = await Promise.all([
      KitBagService.getRacquets(),
      KitBagService.getShoes(),
      KitBagService.getMaintenanceLogs()
    ]);
    racquets.value = r;
    shoes.value = s;
    logs.value = l;
    isLoaded.value = true;
  } catch (e) {
    console.error('[kitBagStore] Error fetching kit bag data:', e);
  } finally {
    loading.value = false;
  }
};

export function useKitBagStore() {
  if (!isLoaded.value) {
    fetchData();
  } else {
    fetchData(); // triggers silent revalidation
  }

  return {
    racquets,
    shoes,
    logs,
    loading,
    isLoaded,
    refresh: () => fetchData(true)
  };
}
