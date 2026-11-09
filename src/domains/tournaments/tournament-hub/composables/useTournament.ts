import { ref, onMounted, onUnmounted, computed } from 'vue';
import { TournamentService } from '../services/tournamentService';
import type { Tournament, BracketMatch, TournamentPressureStats } from '../../_shared/types';
import { getActiveSessionUser, onUserSessionChanged } from '@/shared/services/firebase';

export function useTournament() {
  const tournaments = ref<Tournament[]>([]);
  const activeTournament = ref<Tournament | null>(null);
  const bracketMatches = ref<BracketMatch[]>([]);
  const pressureStats = ref<TournamentPressureStats | null>(null);
  const loading = ref(true);
  let lastFetchedUid: string | null = null;

  const fetchTournaments = async (explicitUid?: string) => {
    loading.value = true;
    try {
      const targetUid = explicitUid || getActiveSessionUser()?.uid || null;
      lastFetchedUid = targetUid;
      const list = await TournamentService.getTournaments(targetUid || undefined);
      tournaments.value = list;

      const current = list.find(t => t.status === 'active') || list.find(t => t.status === 'upcoming') || list[0] || null;
      activeTournament.value = current;

      if (current) {
        const matches = await TournamentService.getBracketMatches(current.id);
        bracketMatches.value = matches;
      } else {
        bracketMatches.value = [];
      }
    } catch (e) {
      console.error('[useTournament] Error fetching tournament data:', e);
    } finally {
      loading.value = false;
    }
  };

  const selectTournament = async (t: Tournament) => {
    activeTournament.value = t;
    try {
      bracketMatches.value = await TournamentService.getBracketMatches(t.id);
    } catch {
      bracketMatches.value = [];
    }
  };

  const createTournament = async (tournamentData: Omit<Tournament, 'id'>) => {
    const newId = await TournamentService.createTournament(tournamentData);
    await fetchTournaments();
    const created = tournaments.value.find(t => t.id === newId);
    if (created) {
      activeTournament.value = created;
    }
    return newId;
  };

  let unsubscribeSession: (() => void) | null = null;

  onMounted(() => {
    fetchTournaments();
    unsubscribeSession = onUserSessionChanged((user) => {
      if (user && user.uid && user.uid !== lastFetchedUid) {
        fetchTournaments(user.uid);
      }
    });
  });

  onUnmounted(() => {
    if (unsubscribeSession) {
      unsubscribeSession();
    }
  });

  const nextMatch = computed(() => {
    return bracketMatches.value.find(m => m.status === 'live' || m.status === 'upcoming') || null;
  });

  return {
    tournaments,
    activeTournament,
    bracketMatches,
    pressureStats,
    nextMatch,
    loading,
    selectTournament,
    createTournament,
    refresh: fetchTournaments
  };
}
