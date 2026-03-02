import type { Racquet, Shoe, MaintenanceLogEntry } from '../../_shared/types';
import { mockRacquets, mockShoes, mockMaintenanceLogs } from '../../_shared/mock';

export class KitBagService {
    /**
     * Fetches all racquets for the current user.
     */
    static async getRacquets(): Promise<Racquet[]> {
        return Promise.resolve(mockRacquets);
    }

    /**
     * Fetches all shoes for the current user.
     */
    static async getShoes(): Promise<Shoe[]> {
        return Promise.resolve(mockShoes);
    }

    /**
     * Fetches the maintenance log history.
     */
    static async getMaintenanceLogs(): Promise<MaintenanceLogEntry[]> {
        return Promise.resolve(mockMaintenanceLogs);
    }
}
