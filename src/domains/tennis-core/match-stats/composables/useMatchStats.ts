import { ref, onMounted, onUnmounted, computed } from 'vue';
import { MatchStatsService } from '../services/matchStatsService';
import type { MatchPayload } from '../../_shared/types';
import { auth } from '@/shared/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function useMatchStats() {
    const matches = ref<MatchPayload[]>([]);
    const loading = ref(true);
    let lastFetchedUserId: string | null = null;

    const fetchMatches = async () => {
        loading.value = true;
        try {
            lastFetchedUserId = auth.currentUser?.uid ?? null;
            matches.value = await MatchStatsService.getMatches();
        } catch (e) {
            console.error('Error fetching matches:', e);
        } finally {
            loading.value = false;
        }
    };

    let unsubscribeAuth: (() => void) | null = null;

    onMounted(() => {
        fetchMatches();
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user && user.uid !== lastFetchedUserId) {
                fetchMatches();
            }
        });
    });

    onUnmounted(() => {
        if (unsubscribeAuth) {
            unsubscribeAuth();
        }
    });

    // Detect matches needing post-match enrichment
    const pendingEnrichmentMatch = computed(() => {
        return matches.value.find(m => {
            if (m.enriched === true) return false;
            return m.rival?.toLowerCase() === 'opponent' || m.enriched === false;
        }) || null;
    });

    // Extract list of previous rivals for autocomplete suggestions
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

    // Update match enrichment immediately in local state
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

    const overview = computed(() => MatchStatsService.computeOverviewStats(matches.value));
    const recentMatches = computed(() => MatchStatsService.mapToMatchRows(matches.value));
    const physiological = computed(() => MatchStatsService.computePhysiologicalData(matches.value));
    const pointBreakdown = computed(() => MatchStatsService.computePointBreakdown(matches.value));

    // Data for Opponent Bar Chart
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
            labels,
            datasets: [
                {
                    label: 'Won',
                    data: wonData,
                    backgroundColor: '#10B981',
                    borderRadius: 4,
                    barPercentage: 0.6,
                },
                {
                    label: 'Lost',
                    data: lostData,
                    backgroundColor: '#3B82F6',
                    borderRadius: 4,
                    barPercentage: 0.6,
                }
            ]
        };
    });

    return {
        matches,
        loading,
        overview,
        recentMatches,
        physiological,
        pointBreakdown,
        opponentChartData,
        pendingEnrichmentMatch,
        previousRivals,
        updateEnrichedMatch,
        refresh: fetchMatches
    };
}
