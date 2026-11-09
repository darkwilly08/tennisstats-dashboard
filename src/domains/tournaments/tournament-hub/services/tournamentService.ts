import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth, getCurrentUser } from '@/shared/services/firebase';
import type { Tournament, BracketMatch, TournamentPressureStats } from '../../_shared/types';

export class TournamentService {
  /**
   * Fetches all tournaments for a given user from Firestore.
   */
  static async getTournaments(userId?: string): Promise<Tournament[]> {
    const targetUserId = userId || auth.currentUser?.uid || (await getCurrentUser())?.uid;
    if (!targetUserId) {
      console.warn('[TournamentService] No authenticated user found to fetch tournaments.');
      return [];
    }

    const tournamentsRef = collection(db, 'tournaments');
    try {
      const q = query(tournamentsRef, where('userId', '==', targetUserId));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId || targetUserId,
          name: data.name || '',
          location: typeof data.location === 'string' ? data.location : (data.location?.venue || data.location?.city || 'Club'),
          surface: (data.surface || 'Clay') as 'Clay' | 'Hard' | 'Grass',
          category: data.category,
          startDate: data.startDate || (data.dateRange?.start),
          endDate: data.endDate || (data.dateRange?.end),
          status: (data.status || 'active') as 'active' | 'completed' | 'upcoming',
          imageUrl: data.imageUrl
        } as Tournament;
      });
      return items;
    } catch (e) {
      console.error('[TournamentService] Error fetching tournaments:', e);
      return [];
    }
  }

  /**
   * Creates a new tournament document in Firestore.
   */
  static async createTournament(tournament: Omit<Tournament, 'id'>): Promise<string> {
    const targetUserId = tournament.userId || auth.currentUser?.uid || (await getCurrentUser())?.uid;
    if (!targetUserId) {
      throw new Error('User must be authenticated to create a tournament');
    }

    const tournamentsRef = collection(db, 'tournaments');
    const docData = {
      ...tournament,
      userId: targetUserId,
      createdAt: Date.now()
    };
    const docRef = await addDoc(tournamentsRef, docData);
    return docRef.id;
  }

  /**
   * Returns the current active tournament for the user, or the nearest upcoming, or null.
   */
  static async getActiveTournament(userId?: string): Promise<Tournament | null> {
    const tournaments = await this.getTournaments(userId);
    if (!tournaments.length) return null;
    return tournaments.find(t => t.status === 'active') || tournaments.find(t => t.status === 'upcoming') || tournaments[0] || null;
  }

  /**
   * Fetches bracket matches for a given tournament from Firestore subcollection.
   */
  static async getBracketMatches(tournamentId: string): Promise<BracketMatch[]> {
    if (!tournamentId) return [];
    try {
      const matchesRef = collection(db, `tournaments/${tournamentId}/matches`);
      const snapshot = await getDocs(matchesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<BracketMatch, 'id'>)
      }));
    } catch (e) {
      console.warn('[TournamentService] Error fetching bracket matches:', e);
      return [];
    }
  }

  /**
   * Fetches pressure statistics for tournaments.
   */
  static async getPressureStats(): Promise<TournamentPressureStats | null> {
    return null;
  }
}
