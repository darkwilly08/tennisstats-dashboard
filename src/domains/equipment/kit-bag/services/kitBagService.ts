import type { Racquet, Shoe, MaintenanceLogEntry } from '../../_shared/types';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth, getCurrentUser } from '@/shared/services/firebase';

export class KitBagService {
    /**
     * Fetches all racquets for the current user from Firestore.
     */
    static async getRacquets(): Promise<Racquet[]> {
        const targetUserId = auth.currentUser?.uid || (await getCurrentUser())?.uid;
        if (!targetUserId) return [];
        try {
            const ref = collection(db, `equipment/${targetUserId}/racquets`);
            const snap = await getDocs(ref);
            return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        } catch {
            return [];
        }
    }

    /**
     * Fetches all shoes for the current user from Firestore.
     */
    static async getShoes(): Promise<Shoe[]> {
        const targetUserId = auth.currentUser?.uid || (await getCurrentUser())?.uid;
        if (!targetUserId) return [];
        try {
            const ref = collection(db, `equipment/${targetUserId}/shoes`);
            const snap = await getDocs(ref);
            return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        } catch {
            return [];
        }
    }

    /**
     * Fetches the maintenance log history from Firestore.
     */
    static async getMaintenanceLogs(): Promise<MaintenanceLogEntry[]> {
        const targetUserId = auth.currentUser?.uid || (await getCurrentUser())?.uid;
        if (!targetUserId) return [];
        try {
            const ref = collection(db, `equipment/${targetUserId}/maintenance_logs`);
            const snap = await getDocs(ref);
            return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        } catch {
            return [];
        }
    }
}
