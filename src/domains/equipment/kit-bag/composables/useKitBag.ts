import { ref, onMounted } from 'vue';
import { KitBagService } from '../services/kitBagService';
import type { Racquet, Shoe, MaintenanceLogEntry } from '../../_shared/types';

export function useKitBag() {
    const racquets = ref<Racquet[]>([]);
    const shoes = ref<Shoe[]>([]);
    const logs = ref<MaintenanceLogEntry[]>([]);
    const loading = ref(true);

    const fetchData = async () => {
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
        } catch (e) {
            console.error('Error fetching kit bag data:', e);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    return {
        racquets,
        shoes,
        logs,
        loading,
        refresh: fetchData
    };
}
