import { ref, computed } from 'vue';
import { TournamentService } from '../services/tournamentService';
import type { Tournament, BracketMatch, TournamentPressureStats } from '../../_shared/types';
import type { MatchPayload } from '@/domains/tennis-core/_shared/types';
import { getActiveSessionUser, onUserSessionChanged } from '@/shared/services/firebase';
import { useMatchStatsStore } from '@/domains/tennis-core/match-stats/stores/matchStore';

const tournaments = ref<Tournament[]>([]);
const activeTournament = ref<Tournament | null>(null);
const bracketMatches = ref<BracketMatch[]>([]);
const tournamentMatches = ref<MatchPayload[]>([]);
const pressureStats = ref<TournamentPressureStats | null>(null);
const isLoaded = ref(false);
const loading = ref(false);
let lastFetchedUid: string | null = null;
let sessionListenerAttached = false;

const loadTournamentMatches = async (tournamentId: string) => {
  // First check in-memory matchStore for instant rendering
  const matchStore = useMatchStatsStore();
  const localMatches = matchStore.matches.value.filter(m => m.tournamentId === tournamentId);
  tournamentMatches.value = localMatches;

  // Then fetch from Firestore to ensure sync
  try {
    const remoteMatches = await TournamentService.getMatchesForTournament(tournamentId);
    if (remoteMatches.length > 0 || localMatches.length === 0) {
      tournamentMatches.value = remoteMatches;
    }
  } catch (e) {
    console.warn('[tournamentStore] Could not load matches for tournament:', e);
  }
};

const fetchTournaments = async (explicitUid?: string, force = false) => {
  const targetUid = explicitUid || getActiveSessionUser()?.uid || null;

  // Silent revalidation if already loaded and user hasn't changed
  if (isLoaded.value && !force && targetUid === lastFetchedUid) {
    try {
      const list = await TournamentService.getTournaments(targetUid || undefined);
      tournaments.value = list;
      if (activeTournament.value) {
        const stillExists = list.find(t => t.id === activeTournament.value?.id);
        activeTournament.value = stillExists || list[0] || null;
      } else {
        activeTournament.value = list.find(t => t.status === 'active') || list[0] || null;
      }
      if (activeTournament.value) {
        bracketMatches.value = await TournamentService.getBracketMatches(activeTournament.value.id);
        await loadTournamentMatches(activeTournament.value.id);
      }
    } catch (e) {
      console.warn('[tournamentStore] Silent revalidation failed:', e);
    }
    return;
  }

  if (!isLoaded.value || targetUid !== lastFetchedUid) {
    loading.value = true;
  }

  try {
    lastFetchedUid = targetUid;
    const list = await TournamentService.getTournaments(targetUid || undefined);
    tournaments.value = list;

    const current = list.find(t => t.status === 'active') || list.find(t => t.status === 'upcoming') || list[0] || null;
    activeTournament.value = current;

    if (current) {
      bracketMatches.value = await TournamentService.getBracketMatches(current.id);
      await loadTournamentMatches(current.id);
    } else {
      bracketMatches.value = [];
      tournamentMatches.value = [];
    }
    isLoaded.value = true;
  } catch (e) {
    console.error('[tournamentStore] Error fetching tournament data:', e);
  } finally {
    loading.value = false;
  }
};

const initStore = () => {
  if (!sessionListenerAttached) {
    sessionListenerAttached = true;
    onUserSessionChanged((user) => {
      if (user && user.uid && user.uid !== lastFetchedUid) {
        fetchTournaments(user.uid, true);
      }
    });
  }
  fetchTournaments();
};

const selectTournament = async (t: Tournament) => {
  activeTournament.value = t;
  try {
    bracketMatches.value = await TournamentService.getBracketMatches(t.id);
    await loadTournamentMatches(t.id);
  } catch {
    bracketMatches.value = [];
  }
};

const createTournament = async (tournamentData: Omit<Tournament, 'id'>) => {
  const newId = await TournamentService.createTournament(tournamentData);
  await fetchTournaments(undefined, true);
  const created = tournaments.value.find(t => t.id === newId);
  if (created) {
    activeTournament.value = created;
    await selectTournament(created);
  }
  return newId;
};

const deleteTournament = async (id: string) => {
  await TournamentService.deleteTournament(id);
  tournaments.value = tournaments.value.filter(t => t.id !== id);
  if (activeTournament.value?.id === id) {
    activeTournament.value = tournaments.value[0] || null;
    if (activeTournament.value) {
      await selectTournament(activeTournament.value);
    } else {
      bracketMatches.value = [];
      tournamentMatches.value = [];
    }
  }
};

export function useTournamentStore() {
  initStore();

  const nextMatch = computed(() => {
    return bracketMatches.value.find(m => m.status === 'live' || m.status === 'upcoming') || null;
  });

  return {
    tournaments,
    activeTournament,
    bracketMatches,
    tournamentMatches,
    pressureStats,
    nextMatch,
    loading,
    isLoaded,
    selectTournament,
    createTournament,
    deleteTournament,
    refresh: fetchTournaments
  };
}
