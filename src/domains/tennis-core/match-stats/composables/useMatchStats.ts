import { ref, onMounted, computed } from 'vue';
import { MatchStatsService } from '../services/matchStatsService';
import type { MatchPayload } from '../../_shared/types';

export function useMatchStats() {
    const matches = ref<MatchPayload[]>([]);
    const loading = ref(true);

    const fetchMatches = async () => {
        loading.value = true;
        try {
            matches.value = await MatchStatsService.getMatches();
        } catch (e) {
            console.error('Error fetching matches:', e);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchMatches();
    });

    const overview = computed(() => MatchStatsService.computeOverviewStats(matches.value));
    const recentMatches = computed(() => MatchStatsService.mapToMatchRows(matches.value));
    const physiological = computed(() => MatchStatsService.computePhysiologicalData(matches.value));
    const pointBreakdown = computed(() => MatchStatsService.computePointBreakdown(matches.value));

    // Data for Opponent Bar Chart
    const opponentChartData = computed(() => {
        const oppStats: Record<string, { won: number; lost: number }> = {};
        for (const match of matches.value) {
            if (!oppStats[match.rival]) oppStats[match.rival] = { won: 0, lost: 0 };
            if (match.win) oppStats[match.rival]!.won++;
            else oppStats[match.rival]!.lost++;
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
        refresh: fetchMatches
    };
}
