import type { Tournament, BracketMatch, TournamentPressureStats } from '../../_shared/types';
import { mockTournament, mockBracketMatches, mockPressureStats } from '../../_shared/mock';

export class TournamentService {
    /**
     * Fetches the active or upcoming tournament context
     */
    static async getActiveTournament(): Promise<Tournament> {
        return Promise.resolve(mockTournament);
    }

    /**
     * Fetches the bracket matches for the active tournament
       * @param tournamentId the id of the tournament
     */
    static async getBracketMatches(_tournamentId: string): Promise<BracketMatch[]> {
        return Promise.resolve(mockBracketMatches);
    }

    /**
     * Fetches pressure statistics for tournaments
     */
    static async getPressureStats(): Promise<TournamentPressureStats> {
        return Promise.resolve(mockPressureStats);
    }
}
