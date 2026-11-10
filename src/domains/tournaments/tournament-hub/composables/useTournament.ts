import { useTournamentStore } from '../stores/tournamentStore';

export function useTournament() {
  const store = useTournamentStore();

  return {
    tournaments: store.tournaments,
    activeTournament: store.activeTournament,
    bracketMatches: store.bracketMatches,
    tournamentMatches: store.tournamentMatches,
    pressureStats: store.pressureStats,
    nextMatch: store.nextMatch,
    loading: store.loading,
    selectTournament: store.selectTournament,
    createTournament: store.createTournament,
    deleteTournament: store.deleteTournament,
    refresh: store.refresh
  };
}
