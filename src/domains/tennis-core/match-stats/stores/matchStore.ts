import { ref, computed } from 'vue';
import type { MatchPayload } from '../../_shared/types';
import { MatchStatsService } from '../services/matchStatsService';
import { getActiveSessionUser, onUserSessionChanged } from '@/shared/services/firebase';

const matches = ref<MatchPayload[]>([]);
const isLoaded = ref(false);
const loading = ref(false);
let lastFetchedUserId: string | null = null;
let sessionListenerAttached = false;

const fetchMatches = async (explicitUserId?: string, force = false) => {
  const targetUid = explicitUserId || getActiveSessionUser()?.uid || null;

  // If already loaded and not forced/user changed, do silent background revalidation
  if (isLoaded.value && !force && targetUid === lastFetchedUserId) {
    try {
      const freshMatches = await MatchStatsService.getMatches(targetUid || undefined);
      matches.value = freshMatches;
    } catch (e) {
      console.warn('[matchStore] Silent background revalidation failed:', e);
    }
    return;
  }

  // Initial loading only when we have no data in memory
  if (!isLoaded.value || targetUid !== lastFetchedUserId) {
    loading.value = true;
  }

  try {
    lastFetchedUserId = targetUid;
    const items = await MatchStatsService.getMatches(targetUid || undefined);
    matches.value = items;
    isLoaded.value = true;
  } catch (e) {
    console.error('[matchStore] Error fetching matches:', e);
  } finally {
    loading.value = false;
  }
};

const initStore = () => {
  if (!sessionListenerAttached) {
    sessionListenerAttached = true;
    onUserSessionChanged((user) => {
      if (user && user.uid && user.uid !== lastFetchedUserId) {
        fetchMatches(user.uid, true);
      }
    });
  }
  fetchMatches();
};

const updateEnrichedMatch = (matchId: string, data: Partial<MatchPayload>) => {
  const idx = matches.value.findIndex(m => m.id === matchId);
  if (idx !== -1) {
    const current = matches.value[idx];
    if (current) {
      matches.value[idx] = {
        ...current,
        ...data,
        enriched: true
      } as MatchPayload;
      matches.value = [...matches.value];
    }
  }
};

const pendingEnrichmentMatch = computed(() => {
  return matches.value.find(m => {
    if (m.enriched === true) return false;
    return m.rival?.toLowerCase() === 'opponent' || m.enriched === false;
  }) || null;
});

const previousRivals = computed(() => {
  const set = new Set<string>();
  for (const m of matches.value) {
    const r = m.rival?.trim();
    if (r && r.toLowerCase() !== 'opponent') {
      set.add(r);
    }
  }
  return Array.from(set);
});

const overview = computed(() => MatchStatsService.computeOverviewStats(matches.value));
const recentMatches = computed(() => MatchStatsService.mapToMatchRows(matches.value));
const physiological = computed(() => MatchStatsService.computePhysiologicalData(matches.value));
const pointBreakdown = computed(() => MatchStatsService.computePointBreakdown(matches.value));

const opponentChartData = computed(() => {
  const oppStats: Record<string, { won: number; lost: number }> = {};
  for (const match of matches.value) {
    const rivalName = match.rival || 'opponent';
    if (!oppStats[rivalName]) oppStats[rivalName] = { won: 0, lost: 0 };
    if (match.win) oppStats[rivalName]!.won++;
    else oppStats[rivalName]!.lost++;
  }

  const labels = Object.keys(oppStats);
  const wonData = labels.map(l => oppStats[l]!.won);
  const lostData = labels.map(l => oppStats[l]!.lost);

  return {
    labels: labels.length > 0 ? labels : ['Sin partidos'],
    datasets: [
      {
        label: 'Won',
        data: wonData.length > 0 ? wonData : [0],
        backgroundColor: '#006C4C',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Lost',
        data: lostData.length > 0 ? lostData : [0],
        backgroundColor: '#64748B',
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ]
  };
});

export function useMatchStatsStore() {
  initStore();

  return {
    matches,
    isLoaded,
    loading,
    overview,
    recentMatches,
    physiological,
    pointBreakdown,
    opponentChartData,
    pendingEnrichmentMatch,
    previousRivals,
    fetchMatches,
    updateEnrichedMatch,
  };
}
