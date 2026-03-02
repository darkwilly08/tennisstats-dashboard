import { ref, onMounted, computed } from 'vue';
import { TournamentService } from '../services/tournamentService';
import type { Tournament, BracketMatch, TournamentPressureStats } from '../../_shared/types';

export function useTournament() {
    const activeTournament = ref<Tournament | null>(null);
    const bracketMatches = ref<BracketMatch[]>([]);
    const pressureStats = ref<TournamentPressureStats | null>(null);
    const loading = ref(true);

    const fetchData = async () => {
        loading.value = true;
        try {
            const t = await TournamentService.getActiveTournament();
            activeTournament.value = t;

            if (t) {
                const [m, s] = await Promise.all([
                    TournamentService.getBracketMatches(t.id),
                    TournamentService.getPressureStats()
                ]);
                bracketMatches.value = m;
                pressureStats.value = s;
            }
        } catch (e) {
            console.error('Error fetching tournament data:', e);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    const nextMatch = computed(() => {
        return bracketMatches.value.find(m => m.status === 'live' || m.status === 'upcoming') || null;
    });

    return {
        activeTournament,
        bracketMatches,
        pressureStats,
        nextMatch,
        loading,
        refresh: fetchData
    };
}
