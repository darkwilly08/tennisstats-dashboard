import { useMatchStatsStore } from '../stores/matchStore';

export function useMatchStats() {
  const store = useMatchStatsStore();

  return {
    matches: store.matches,
    loading: store.loading,
    overview: store.overview,
    recentMatches: store.recentMatches,
    physiological: store.physiological,
    pointBreakdown: store.pointBreakdown,
    opponentChartData: store.opponentChartData,
    pendingEnrichmentMatch: store.pendingEnrichmentMatch,
    previousRivals: store.previousRivals,
    updateEnrichedMatch: store.updateEnrichedMatch,
    refresh: store.fetchMatches
  };
}
